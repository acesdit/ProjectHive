import { useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    navigate("/"); // Route to /adminlogin after logout
  };
  return (
    <div className="navbar bg-base-200 text-xl font-medium text-blue-800">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-xl px-4 py-2 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => navigate("/adminhome")}>Home</a>
            </li>
            <li>
              <a>Emergency Help</a>
              <ul className="p-2">
                <li>
                  <a onClick={() => navigate("/adminemergency")}>
                    Help Requests
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate("/adminsafety")}>
                    Safety Instructions
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate("/admindisaster")}>
                    Disaster Track
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a onClick={() => navigate("/adminshelter")}>Shelters</a>
            </li>
            <li>
              <a onClick={() => navigate("/adminrescue")}>Rescue Teams</a>
            </li>
            <li>
              <a onClick={() => navigate("/adminv")}>Volunteer</a>
            </li>
            <li>
              <a onClick={() => navigate("/adminfunds")}>Funds</a>
            </li>
            <li>
              <a onClick={() => navigate("/adminaid")}>Aid Supplies</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">DARE</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-lg px-4 py-2">
          <li>
            <a onClick={() => navigate("/adminhome")}>Home</a>
          </li>
          <li>
            <details>
              <summary>Emergency Help</summary>
              <ul className="p-2 bg-blue-50 text-blue-800 font-semibold rounded-md shadow-md">
                <li className="mb-2">
                  <a
                    className="block px-4 py-2 hover:bg-blue-100 rounded-md"
                    onClick={() => navigate("/adminemergency")}
                  >
                    Help Requests
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="block px-4 py-2 hover:bg-blue-100 rounded-md"
                    onClick={() => navigate("/adminsafety")}
                  >
                    Safety Instructions
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-blue-100 rounded-md"
                    onClick={() => navigate("/admindisaster")}
                  >
                    Disaster Track
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a onClick={() => navigate("/adminshelter")}>Shelters</a>
          </li>
          <li>
            <a onClick={() => navigate("/adminrescue")}>Rescue Teams</a>
          </li>
          {/* <li>
            <a onClick={() => navigate("/adminv")}>Volunteer</a>
          </li> */}
          <li>
            <a onClick={() => navigate("/adminfunds")}>Funds </a>
          </li>
          <li>
            <a onClick={() => navigate("/adminaid")}>Aid Supplies</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button
                className="block px-4 py-2 hover:bg-blue-100 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
