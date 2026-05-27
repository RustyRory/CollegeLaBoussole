interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) {
  return (
    <div className="border-t border-[#1C1410]/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-medium text-[#1C1410]">{question}</span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-base leading-none transition-colors duration-200 ${
            isOpen
              ? "border-[#C85A2A] text-[#C85A2A]"
              : "border-[#1C1410]/20 text-[#1C1410]/50"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p className="pb-5 text-sm text-[#1C1410]/60 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
