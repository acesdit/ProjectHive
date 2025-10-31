// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className="footer p-10 bg-base-300 text-base-content">
//       <aside>
//         <svg
//           width="50"
//           height="50"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//           fillRule="evenodd"
//           clipRule="evenodd"
//           className="fill-current"
//         >
//           <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
//         </svg>
//         <p>
//           DARE
//           <br />
//           Connecting People Who can Help to those in Need.
//         </p>
//       </aside>
//       <nav>
//         <Link to="/safety" className="link link-hover">
//           Emergency Help Request Facility & Safety Instructions
//         </Link>
//         <br></br>
//         <Link to="/disaster" className="link link-hover">
//           Disaster Track
//         </Link>
//         <br></br>
//         <Link to="/shelter" className="link link-hover">
//           Shelter & Rescue Teams
//         </Link>
//         <br></br>
//         <Link to="/funds" className="link link-hover">
//           Funds & Aids Supplies
//         </Link>
//       </nav>
//     </footer>
//   );
// }

// export default Footer;
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className="footer p-10 bg-gray-800 text-white">
//       <div className="container mx-auto flex flex-wrap items-center justify-between">
//         <div className="w-full md:w-1/2 lg:w-1/4">
//           <svg
//             width="50"
//             height="50"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//             fillRule="evenodd"
//             clipRule="evenodd"
//             className="fill-current text-yellow-400 mb-4"
//           >
//             <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
//           </svg>
//           <p className="text-sm">
//             DARE
//             <br />
//             Connecting People Who Can Help to Those in Need.
//           </p>
//         </div>
//         <nav className="w-full md:w-1/2 lg:w-3/4 mt-4 md:mt-0">
//           <ul className="flex flex-col md:flex-row justify-center md:justify-end space-y-2 md:space-x-4">
//             <li>
//               <Link to="/safety" className="link link-hover">
//                 Emergency Help Request Facility & Safety Instructions
//               </Link>
//             </li>
//             <li>
//               <Link to="/disaster" className="link link-hover">
//                 Disaster Track
//               </Link>
//             </li>
//             <li>
//               <Link to="/shelter" className="link link-hover">
//                 Shelter & Rescue Teams
//               </Link>
//             </li>
//             <li>
//               <Link to="/funds" className="link link-hover">
//                 Funds & Aids Supplies
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer p-10 bg-blue-900 text-white">
      <aside>
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <p>
          DARE
          <br />
          Connecting People Who can Help to those in Need.
        </p>
      </aside>
      <nav>
        <div className="flex flex-col space-y-2">
          <Link to="/safety" className="link link-hover">
            Emergency Help Request Facility & Safety Instructions
          </Link>
          <Link to="/disaster" className="link link-hover">
            Disaster Track
          </Link>
          <Link to="/shelter" className="link link-hover">
            Shelter & Rescue Teams
          </Link>
          <Link to="/funds" className="link link-hover">
            Funds & Aids Supplies
          </Link>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
