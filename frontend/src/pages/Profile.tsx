
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// Profile.css is loaded by the bundler; TypeScript does not have a declaration for CSS imports.
// @ts-ignore TS2307: side-effect CSS imports are handled at build time.
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="profile-main">

        {/* Page Header */}
        <div className="profile-header">
          <div>
            <h1>My Profile</h1>
            <p>Manage your account information</p>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => alert("Edit Profile feature coming soon")}
          >
            ✏️ Edit Profile
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">

          {/* Profile Card */}
          <div className="profile-card profile-user-card">

            <div className="profile-avatar">
              👤
            </div>

            <h2>Admin User</h2>
            <p className="profile-role">Administrator</p>

            <div className="profile-status">
              <span className="status-dot"></span>
              Active
            </div>

          </div>

          {/* Personal Information */}
          <div className="profile-card">

            <div className="card-title">
              <h2>Personal Information</h2>
            </div>

            <div className="profile-details">

              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">Admin User</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">
                  admin@example.com
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Phone Number</span>
                <span className="detail-value">
                  +91 98765 43210
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Role</span>
                <span className="detail-value">
                  Administrator
                </span>
              </div>

            </div>

          </div>

          {/* Account Information */}
          <div className="profile-card account-card">

            <div className="card-title">
              <h2>Account Information</h2>
            </div>

            <div className="profile-details">

              <div className="detail-item">
                <span className="detail-label">
                  Account Status
                </span>

                <span className="account-active">
                  Active
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  Member Since
                </span>

                <span className="detail-value">
                  September 2026
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  Last Login
                </span>

                <span className="detail-value">
                  Today
                </span>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Profile;

