"use client";
import { useState } from "react";

const categories = ["All", "Gear", "Apparel", "Recovery", "Nutrition"];

const products = [
  { id: 1, name: "CF Bjornsvik Tee", category: "Apparel", price: 449, tag: null, description: "Organic cotton, relaxed fit" },
  { id: 2, name: "Wrist Wraps", category: "Gear", price: 299, tag: "Popular", description: "Competition grade, 18 inch" },
  { id: 3, name: "Jump Rope", category: "Gear", price: 549, tag: null, description: "Speed rope, adjustable cable" },
  { id: 4, name: "Knee Sleeves", category: "Gear", price: 699, tag: "New", description: "7mm neoprene, pair" },
  { id: 5, name: "Training Hoodie", category: "Apparel", price: 799, tag: null, description: "Heavyweight, embroidered logo" },
  { id: 6, name: "Foam Roller", category: "Recovery", price: 399, tag: null, description: "High density, 45cm" },
  { id: 7, name: "Lifting Belt", category: "Gear", price: 899, tag: "Popular", description: "Leather, 10mm, IPF approved" },
  { id: 8, name: "Protein Powder", category: "Nutrition", price: 599, tag: null, description: "Whey isolate, 1kg, vanilla" },
  { id: 9, name: "Lacrosse Ball Set", category: "Recovery", price: 149, tag: null, description: "Mobility set of 2" },
  { id: 10, name: "Training Shorts", category: "Apparel", price: 549, tag: "New", description: "4-way stretch, 7 inch" },
  { id: 11, name: "Creatine", category: "Nutrition", price: 349, tag: null, description: "Monohydrate, 300g" },
  { id: 12, name: "Gym Bag", category: "Gear", price: 699, tag: null, description: "40L duffle, shoe compartment" },
];

export default function ShopScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-full" style={{ background: "#000", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <h1 className="text-[28px] font-bold tracking-tight" style={{ color: "#fff" }}>Shop</h1>
        </div>
        {/* Cart icon */}
        <div className="relative">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#fff" }}>
            <span className="text-[9px] font-bold" style={{ color: "#000" }}>2</span>
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all"
            style={{
              background: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.06)",
              color: activeCategory === cat ? "#000" : "rgba(255,255,255,0.5)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="px-5 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Product image placeholder */}
              <div className="w-full aspect-square flex items-center justify-center relative" style={{ background: "rgba(255,255,255,0.03)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {product.tag && (
                  <span
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      background: product.tag === "New" ? "#fff" : "rgba(255,255,255,0.15)",
                      color: product.tag === "New" ? "#000" : "#fff",
                    }}
                  >
                    {product.tag}
                  </span>
                )}
              </div>
              {/* Product info */}
              <div className="p-3">
                <p className="text-[13px] font-semibold leading-tight" style={{ color: "#fff" }}>{product.name}</p>
                <p className="text-[11px] mt-0.5 leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>{product.description}</p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[15px] font-bold" style={{ color: "#fff" }}>{product.price} kr</span>
                  <button
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
