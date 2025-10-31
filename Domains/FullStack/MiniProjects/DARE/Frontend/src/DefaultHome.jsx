// import Navbar from "./Navbar";
// import "./App.css";
// import Footer from "./Footer";
// import DefaultNavbar from "./DefaultNavbar";
// function DefaultHome() {
//   return (
//     <>
//       <DefaultNavbar />
//       <div
//         className="hero h-[500px]"
//         style={{
//           backgroundImage:
//             "url(https://www.shutterstock.com/image-photo/search-rescue-forces-through-destroyed-600nw-2341792387.jpg)",
//         }}
//       >
//         <div className="hero-content text-center text-neutral-content">
//           <div className="max-w-md">
//             <h1 className="mb-5 text-5xl font-bold text-primary">DARE </h1>
//             <div>
//               <h3 className="mb-5 flex items-center space-x-4 text-5xl font-bold">
//                 Building stronger communities, one disaster at a time.
//               </h3>
//             </div>
//             <p className="mb-5 font-semibold">
//               Connecting those in need with the help they deserve
//             </p>
//           </div>
//         </div>
//       </div>
//       <h2 className="mb-5 text-4xl font-semibold text-center mt-8">
//         What is DARE?
//       </h2>
//       <section className="dare-info p-5 bg-gray">
//         <div className="dare-content">
//           <div className="chat chat-start p-4">
//             <div className="chat-bubble chat-bubble-primary">
//               Oh no, the weather reports are saying a Category 5 hurricane is
//               heading straight for us! What are we going to do?!
//             </div>
//           </div>
//           <div className="chat chat-end">
//             <div className="chat-bubble chat-bubble-info">
//               Don't worry, DARE is here to help! We've been monitoring the
//               situation closely and have evacuation plans in place. We'll help
//               you.
//             </div>
//           </div>
//           <div className="chat chat-start p-4">
//             <div className="chat-bubble chat-bubble-primary">
//               I just felt the ground shaking! Was that an earthquake? I'm so
//               scared!
//             </div>
//           </div>
//           <div className="chat chat-end">
//             <div className="chat-bubble chat-bubble-info">
//               DARE is trained to handle these situations. Take cover under a
//               sturdy table or desk and hold on until the shaking stops.
//             </div>
//           </div>
//           <div className="chat chat-start p-4">
//             <div className="chat-bubble chat-bubble-primary">
//               I see smoke rising in the distance! There must be a wildfire
//               nearby! Are we in danger?
//             </div>
//           </div>
//           <div className="chat chat-end">
//             <div className="chat-bubble chat-bubble-info">
//               DARE is already assessing the situation and coordinating with
//               firefighters. We'll send out alerts if evacuations are necessary.
//             </div>
//           </div>
//           <div className="chat chat-start p-4">
//             <div className="chat-bubble chat-bubble-primary">
//               The blizzard is getting worse! The roads are already impassable,
//               and we're running low on supplies!
//             </div>
//           </div>
//           <div className="chat chat-end">
//             <div className="chat-bubble chat-bubble-info">
//               DARE is aware of the blizzard conditions. We're working on
//               clearing roads and getting essential supplies to affected areas.
//             </div>
//           </div>
//         </div>

