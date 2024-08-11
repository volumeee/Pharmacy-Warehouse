import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="/" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Medicines
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
