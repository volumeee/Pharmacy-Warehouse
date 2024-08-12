import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div>
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

      {/* Profile Section */}
      {session && (
        <div className="px-4 py-10 bg-gray-900">
          <div className="flex items-center">
            <img
              src={session.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-sm font-semibold">{session.user?.name}</h2>
              <p className="text-xs text-gray-400">{session.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="mt-4 w-full py-2 px-4 bg-red-600 text-white text-sm rounded hover:bg-red-500"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
