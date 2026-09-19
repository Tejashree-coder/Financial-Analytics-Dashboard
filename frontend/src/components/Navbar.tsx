import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log("Search:", search);
  };

  return (
    <nav
      style={{
        width: "calc(100% - 213.16px)",
        height: "74.94px",
        marginLeft: "213.16px",
        backgroundColor: "#1e293b",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        boxSizing: "border-box",
      }}
    >
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "center",
          width: "360px",
          height: "40px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "13px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              color: "#94a3b8",
            }}
          >
            🔍
          </span>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              boxSizing: "border-box",
              backgroundColor: "#252932",
              border: "1px solid #3b4250",
              borderRadius: "7px",
              outline: "none",
              color: "white",
              padding: "0 15px 0 40px",
              fontSize: "13px",
            }}
          />
        </div>
      </form>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* Notification */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "21px",
              cursor: "pointer",
              padding: "6px",
            }}
          >
            🔔

            <span
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                fontSize: "9px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </span>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: 0,
                width: "260px",
                backgroundColor: "#252932",
                border: "1px solid #3b4250",
                borderRadius: "7px",
                padding: "12px",
                zIndex: 1000,
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              }}
            >
              <h4 style={{ margin: "0 0 10px" }}>
                Notifications
              </h4>

              <div
                style={{
                  padding: "9px 0",
                  borderBottom: "1px solid #3b4250",
                  fontSize: "13px",
                }}
              >
                New transaction added
              </div>

              <div
                style={{
                  padding: "9px 0",
                  borderBottom: "1px solid #3b4250",
                  fontSize: "13px",
                }}
              >
                Payment received
              </div>

              <div
                style={{
                  padding: "9px 0",
                  fontSize: "13px",
                }}
              >
                Monthly report is ready
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #64748b",
              backgroundColor: "#475569",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            👤
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: 0,
                width: "180px",
                backgroundColor: "#252932",
                border: "1px solid #3b4250",
                borderRadius: "7px",
                padding: "8px",
                zIndex: 1000,
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #3b4250",
                  fontSize: "14px",
                }}
              >
                <strong>My Profile</strong>
              </div>

              <button
                onClick={() => navigate("/profile")}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  textAlign: "left",
                  padding: "10px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                👤 View Profile
              </button>

              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  marginTop: "5px",
                  textAlign: "left",
                }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;