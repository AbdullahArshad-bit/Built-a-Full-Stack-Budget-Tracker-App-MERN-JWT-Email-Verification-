import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Transactions", path: "/transactions" },
  { label: "Categories", path: "/categories" },
  { label: "Export Data", path: "/export" },
  { label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggle = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="lg:hidden fixed top-4 left-4 z-50 rounded-full bg-white p-2 shadow-card"
        aria-label="Toggle navigation"
      >
        <Bars3Icon className="h-6 w-6 text-slate-700" />
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-100 bg-white shadow-card transition-transform duration-200 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-full flex-col gap-6 p-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-slate-400">Budget Tracker</p>
            <h1 className="text-3 font-semibold text-slate-900">Created By Abdullah</h1>
          </div>
          <nav className="flex flex-1 flex-col gap-1 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-inner"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          {user && (
            <div className="mt-auto space-y-2">
              <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                <p className="text-xs font-medium text-slate-500">Logged in as</p>
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 border border-slate-200"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          )}
          <div className="rounded-2xl bg-slate-900 p-4 text-slate-100">
            <p className="text-sm font-semibold">Today&apos;s Tip</p>
            <p className="text-xs text-slate-300">
              Track expenses right away to keep your balance accurate.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
