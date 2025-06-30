export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind CSS Test</h1>
      <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-300">
        <p className="text-green-600">If you can see this with colors and styling, Tailwind is working!</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Test Button
        </button>
      </div>
    </div>
  );
} 