//         <div className="divider bg-inherit"></div>
//         <h2 className="mb-5 text-4xl font-semibold text-center">About DARE</h2>
//         <p className="mb-5 text-xl font-medium text-center">
//           DARE, a disaster awareness and rescue engine, is your one-stop
//           platform for everything disaster-related: preparedness, real-time
//           emergency response, and vital rescue coordination. Empower yourself
//           and your community with the knowledge and tools to navigate any
//           disaster. Don't be caught off guard – with DARE, you'll have access to
//           expert-curated resources, 24/7 support, and a direct line to emergency
//           services during critical moments. Whether you're facing a powerful
//           hurricane, a devastating earthquake, or a sudden flood, DARE provides
//           peace of mind knowing help is just a click away. Build a comprehensive
//           survival plan, receive real-time updates on unfolding events, and
//           connect with rescue teams seamlessly – all through DARE's
//           user-friendly interface.
//           <div className="divider bg-inherit"></div>
//           <h2 className="mb-5 text-4xl font-semibold text-center ">
//             DARE Features
//           </h2>
//           <section className="dare-explanation bg-gray">
//             <ul className="menu ">
//               <li className="menu-item p-5">
//                 <p className="text-xl font-medium text-center">
//                   Learn about potential hazards in your area and access
//                   essential survival skills.
//                 </p>
//               </li>
//               <li className="menu-item p-5">
//                 <p className="text-xl font-medium text-center">
//                   Connect with volunteers and first responders during
//                   emergencies.
//                 </p>
//               </li>
//               <li className="menu-item p-5">
//                 <p className="text-xl font-medium text-center">
//                   Enable faster and more coordinated rescue efforts. Save lives
//                   in critical moments.
//                 </p>
//               </li>
//             </ul>
//             <div className="divider bg-inherit"></div>
//             <h2 className="mb-5 text-4xl font-semibold text-center">
//               Join DARE!
//             </h2>
//             <div className="card lg:card-side  bg-gray bg-opacity-60 shadow-xl p-4">
//               <figure>
//                 <img
//                   src="https://media.istockphoto.com/id/1644193055/photo/search-and-rescue-forces-search-through-destroyed-building-with-the-help-of-rescue-dogs.jpg?s=612x612&w=0&k=20&c=rXnkYBVC_72MmutIrdj470xipxFAiAXZ2RrmRRkAVvw="
//                   alt="Album"
//                   className="w-full h-48 object-cover"
//                 />
//               </figure>
//               <div className="pb-5"></div>

//               <p className=" card -body pt-4flex justify-CENTER ">
//                 Become a hero! Sign up as a volunteer to lend a helping hand
//                 during disasters. Sign up as a volunteer to lend a helping hand
//                 during disasters. Join our network of caring individuals who
//                 make a difference in times of crisis. We connect People Who Want
//                 to Help.
//               </p>
//             </div>

//             <div className="divider"></div>
//             <h2 className="mb-5 text-4xl font-semibold text-center">
//               Use DARE!
//             </h2>
//             <div className="card lg:card-side bg-gray bg-opacity-60 shadow-xl p-4">
//               <figure>
//                 <img
//                   src="https://media.istockphoto.com/id/1155828630/photo/take-my-hand-and-let-me-help-you.webp?b=1&s=170667a&w=0&k=20&c=OP6KqJsTIpGJ50VcBKfCqSU7tk4MI5mZ9xM7uoUTcPU="
//                   className="w-full h-48 object-cover"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">Get Help Now!</h2>
//                 <p className=" flex justify-start">
//                   Connecting survivors with the help they need quickly. You're
//                   not alone!
//                 </p>
//               </div>
//             </div>
//           </section>
//         </p>
//       </section>
//       <Footer />
//     </>
//   );
// }

