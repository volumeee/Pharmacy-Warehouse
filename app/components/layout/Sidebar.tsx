import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link href="/">Dashboard</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link href="/pages/medicine">Medicine</Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link href="/pages/supplier">Supplier</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
