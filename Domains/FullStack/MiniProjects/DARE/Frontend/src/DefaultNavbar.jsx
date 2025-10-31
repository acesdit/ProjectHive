// // import { useNavigate } from "react-router-dom";
// // import "./App.css";
// // import "./index.css";

// // export default function DefaultNavbar() {
// //   const navigate = useNavigate();
// //   const handleLogin = () => {
// //     // Perform logout logic here
// //     navigate("/login"); // Route to /adminlogin after logout
// //   };
// //   return (
// //     <div className="navbar bg-base-100">
// //       <div className="navbar-start">
// //         <div className="dropdown">
// //           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="h-5 w-5"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 d="M4 6h16M4 12h8m-8 6h16"
// //               />
// //             </svg>
// //           </div>
// //           <ul
// //             tabIndex={0}
// //             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
// //           >
// //             <li>
// //               <a onClick={() => navigate("/home")}>Home</a>
// //             </li>
// //             <li>
// //               <a>Emergency Help</a>
// //               <ul className="p-2">
// //                 <li>
// //                   <a onClick={() => navigate("/safety")}>
// //                     Help Request & Safety Instructions
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a onClick={() => navigate("/disaster")}>Disaster Track</a>
// //                 </li>
// //               </ul>
// //             </li>
// //             <li>
// //               <a onClick={() => navigate("/shelter")}>
// //                 Shelters & Rescue Teams
// //               </a>
// //             </li>
// //             <li>
// //               <a onClick={() => navigate("/funds")}>Funds & Aid Supplies</a>
// //             </li>
// //           </ul>
// //         </div>
// //         <a className="btn btn-ghost text-xl">DARE</a>
// //       </div>
// //       <div className="navbar-center hidden lg:flex">
// //         <ul className="menu menu-horizontal px-1">
// //           <li>
// //             <a onClick={() => navigate("/home")}>Home</a>
// //           </li>
// //           <li>
// //             <details>
// //               <summary>Emergency Help</summary>
// //               <ul className="p-2">
// //                 <li>
// //                   <a onClick={() => navigate("/safety")}>
// //                     Help Request & Safety Instructions
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a onClick={() => navigate("/disaster")}>Disaster Track</a>
// //                 </li>
// //               </ul>
// //             </details>
// //           </li>
// //           <li>
// //             <a onClick={() => navigate("/shelter")}>Shelters & Rescue Teams</a>
// //           </li>
// //           <li>
// //             <a onClick={() => navigate("/funds")}>Funds & Aid Supplies</a>
// //           </li>
// //         </ul>
// //       </div>
// //       <div className="navbar-end">
// //         <div className="dropdown dropdown-end ">
// //           <div
// //             tabIndex={0}
// //             role="button"
// //             className="btn btn-ghost btn-circle avatar"
// //           >
// //             <button className="btn btn-primary" onClick={handleLogin}>
// //               Login
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useNavigate } from "react-router-dom";
// import "./App.css";
// import "./index.css";

// export default function DefaultNavbar() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Perform logout logic here
//     navigate("/login"); // Route to /adminlogin after logout
//   };

