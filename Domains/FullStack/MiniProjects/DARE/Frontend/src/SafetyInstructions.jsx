// import Footer from "./Footer";
// import Navbar from "./Navbar";
// function SafetyInstructions() {
//   return (
//     <>
//       <Navbar />
//       <div className="hero min-h-screen bg-base-200">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl font-bold">Get Help now!</h1>
//             <p className="py-6">
//               Tell us your current location and we will reach out to you!
//             </p>
//           </div>
//           <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//             <form className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Disaster Type:</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="eg: Flood"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Current Location</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="eg:Delhi"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               {/* Open the modal using document.getElementById('ID').showModal() method */}
//               <button
//                 className="btn btn-primary"
//                 onClick={() =>
//                   document.getElementById("my_modal_1").showModal()
//                 }
//               >
//                 Submit
//               </button>
//               <dialog id="my_modal_1" className="modal">
//                 <div className="modal-box">
//                   <h3 className="font-bold text-lg">Hello!</h3>
//                   <p className="py-4">
//                     Your request has been received! Go through safety
//                     Instructions below and stay safe.
//                   </p>
//                   <div className="modal-action">
//                     <form method="dialog">
//                       {/* if there is a button in form, it will close the modal */}
//                       <button className="btn">Close</button>
//                     </form>
//                   </div>
//                 </div>
//               </dialog>
//             </form>
//           </div>
//         </div>
//       </div>
//       <ul className="safety-instructions">
//         <li className="earthquake-instructions">
//           <strong>Earthquake Safety Instructions:</strong>
//           <ul>
//             <li>
//               Drop, Cover, and Hold On: Drop to the ground, take cover under a
//               sturdy piece of furniture, and hold on until the shaking stops.
//             </li>
//             <li>
//               Stay Indoors: If indoors, stay there until the shaking stops and
//               it's safe to exit. Avoid doorways, windows, and elevators.
//             </li>
//             <li>
//               If Outdoors: Move to an open area away from buildings, trees,
//               streetlights, and utility wires.
//             </li>
//             <li>
//               Be Prepared: Have an earthquake kit ready with essentials such as
//               water, food, flashlight, first aid supplies, and important
//               documents.
//             </li>
//           </ul>
//         </li>

//         <li className="hurricane-instructions">
//           <strong>Hurricane Safety Instructions:</strong>
//           <ul>
//             <li>
//               Evacuation Plan: Follow evacuation orders if issued. Know your
//               evacuation route and have a plan in place.
//             </li>
//             <li>
//               Secure Property: Board up windows, secure outdoor objects, and
//               move vehicles to higher ground if possible.
//             </li>
//             <li>
//               Stay Informed: Keep track of weather updates and heed warnings
//               from local authorities.
//             </li>
//             <li>
//               Stock Supplies: Have a hurricane kit with water, non-perishable
//               food, medications, flashlights, batteries, and important
//               documents.
//             </li>
//           </ul>
//         </li>

//         <li className="flood-instructions">
//           <strong>Flood Safety Instructions:</strong>
//           <ul>
//             <li>
//               Evacuate if Necessary: Move to higher ground if flooding is
//               imminent. Never drive through flooded areas.
//             </li>
//             <li>
//               Turn Off Utilities: Shut off electricity and gas to prevent
//               accidents.
//             </li>
//             <li>
//               Avoid Contact with Floodwater: It may be contaminated or carry
//               debris.
//             </li>
//             <li>
//               Listen to Authorities: Follow instructions from emergency services
//               and evacuate when advised.
//             </li>
//           </ul>
//         </li>

//         <li className="wildfire-instructions">
//           <strong>Wildfire Safety Instructions:</strong>
//           <ul>
//             <li>
//               Create Defensible Space: Clear brush and vegetation around your
//               property to reduce the risk of fire spreading.
//             </li>
//             <li>
//               Prepare Your Home: Use fire-resistant materials for roofing and
//               siding. Keep gutters and roofs clear of debris.
//             </li>
//             <li>
//               Evacuation Plan: Have a plan in place and be ready to evacuate if
//               necessary. Keep important documents and valuables ready to go.
//             </li>
//             <li>
//               Monitor Alerts: Stay informed about wildfire alerts and evacuation
//               orders. Listen to local authorities and be prepared to act
//               quickly.
//             </li>
//           </ul>
//         </li>
//       </ul>

