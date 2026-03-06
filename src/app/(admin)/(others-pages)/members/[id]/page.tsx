import MemberDetail from "@/components/fitness/MemberDetail";

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <MemberDetail params={params} />;
}
