export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">
          Práctica de ramas
        </h1>

        <span className="text-sm text-gray-600">
          Proyecto con React y Next.js
        </span>
      </div>
    </header>
  );
}