//       <Footer />
//     </>
//   );
// }

// export default SafetyInstructions;
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function SafetyInstructions() {
  const [selectedDisaster, setSelectedDisaster] = useState("");
  const [safetyInstructions, setSafetyInstructions] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/safety_instructions"
      );
      const data = await response.json();
      setSafetyInstructions(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [instructions, setInstructions] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    Name: "",
    Contact: "",
    disaster_type: "",
    current_location: "",
    isCurrentVictim: false,
  });

  useEffect(() => {
    if (selectedDisaster) {
      fetchSafetyInstructions(selectedDisaster);
    }
  }, [selectedDisaster]);

  const fetchSafetyInstructions = async (disasterType) => {
    try {
      const response = await fetch(`/api/safety_instructions/${disasterType}`);
      if (response.ok) {
        const data = await response.json();
        setInstructions(data);
      } else {
        console.error(
          "Failed to fetch safety instructions:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching safety instructions:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/emergency_help_request_victim_records"
      );
      const data = await response.json();
      setEmergencyContacts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedDisaster(event.target.value);
  };
  const handleAdd = async () => {
    try {
      console.log("Sending new contact:", newContact); // Log the data being sent
      const response = await fetch(
        "http://localhost:8081/api/emergency_help_request_victim_records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }

      console.log("Contact added successfully");
      setNewContact({
        Name: "",
        Contact: "",
        disaster_type: "",
        current_location: "",
        isCurrentVictim: false,
      });
      fetchData();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-blue-50">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl font-bold mb-6 text-violet-800">
              Get Help now!
            </h1>
            <p className="text-xl mb-8">
              Tell us your current location and we will reach out to you!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-8">
            <form
              className="card-body text-blue-800"
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              <div className="form-control mb-6">
                <label className="label ">
                  <span className="label-text text-xl">Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="pl-1 bg-blue-50 "
                  value={newContact.Name}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      Name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-xl">Contact:</span>
                </label>
                <input
                  type="text"
                  placeholder="Contact"
                  className="pl-1 bg-blue-50"
                  value={newContact.Contact}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      Contact: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-xl">Disaster Type:</span>
                </label>
                <input
                  type="text"
                  className="pl-1 bg-blue-50"
                  placeholder="Disaster Type"
                  value={newContact.disaster_type}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      disaster_type: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-xl">Current Location:</span>
                </label>
                <input
                  type="text"
                  placeholder="Current Location"
                  className="pl-1 bg-blue-50"
                  value={newContact.current_location}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      current_location: e.target.value,
                    }))
                  }
                />
              </div>
              {/* <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Are you a Victim?</span>
                </label>
                <input
                  type="checkbox"
                  checked={newContact.isCurrentVictim}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      isCurrentVictim: e.target.checked,
                    }))
                  }
                />
              </div> */}

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-outline btn-primary"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Submit
              </button>
            </form>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-violet-800">Hello!</h3>
                <p className="py-4 ">
                  Your request has been received! Go through safety Instructions
                  below and stay safe.
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn ">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      {/* <div className="form-control mb-0 p-10">
        <label className="label">
          <span className="label-text text-3xl text-violet-800 font-semibold mb-4">
            Disaster Type:
          </span>
        </label>
        <select
          className="select select-bordered"
          value={selectedDisaster}
          onChange={handleSelectChange}
        >
          <option className="text-lg p-2" value="">
            Select a disaster type
          </option>
          <option className="text-lg p-2" value="earthquake">
            Earthquake
          </option>
          <option className="text-lg p-2" value="hurricane">
            Hurricane
          </option>
          <option className="text-lg p-2" value="flood">
            Flood
          </option>
          <option className="text-lg p-2" value="wildfire">
            Wildfire
          </option>
        </select>
      </div>
      <ul className="safety-instructions mt-2 ml-5">
        {selectedDisaster === "earthquake" && (
          <li className="earthquake-instructions text-lg p-4 mb-8">
            <strong>Earthquake Safety Instructions:</strong>
            <ul className="mt-4">
              <li>
                Drop, Cover, and Hold On: Drop to the ground, take cover under a
                sturdy piece of furniture, and hold on until the shaking stops.
              </li>
              <li>
                Stay Indoors: If indoors, stay there until the shaking stops and
                it's safe to exit. Avoid doorways, windows, and elevators.
              </li>
              <li>
                If Outdoors: Move to an open area away from buildings, trees,
                streetlights, and utility wires.
              </li>
              <li>
                Be Prepared: Have an earthquake kit ready with essentials such
                as water, food, flashlight, first aid supplies, and important
                documents.
              </li>
            </ul>
          </li>
        )}

        {selectedDisaster === "hurricane" && (
          <li className="hurricane-instructions text-lg">
            <strong>Hurricane Safety Instructions:</strong>
            <ul className="mt-4">
              <li>
                Evacuation Plan: Follow evacuation orders if issued. Know your
                evacuation route and have a plan in place.
              </li>
              <li>
                Secure Property: Board up windows, secure outdoor objects, and
                move vehicles to higher ground if possible.
              </li>
              <li>
                Stay Informed: Keep track of weather updates and heed warnings
                from local authorities.
              </li>
              <li>
                Stock Supplies: Have a hurricane kit with water, non-perishable
                food, medications, flashlights, batteries, and important
                documents.
              </li>
            </ul>
          </li>
        )}

        {selectedDisaster === "flood" && (
          <li className="flood-instructions text-lg">
            <strong>Flood Safety Instructions:</strong>
            <ul className="mt-4">
              <li>
                Evacuate if Necessary: Move to higher ground if flooding is
                imminent. Never drive through flooded areas.
              </li>
              <li>
                Turn Off Utilities: Shut off electricity and gas to prevent
                accidents.
              </li>
              <li>
                Avoid Contact with Floodwater: It may be contaminated or carry
                debris.
              </li>
              <li>
                Listen to Authorities: Follow instructions from emergency
                services and evacuate when advised.
              </li>
            </ul>
          </li>
        )}

        {selectedDisaster === "wildfire" && (
          <li className="wildfire-instructions text-lg">
            <strong>Wildfire Safety Instructions:</strong>
            <ul className="mt-4">
              <li>
                Create Defensible Space: Clear brush and vegetation around your
                property to reduce the risk of fire spreading.
              </li>
              <li>
                Prepare Your Home: Use fire-resistant materials for roofing and
                siding. Keep gutters and roofs clear of debris.
              </li>
              <li>
                Evacuation Plan: Have a plan in place and be ready to evacuate
                if necessary. Keep important documents and valuables ready to
                go.
              </li>
              <li>
                Monitor Alerts: Stay informed about wildfire alerts and
                evacuation orders. Listen to local authorities and be prepared
                to act quickly.
              </li>
            </ul>
          </li>
        )}
      </ul> */}

      <div className="overflow-x-auto">
        <span className="text-2xl m-8 flex justify-center font-bold text-violet-800">
          Safety Instructions
        </span>
        <div className="flex justify-center items-center mb-9">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-1/4"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {/* <table className="table">
          <thead>
            <tr>
              <th>Safety Instructions</th>
            </tr>
          </thead>
          <tbody>
            {safetyInstructions
              .filter((instruction) =>
                instruction.safety_instructions
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((instruction, index) => (
                <tr key={index}>
                  <td>{instruction.safety_instructions}</td>
                </tr>
              ))}
          </tbody>
        </table> */}
        <table className="table w-full border-collapse border border-gray-200 ">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-medium text-violet-800 uppercase tracking-wider">
                Safety Instructions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {safetyInstructions
              .filter((instruction) =>
                instruction.safety_instructions
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((instruction, index) => (
                <tr key={index} className="hover:bg-violet-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg text-gray-900">
                      {instruction.safety_instructions}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default SafetyInstructions;
