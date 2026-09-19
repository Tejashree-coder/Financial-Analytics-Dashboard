
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  handleLogout: () => void;
}

function Sidebar({ handleLogout }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "▦",
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: "▱",
    },
    
    {
      name: "Analytics",
      path: "/analytics",
      icon: "◫",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "♙",
    },
    
    {
      name: "Settings",
      path: "/Settings",
      icon: "⚙",
    },
  ];

  return (
    <aside
      style={{
        width: "213.16px",
        height: "852.62px",
        minHeight: "100vh",
        background: "#15171d",
        borderRight: "1.67px solid #252832",
        padding: "28px 18px",
        boxSizing: "border-box",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontSize: "25px",
          fontWeight: 700,
          marginBottom: "55px",
          paddingLeft: "2px",
        }}
      >
        <span
          style={{
            color: "#22c55e",
            marginLeft: "80px",
          }}
        >
          ✦
        </span>{" "}
        FinanceTracker
      </div>

      {/* MENU */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%",
                background: isActive ? "#252932" : "transparent",
                border: "none",
                color: isActive ? "#22c55e" : "#9ca3af",
                padding: "13px 15px",
                borderRadius: "8px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                transition: "0.2s",
              }}
            >
              {item.icon} &nbsp;&nbsp; {item.name}
            </button>
          );
        })}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "35px",
            background: "transparent",
            border: "1px solid #333743",
            color: "#ef4444",
            padding: "11px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

