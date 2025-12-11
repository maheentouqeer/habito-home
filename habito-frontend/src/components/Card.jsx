export default function Card({ title, description }) {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl border-l-4 border-aqua hover:scale-[1.02] transition">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
    </div>
  );
}
