interface FaqItemProps {
  question: string;
}

export default function FaqItem({ question }: FaqItemProps) {
  return (
    <div className="border-b border-gray-200 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors px-2">
      <h4 className="font-medium text-gray-800">{question}</h4>
      <span className="text-gray-400">›</span>
    </div>
  );
}
