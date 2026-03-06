"use client";

import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, EventClickArg, EventContentArg } from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import ClassCapacityBar from "./ClassCapacityBar";

type ClassType = "CrossFit" | "Yoga" | "HIIT" | "Strength" | "Mobility";

interface ClassEvent extends EventInput {
  extendedProps: {
    type: ClassType;
    coach: string;
    capacity: number;
    booked: number;
  };
}

const classColors: Record<ClassType, string> = {
  CrossFit: "#EF4444",
  Yoga: "#8B5CF6",
  HIIT: "#F59E0B",
  Strength: "#3B82F6",
  Mobility: "#10B981",
};

const initialEvents: ClassEvent[] = [
  // Monday March 9
  { id: "c1", title: "CrossFit WOD", start: "2026-03-09T06:00:00", end: "2026-03-09T07:00:00", backgroundColor: "#EF4444", borderColor: "#EF4444", extendedProps: { type: "CrossFit", coach: "Magnus Vik", capacity: 20, booked: 16 } },
  { id: "c2", title: "Yoga Flow", start: "2026-03-09T08:00:00", end: "2026-03-09T09:00:00", backgroundColor: "#8B5CF6", borderColor: "#8B5CF6", extendedProps: { type: "Yoga", coach: "Silje Berg", capacity: 15, booked: 12 } },
  { id: "c3", title: "HIIT Blast", start: "2026-03-09T17:00:00", end: "2026-03-09T18:00:00", backgroundColor: "#F59E0B", borderColor: "#F59E0B", extendedProps: { type: "HIIT", coach: "Erik Hansen", capacity: 18, booked: 18 } },

  // Tuesday March 10
  { id: "c4", title: "Strength Training", start: "2026-03-10T06:30:00", end: "2026-03-10T07:30:00", backgroundColor: "#3B82F6", borderColor: "#3B82F6", extendedProps: { type: "Strength", coach: "Thomas Bakke", capacity: 16, booked: 10 } },
  { id: "c5", title: "CrossFit WOD", start: "2026-03-10T12:00:00", end: "2026-03-10T13:00:00", backgroundColor: "#EF4444", borderColor: "#EF4444", extendedProps: { type: "CrossFit", coach: "Magnus Vik", capacity: 20, booked: 14 } },

  // Wednesday March 11
  { id: "c6", title: "Mobility & Recovery", start: "2026-03-11T07:00:00", end: "2026-03-11T08:00:00", backgroundColor: "#10B981", borderColor: "#10B981", extendedProps: { type: "Mobility", coach: "Ingrid Larsen", capacity: 12, booked: 8 } },
  { id: "c7", title: "CrossFit WOD", start: "2026-03-11T16:30:00", end: "2026-03-11T17:30:00", backgroundColor: "#EF4444", borderColor: "#EF4444", extendedProps: { type: "CrossFit", coach: "Erik Hansen", capacity: 20, booked: 19 } },
  { id: "c8", title: "Yoga Stretch", start: "2026-03-11T19:00:00", end: "2026-03-11T20:00:00", backgroundColor: "#8B5CF6", borderColor: "#8B5CF6", extendedProps: { type: "Yoga", coach: "Silje Berg", capacity: 15, booked: 11 } },

  // Thursday March 12
  { id: "c9", title: "HIIT Circuit", start: "2026-03-12T06:00:00", end: "2026-03-12T07:00:00", backgroundColor: "#F59E0B", borderColor: "#F59E0B", extendedProps: { type: "HIIT", coach: "Thomas Bakke", capacity: 18, booked: 15 } },
  { id: "c10", title: "Strength Foundations", start: "2026-03-12T17:30:00", end: "2026-03-12T18:30:00", backgroundColor: "#3B82F6", borderColor: "#3B82F6", extendedProps: { type: "Strength", coach: "Magnus Vik", capacity: 16, booked: 13 } },

  // Friday March 13
  { id: "c11", title: "CrossFit Open Gym", start: "2026-03-13T07:00:00", end: "2026-03-13T08:30:00", backgroundColor: "#EF4444", borderColor: "#EF4444", extendedProps: { type: "CrossFit", coach: "Erik Hansen", capacity: 24, booked: 9 } },
  { id: "c12", title: "Yoga Basics", start: "2026-03-13T12:00:00", end: "2026-03-13T13:00:00", backgroundColor: "#8B5CF6", borderColor: "#8B5CF6", extendedProps: { type: "Yoga", coach: "Ingrid Larsen", capacity: 15, booked: 7 } },

  // Saturday March 14
  { id: "c13", title: "CrossFit Team WOD", start: "2026-03-14T09:00:00", end: "2026-03-14T10:30:00", backgroundColor: "#EF4444", borderColor: "#EF4444", extendedProps: { type: "CrossFit", coach: "Magnus Vik", capacity: 30, booked: 26 } },
  { id: "c14", title: "Mobility Lab", start: "2026-03-14T11:00:00", end: "2026-03-14T12:00:00", backgroundColor: "#10B981", borderColor: "#10B981", extendedProps: { type: "Mobility", coach: "Silje Berg", capacity: 12, booked: 10 } },
  { id: "c15", title: "HIIT Finisher", start: "2026-03-14T14:00:00", end: "2026-03-14T15:00:00", backgroundColor: "#F59E0B", borderColor: "#F59E0B", extendedProps: { type: "HIIT", coach: "Thomas Bakke", capacity: 18, booked: 16 } },
];