//   return (
//     <nav className="navbar bg-base-100">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//           >
//             <li>
//               <a onClick={() => navigate("/home")}>Home</a>
//             </li>
//             <li>
//               <a>Emergency Help</a>
//               <ul className="p-2">
//                 <li>
//                   <a onClick={() => navigate("/safety")}>
//                     Help Request & Safety Instructions
//                   </a>
//                 </li>
//                 <li>
//                   <a onClick={() => navigate("/disaster")}>Disaster Track</a>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <a onClick={() => navigate("/shelter")}>
//                 Shelters & Rescue Teams
//               </a>
//             </li>
//             <li>
//               <a onClick={() => navigate("/funds")}>Funds & Aid Supplies</a>
//             </li>
//           </ul>
//         </div>
//         <a className="btn btn-ghost text-xl">DARE</a>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <li>
//             <a onClick={() => navigate("/home")}>Home</a>
//           </li>
//           <li>
//             <details>
//               <summary>Emergency Help</summary>
//               <ul className="p-2">
//                 <li>
//                   <a onClick={() => navigate("/safety")}>
//                     Help Request & Safety Instructions
//                   </a>
//                 </li>
//                 <li>
//                   <a onClick={() => navigate("/disaster")}>Disaster Track</a>
//                 </li>
//               </ul>
//             </details>
//           </li>
//           <li>
//             <a onClick={() => navigate("/shelter")}>Shelters & Rescue Teams</a>
//           </li>
//           <li>
//             <a onClick={() => navigate("/funds")}>Funds & Aid Supplies</a>
//           </li>
//         </ul>
//       </div>
//       <div className="navbar-end">
//         <div className="dropdown dropdown-end ">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost btn-circle avatar"
//           >
//             <button
//               className="btn btn-outline btn-primary"
//               onClick={handleLogin}
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
// import { useNavigate } from "react-router-dom";
// import "./App.css";
// import "./index.css";
// export default function Navbar() {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     // Perform logout logic here
//     navigate("/login"); // Route to /adminlogin after logout
//   };
//   return (
//     <div className="navbar bg-accent">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//           >
//             <li>
//               <a onClick={() => navigate("/home")}>Home</a>
//             </li>
//             <li>
//               <a>Emergency Help</a>
//               <ul className="p-2">
//                 <li>
//                   <a onClick={() => navigate("/safety")}>
//                     Help Request & Safety Instructions
//                   </a>
//                 </li>
//                 <li>
//                   <a onClick={() => navigate("/disaster")}>Disaster Track</a>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <a onClick={() => navigate("/shelter")}>
//                 Shelters & Rescue Teams
//               </a>
//             </li>
//             <li>
//               <a onClick={() => navigate("/funds")}>Funds & Aid Supplies</a>
//             </li>
//           </ul>
//         </div>
//         <a className="btn btn-ghost text-xl">DARE</a>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <li>
//             <a onClick={() => navigate("/home")}>Home</a>
//           </li>
//           <li>
//             <details>
//               <summary>Emergency Help</summary>
//               <ul className="p-2">
//                 <li>
//                   <a onClick={() => navigate("/safety")}>
//                     Help Request & Safety Instructions
//                   </a>
//                 </li>
//                 <li>
//                   <a onClick={() => navigate("/disaster")}>Disaster Track</a>
//                 </li>
//               </ul>
//             </details>
//           </li>
//           <li>
//             <a onClick={() => navigate("/shelter")}>Shelters & Rescue Teams</a>
//           </li>
//           <li>
//             <a onClick={() => navigate("/funds")}>Funds & Aid Supplies</a>
//           </li>
//         </ul>
//       </div>
//       <div className="navbar-end">
//         <div className="dropdown dropdown-end ">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost btn-circle avatar"
//           >
//             <div className="w-10 rounded-full">
//               <img
//                 alt="Tailwind CSS Navbar component"
//                 src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//               />
//             </div>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//           >
//             <li>
//               <button onClick={handleLogout}>Logout</button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import { useEffect, useState } from "react";

export default function DefaultNavbar() {
  const navigate = useNavigate();
  // const [loginCount, setLoginCount] = useState(0);

  // useEffect(() => {
  //   fetchLoginCount();
  // }, []);

  // const fetchLoginCount = async () => {
  //   try {
  //     const response = await fetch("/login");
  //     const data = await response.json();
  //     setLoginCount(data.loginCount);
  //   } catch (error) {
  //     console.error("Error fetching login count:", error);
  //   }
  // };
  const handleLogin = () => {
    // Perform logout logic here
    navigate("/login"); // Route to /login after logout
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
          <ul className="menu menu-sm text-xl px-4 py-2 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a onClick={() => navigate("/home")}>Home</a>
            </li>
            <li>
              <a>Emergency Help</a>
              <ul className="p-2">
                <li>
                  <a onClick={() => navigate("/safety")}>
                    Help Request & Safety Instructions
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate("/disaster")}>Disaster Track</a>
                </li>
              </ul>
            </li>
            <li>
              <a onClick={() => navigate("/shelter")}>
                Shelters & Rescue Teams
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/funds")}>Funds & Aid Supplies</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">DARE</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-4 text-lg py-2">
          <li>
            <a onClick={() => navigate("/home")}>Home</a>
          </li>
          <li>
            <details>
              <summary>Emergency Help</summary>
              {/* <ul className="p-2">
                <li>
                  <a onClick={() => navigate("/safety")}>
                    Help Request & Safety Instructions
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate("/disaster")}>Disaster Track</a>
                </li>
              </ul> */}
              <ul className="p-2 bg-blue-50 text-blue-800 font-semibold rounded-md shadow-md">
                <li className="mb-2">
                  <a
                    className="block px-4 py-2 hover:bg-blue-100 rounded-md"
                    onClick={() => navigate("/safety")}
                  >
                    Help Request & Safety Instructions
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 hover:bg-blue-100 rounded-md"
                    onClick={() => navigate("/disaster")}
                  >
                    Disaster Track
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a onClick={() => navigate("/shelter")}>Shelters & Rescue Teams</a>
          </li>
          <li>
            <a onClick={() => navigate("/funds")}>Funds & Aid Supplies</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div> */}
        {/* </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-50 font-semibold text-xl  text-blue-800 rounded-box w-52">
            <li>
              <a onClick={() => navigate("/profile")}>Profile</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul> */}
        {/* </div> */}
        {/* <div className="navbar-item">Login Count: 6 </div> */}
        {/* 
        <div className="navbar-item">Login Count: 6 {loginCount}</div> */}
        <button
          className="block px-4 py-2 hover:bg-blue-100 rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
