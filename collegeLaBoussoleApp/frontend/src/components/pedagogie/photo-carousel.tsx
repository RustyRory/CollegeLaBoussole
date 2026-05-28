"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { label: "Élèves en atelier pratique", bg: "#C8B09A" },
  { label: "Travail en groupe", bg: "#B89A80" },
  { label: "Restauration scolaire", bg: "#A8886C" },
  { label: "Cours en plein air", bg: "#987060" },
  { label: "Hébertisme", bg: "#886050" },
];

const SLIDE_W = 340;

export default function PhotoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scroll = (dir: "prev" | "next") => {
    scrollRef.current?.scrollBy({
      left: dir === "next" ? SLIDE_W : -SLIDE_W,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  return (
    <div className="relative w-full mt-14">
      <button
        onClick={() => scroll("prev")}
        disabled={!canPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow border border-[#1C1410]/10 flex items-center justify-center text-[#1C1410] hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Photo précédente"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={() => scroll("next")}
        disabled={!canNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow border border-[#1C1410]/10 flex items-center justify-center text-[#1C1410] hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Photo suivante"
      >
        <ChevronRight size={18} />
      </button>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-16"
        style={{ scrollbarWidth: "none" }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="shrink-0 snap-start w-[300px] md:w-[340px] aspect-[4/3] rounded-2xl flex items-end p-4"
            style={{ backgroundColor: slide.bg }}
          >
            <span className="text-xs text-white/70 font-medium">
              {slide.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