const classTypes: ClassType[] = ["CrossFit", "Yoga", "HIIT", "Strength", "Mobility"];

export default function SchedulePage() {
  const [events, setEvents] = useState<ClassEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<ClassEvent | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<ClassType>("CrossFit");
  const [formCoach, setFormCoach] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formStartTime, setFormStartTime] = useState("");
  const [formEndTime, setFormEndTime] = useState("");
  const [formCapacity, setFormCapacity] = useState(20);

  const resetForm = () => {
    setFormTitle("");
    setFormType("CrossFit");
    setFormCoach("");
    setFormDate("");
    setFormStartTime("");
    setFormEndTime("");
    setFormCapacity(20);
    setSelectedEvent(null);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const ext = event.extendedProps as ClassEvent["extendedProps"];
    setSelectedEvent(event as unknown as ClassEvent);
    setFormTitle(event.title);
    setFormType(ext.type);
    setFormCoach(ext.coach);
    setFormCapacity(ext.capacity);

    if (event.start) {
      const start = event.start;
      setFormDate(start.toISOString().split("T")[0]);
      setFormStartTime(start.toTimeString().slice(0, 5));
    }
    if (event.end) {
      setFormEndTime(event.end.toTimeString().slice(0, 5));
    }

    openModal();
  };

  const handleOpenCreate = () => {
    resetForm();
    openModal();
  };

  const handleSave = () => {
    const color = classColors[formType];
    const start = `${formDate}T${formStartTime}:00`;
    const end = `${formDate}T${formEndTime}:00`;

    if (selectedEvent) {
      // Update existing
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === (selectedEvent as unknown as { id: string }).id
            ? {
                ...ev,
                title: formTitle,
                start,
                end,
                backgroundColor: color,
                borderColor: color,
                extendedProps: {
                  type: formType,
                  coach: formCoach,
                  capacity: formCapacity,
                  booked: ev.extendedProps.booked,
                },
              }
            : ev
        )
      );
    } else {
      // Create new
      const newEvent: ClassEvent = {
        id: Date.now().toString(),
        title: formTitle,
        start,
        end,
        backgroundColor: color,
        borderColor: color,
        extendedProps: {
          type: formType,
          coach: formCoach,
          capacity: formCapacity,
          booked: 0,
        },
      };
      setEvents((prev) => [...prev, newEvent]);
    }

    closeModal();
    resetForm();
  };

  const handleClose = () => {
    closeModal();
    resetForm();
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          initialDate="2026-03-09"
          headerToolbar={{
            left: "prev,next addClassButton",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          customButtons={{
            addClassButton: {
              text: "Add Class +",
              click: handleOpenCreate,
            },
          }}
          events={events}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          slotMinTime="05:00:00"
          slotMaxTime="21:00:00"
          allDaySlot={false}
          height="auto"
          expandRows={true}
          slotDuration="00:30:00"
        />
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] p-6 lg:p-10">
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {selectedEvent ? "Edit Class" : "Add Class"}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedEvent ? "Update the class details below." : "Fill in the details to schedule a new class."}
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {/* Title */}
            <div>
              <label className={labelClass}>Class Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. CrossFit WOD"
                className={inputClass}
              />
            </div>

            {/* Type */}
            <div>
              <label className={labelClass}>Type</label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as ClassType)}
                className={inputClass}
              >
                {classTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Coach */}
            <div>
              <label className={labelClass}>Coach</label>
              <input
                type="text"
                value={formCoach}
                onChange={(e) => setFormCoach(e.target.value)}
                placeholder="Coach name"
                className={inputClass}
              />
            </div>

            {/* Date */}
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Start / End Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Time</label>
                <input
                  type="time"
                  value={formStartTime}
                  onChange={(e) => setFormStartTime(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>End Time</label>
                <input
                  type="time"
                  value={formEndTime}
                  onChange={(e) => setFormEndTime(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label className={labelClass}>Capacity</label>
              <input
                type="number"
                min={1}
                value={formCapacity}
                onChange={(e) => setFormCapacity(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={handleClose}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {selectedEvent ? "Save Changes" : "Add Class"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  const { coach, booked, capacity } = eventInfo.event.extendedProps as {
    type: string;
    coach: string;
    booked: number;
    capacity: number;
  };

  return (
    <div className="flex flex-col gap-0.5 p-1 text-white overflow-hidden">
      <div className="text-xs font-semibold truncate">{eventInfo.event.title}</div>
      <div className="text-[10px] opacity-80 truncate">{coach}</div>
      <ClassCapacityBar booked={booked} capacity={capacity} />
    </div>
  );
}