// export default DefaultHome;
import Navbar from "./Navbar";
import "./App.css";
import Footer from "./Footer";
import DefaultNavbar from "./DefaultNavbar";
import { useNavigate } from "react-router-dom";
function DefaultHome() {
  const navigate = useNavigate();
  return (
    <>
      <DefaultNavbar />

      <div
        className="hero h-[500px] "
        style={{
          backgroundImage:
            "url(https://www.shutterstock.com/image-photo/search-rescue-forces-through-destroyed-600nw-2341792387.jpg)",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60"></div>
        <div className="hero-content text-center  text-blue-50  absolute flex flex-col justify-center items-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold ">DARE</h1>
            <div>
              <h3 className="mb-5 flex items-center space-x-4 text-3xl font-bold">
                Building stronger communities, one disaster at a time.
              </h3>
            </div>
            <p className="mb-5 font-semibold text-lg ">
              Connecting those in need with the help they deserve
            </p>
          </div>
        </div>
      </div>

      <h2 className="mb-0 text-4xl font-semibold text-blue-800 bg-base-200 text-center p-8 mt-0">
        What is DARE?
      </h2>
      <section className="dare-info p-5 mb-0  bg-blue-50">
        <div className="dare-content">
          <div className="chat chat-start p-4">
            <div className="chat-bubble chat-bubble-primary bg-violet-500 text-white">
              Oh no, the weather reports are saying a Category 5 hurricane is
              heading straight for us! What are we going to do?!
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info bg-blue-500 text-white">
              Don't worry, DARE is here to help! We've been monitoring the
              situation closely and have evacuation plans in place. We'll help
              you.
            </div>
          </div>
          <div className="chat chat-start p-4">
            <div className="chat-bubble chat-bubble-primary bg-violet-500 text-white">
              I just felt the ground shaking! Was that an earthquake? I'm so
              scared!
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info bg-blue-500 text-white">
              DARE is trained to handle these situations. Take cover under a
              sturdy table or desk and hold on until the shaking stops.
            </div>
          </div>
          <div className="chat chat-start p-4">
            <div className="chat-bubble chat-bubble-primary bg-violet-500 text-white">
              I see smoke rising in the distance! There must be a wildfire
              nearby! Are we in danger?
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info bg-blue-500 text-white">
              DARE is already assessing the situation and coordinating with
              firefighters. We'll send out alerts if evacuations are necessary.
            </div>
          </div>
          <div className="chat chat-start p-4">
            <div className="chat-bubble chat-bubble-primary bg-violet-500 text-white">
              The blizzard is getting worse! The roads are already impassable,
              and we're running low on supplies!
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-info bg-blue-500 text-white">
              DARE is aware of the blizzard conditions. We're working on
              clearing roads and getting essential supplies to affected areas.
            </div>
          </div>
        </div>
      </section>
      <h2 className="mb-5 text-4xl font-semibold bg-base-200 text-blue-800 p-4 text-center">
        About DARE
      </h2>
      <section className="dare-info p-5 bg-blue-50">
        <div className="dare-content">
          <p className="mb-8 text-xl font-medium text-center text-violet-800">
            DARE, a disaster awareness and rescue engine, is your one-stop
            platform for everything disaster-related: preparedness, real-time
            emergency response, and vital rescue coordination. Empower yourself
            and your community with the knowledge and tools to navigate any
            disaster. Don't be caught off guard – with DARE, you'll have access
            to expert-curated resources, 24/7 support, and a direct line to
            emergency services during critical moments. Whether you're facing a
            powerful hurricane, a devastating earthquake, or a sudden flood,
            DARE provides peace of mind knowing help is just a click away. Build
            a comprehensive survival plan, receive real-time updates on
            unfolding events, and connect with rescue teams seamlessly – all
            through DARE's user-friendly interface.
          </p>
        </div>
      </section>
      <h2 className="mb-5 text-4xl font-semibold text-center p-4 text-blue-800 ">
        DARE Features
      </h2>
      <section className="dare-explanation bg-blue-50 p-8">
        <ul className="menu grid grid-cols-1 md:grid-cols-3 gap-8">
          <li className="menu-item p-5 bg-white rounded-lg shadow-md">
            <p className="text-xl font-medium text-center text-violet-800">
              Learn about potential hazards in your area and access essential
              survival skills.
            </p>
          </li>
          <li className="menu-item p-5 bg-white rounded-lg shadow-md">
            <p className="text-xl font-medium text-center text-violet-800">
              Connect with volunteers and first responders during emergencies.
            </p>
          </li>
          <li className="menu-item p-5 bg-white rounded-lg shadow-md">
            <p className="text-xl font-medium text-center text-violet-800">
              Enable faster and more coordinated rescue efforts. Save lives in
              critical moments.
            </p>
          </li>
        </ul>
      </section>
      {/* <div className="divider bg-gray-400 my-8"></div>
            <h2 className="mb-5 text-4xl font-semibold text-center">
              Join DARE!
            </h2>
            <div className="card lg:card-side bg-gray bg-opacity-60 shadow-xl p-8">
              <figure className="mb-4">
                <img
                  src="https://media.istockphoto.com/id/1644193055/photo/search-and-rescue-forces-search-through-destroyed-building-with-the-help-of-rescue-dogs.jpg?s=612x612&w=0&k=20&c=rXnkYBVC_72MmutIrdj470xipxFAiAXZ2RrmRRkAVvw="
                  alt="Album"
                  className="w-full h-48 object-cover rounded-md"
                />
              </figure>
              <p className="text-xl font-medium text-center text-gray-800">
                Become a hero! Sign up as a volunteer to lend a helping hand
                during disasters. Join our network of caring individuals who
                make a difference in times of crisis. We connect People Who Want
                to Help.
              </p>
            </div>
            <div className="divider my-8"></div>
            <h2 className="mb-5 text-4xl font-semibold text-center">
              Use DARE!
            </h2>
            <div className="card lg:card-side bg-gray bg-opacity-60 shadow-xl p-8">
              <figure className="mb-4">
                <img
                  src="https://media.istockphoto.com/id/1155828630/photo/take-my-hand-and-let-me-help-you.webp?b=1&s=170667a&w=0&k=20&c=OP6KqJsTIpGJ50VcBKfCqSU7tk4MI5mZ9xM7uoUTcPU="
                  className="w-full h-48 object-cover rounded-md"
                  alt="Get Help Now"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl font-medium text-center text-gray-800">
                  Get Help Now!
                </h2>
                <p className="text-base font-medium text-gray-800 text-center">
                  Connecting survivors with the help they need quickly. You're
                  not alone!
                </p>
              </div>
            </div>
          </div> */}

      <h2 className="mb-5 text-4xl font-semibold text-center p-4 text-blue-800 ">
        Join DARE!
      </h2>
      <div className="card lg:card-side bg-blue-50 shadow-xl rounded-xl overflow-hidden">
        <figure>
          <img
            src="https://media.istockphoto.com/id/1644193055/photo/search-and-rescue-forces-search-through-destroyed-building-with-the-help-of-rescue-dogs.jpg?s=612x612&w=0&k=20&c=rXnkYBVC_72MmutIrdj470xipxFAiAXZ2RrmRRkAVvw="
            alt="Album"
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body p-8">
          <h2 className="text-2xl font-semibold text-violet-800 mb-4">
            Become a hero! Sign up as a volunteer to lend a helping hand during
            disasters.
          </h2>
          <p className="text-lg text-black font-mono mb-4">
            Join our network of caring individuals who make a difference in
            times of crisis. We connect People Who Want to Help.
          </p>
          {/* <button
            onClick={() => navigate("/v")}
            className="btn btn-outline btn-primary w-full"
          >
            Sign Up
          </button> */}
        </div>
      </div>

      <h2 className="mb-5 text-4xl  pt-5 pb-4 text-blue-800 font-semibold text-center">
        Use DARE!
      </h2>
      <div className="card lg:card-side bg-blue-50 shadow-xl rounded-xl overflow-hidden">
        <figure>
          <img
            src="https://media.istockphoto.com/id/1155828630/photo/take-my-hand-and-let-me-help-you.webp?b=1&s=170667a&w=0&k=20&c=OP6KqJsTIpGJ50VcBKfCqSU7tk4MI5mZ9xM7uoUTcPU="
            className="w-full h-64 object-cover"
            alt="Get Help Now"
          />
        </figure>
        <div className="card-body p-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Get Help Now!
          </h2>
          <p className="text-lg text-black font-mono mb-4">
            Connecting survivors with the help they need quickly. You're not
            alone!
          </p>
          <button
            onClick={() => navigate("/safety")}
            className="btn btn-outline btn-primary w-full"
          >
            Get Help
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DefaultHome;
