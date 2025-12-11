import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import {
  UserCircleIcon,
  PencilIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Settings = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Name update state
  const [name, setName] = useState(user?.name || "");
  const [nameLoading, setNameLoading] = useState(false);

  // Password update state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);


  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  // Handle name update
  const handleNameUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setNameLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/profile/name`, { name });
      toast.success("Name updated successfully!");
      setUser(response.data.user);
      setName(response.data.user.name);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error updating name");
    } finally {
      setNameLoading(false);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setPasswordLoading(true);
    try {
      await axios.put(`${API_URL}/api/profile/password`, {
        currentPassword,
        newPassword,
      });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error updating password");
    } finally {
      setPasswordLoading(false);
    }
  };


  const tabs = [
    { id: "profile", label: "Profile", icon: UserCircleIcon },
    { id: "name", label: "Update Name", icon: PencilIcon },
    { id: "password", label: "Update Password", icon: KeyIcon },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-200">
          <div className="flex flex-wrap gap-2 p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-block relative">
                  <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-indigo-200">
                    <UserCircleIcon className="w-20 h-20 text-indigo-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-4">{user?.name || "User"}</h2>
                <p className="text-slate-600 mt-1">{user?.email}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="text-lg font-semibold text-slate-900">{user?.name || "Not set"}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-lg font-semibold text-slate-900">{user?.email || "Not set"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Update Name Tab */}
          {activeTab === "name" && (
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Update Name</h2>
              <form onSubmit={handleNameUpdate} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={nameLoading}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {nameLoading ? "Updating..." : "Update Name"}
                </button>
              </form>
            </div>
          )}

          {/* Update Password Tab */}
          {activeTab === "password" && (
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Update Password</h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Enter new password"
                    required
                    minLength={8}
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Must be 8+ characters with 1 uppercase, 1 lowercase, and 1 symbol
                  </p>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Confirm new password"
                    required
                    minLength={8}
                  />
                </div>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;

