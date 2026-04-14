interface StatCardProps {
  number: string;
  label: string;
  description: string;
}

export default function StatCard({ number, label, description }: StatCardProps) {
  return (
    <div className="flex flex-col items-center p-6 border border-gray-200 rounded-2xl bg-white shadow-sm text-center">
      <span className="text-4xl font-bold text-orange-600 mb-2">{number}</span>
      <h3 className="font-semibold text-gray-900 mb-1">{label}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}