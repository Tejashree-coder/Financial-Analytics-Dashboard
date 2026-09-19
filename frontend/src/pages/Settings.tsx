
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// @ts-ignore CSS files are handled by the bundler and do not have TypeScript declarations.
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="settings-page">

      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="settings-main">

        {/* Header */}
        <div className="settings-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your account and application preferences</p>
          </div>
        </div>

        {/* Settings Content */}
        <div className="settings-content">

          {/* Account Settings */}
          <div className="settings-card">

            <div className="settings-card-header">
              <div className="settings-icon">
                👤
              </div>

              <div>
                <h2>Account Settings</h2>
                <p>Manage your account information</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <h3>Profile</h3>
                <p>View and manage your profile information</p>
              </div>

              <button
                className="settings-action-btn"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Password</h3>
                <p>Change your account password</p>
              </div>

              <button
                className="settings-action-btn"
                onClick={() =>
                  alert("Change Password feature coming soon")
                }
              >
                Change Password
              </button>
            </div>

          </div>

          {/* Notification Settings */}
          <div className="settings-card">

            <div className="settings-card-header">
              <div className="settings-icon">
                🔔
              </div>

              <div>
                <h2>Notifications</h2>
                <p>Control how you receive notifications</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <h3>Push Notifications</h3>
                <p>Receive notifications about transactions</p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() =>
                    setNotifications(!notifications)
                  }
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-row">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive important updates through email</p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() =>
                    setEmailNotifications(!emailNotifications)
                  }
                />
                <span className="slider"></span>
              </label>
            </div>

          </div>

          {/* Appearance */}
          <div className="settings-card">

            <div className="settings-card-header">
              <div className="settings-icon">
                🎨
              </div>

              <div>
                <h2>Appearance</h2>
                <p>Customize the look of your application</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <h3>Theme</h3>
                <p>Current application theme</p>
              </div>

              <span className="theme-badge">
                Dark
              </span>
            </div>

          </div>

          {/* Security */}
          <div className="settings-card">

            <div className="settings-card-header">
              <div className="settings-icon">
                🔒
              </div>

              <div>
                <h2>Security</h2>
                <p>Manage your account security</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <h3>Login Security</h3>
                <p>Your account is protected with authentication</p>
              </div>

              <span className="security-badge">
                Protected
              </span>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Settings;

