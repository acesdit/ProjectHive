// // import React, { useState, useEffect } from "react";
// // import AdminFooter from "./AdminFooter";
// // import AdminNavbar from "./AdminNavbar";

// // function AdminEmergency() {
// //   const [emergencyContacts, setEmergencyContacts] = useState([]);
// //   const [totalItems, setTotalItems] = useState(0);
// //   const [showEditForm, setShowEditForm] = useState(false);
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [editingContact, setEditingContact] = useState(null);
// //   const [newContact, setNewContact] = useState({
// //     E_ID: "",
// //     Name: "",
// //     Contact: "",
// //     disaster_type: "",
// //     current_location: "",
// //     isCurrentVictim: false,
// //   });

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch(
// //         "http://localhost:8081/api/emergency_help_request_victim_records"
// //       );
// //       const data = await response.json();
// //       setEmergencyContacts(data);
// //       setTotalItems(data.length);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const deleteContact = async (id) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:8081/api/emergency_help_request_victim_records/${id}`,
// //         {
// //           method: "DELETE",
// //         }
// //       );
// //       if (!response.ok) {
// //         throw new Error("Failed to delete contact");
// //       }
// //       fetchData();
// //     } catch (error) {
// //       console.error("Error deleting contact:", error);
// //     }
// //   };

// //   const handleUpdate = async () => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:8081/api/emergency_help_request_victim_records/${editingContact.E_ID}`,
// //         {
// //           method: "PUT",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(editingContact),
// //         }
// //       );
// //       if (!response.ok) {
// //         throw new Error("Failed to update contact");
// //       }
// //       fetchData();
// //       setShowEditForm(false);
// //     } catch (error) {
// //       console.error("Error updating contact:", error);
// //     }
// //   };

// //   const handleAdd = async () => {
// //     try {
// //       const response = await fetch(
// //         "http://localhost:8081/api/emergency_help_request_victim_records",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(newContact),
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error("Failed to add contact");
// //       }

// //       console.log("Contact added successfully");
// //       setNewContact({
// //         E_ID: "",
// //         Name: "",
// //         Contact: "",
// //         disaster_type: "",
// //         current_location: "",
// //         isCurrentVictim: false,
// //       });
// //       fetchData();
// //     } catch (error) {
// //       console.error("Error adding contact:", error);
// //     }
// //   };

// //   return (
// //     <>
// //       <AdminNavbar />
// //       <h1 className="text-5xl font-bold flex justify-center m-4">
// //         EMERGENCY CONTACTS DATABASE
// //       </h1>
// //       <p>Total Contacts: {totalItems}</p>
// //       <button onClick={() => setShowAddForm(true)}>Add New Contact</button>
// //       <div className="overflow-x-auto">
// //         <table className="table">
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Name</th>
// //               <th>Contact</th>
// //               <th>Disaster Type</th>
// //               <th>Current Location</th>
// //               <th>Is Current Victim</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {emergencyContacts.map((contact) => (
// //               <tr key={contact.E_ID}>
// //                 <td>{contact.E_ID}</td>
// //                 <td>{contact.Name}</td>
// //                 <td>{contact.Contact}</td>
// //                 <td>{contact.disaster_type}</td>
// //                 <td>{contact.current_location}</td>
// //                 <td>{contact.isCurrentVictim ? "Yes" : "No"}</td>
// //                 <td>
// //                   <button
// //                     className="btn"
// //                     onClick={() => deleteContact(contact.E_ID)}
// //                   >
// //                     Delete
// //                   </button>
// //                   <button
// //                     className="btn"
// //                     onClick={() => {
// //                       setShowEditForm(true);
// //                       setEditingContact(contact);
// //                     }}
// //                   >
// //                     Edit
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //       {showEditForm && (
// //         <div className="edit-form">
// //           <h3>Edit Contact</h3>
// //           <input
// //             type="text"
// //             value={editingContact.Name}
// //             onChange={(e) =>
// //               setEditingContact({ ...editingContact, Name: e.target.value })
// //             }
// //           />
// //           <input
// //             type="text"
// //             value={editingContact.Contact}
// //             onChange={(e) =>
// //               setEditingContact({ ...editingContact, Contact: e.target.value })
// //             }
// //           />
// //           <input
// //             type="text"
// //             value={editingContact.disaster_type}
// //             onChange={(e) =>
// //               setEditingContact({
// //                 ...editingContact,
// //                 disaster_type: e.target.value,
// //               })
// //             }
// //           />
// //           <input
// //             type="text"
// //             value={editingContact.current_location}
// //             onChange={(e) =>
// //               setEditingContact({
// //                 ...editingContact,
// //                 current_location: e.target.value,
// //               })
// //             }
// //           />
// //           <label>
// //             Is Current Victim:
// //             <input
// //               type="checkbox"
// //               checked={editingContact.isCurrentVictim}
// //               onChange={(e) =>
// //                 setEditingContact({
// //                   ...editingContact,
// //                   isCurrentVictim: e.target.checked,
// //                 })
// //               }
// //             />
// //           </label>
// //           <button className="btn" onClick={handleUpdate}>
// //             Update
// //           </button>
// //         </div>
// //       )}

// //       {showAddForm && (
// //         <div className="add-form">
// //           <h3>Add New Contact</h3>
// //           <form
// //             onSubmit={(e) => {
// //               e.preventDefault();
// //               handleAdd();
// //             }}
// //           >
// //             {/* Add input fields for new contact */}
// //             <button type="submit" className="btn">
// //               Add
// //             </button>
// //           </form>
// //           {showAddForm && (
// //             <div className="add-form">
// //               <h3>Add New Contact</h3>
// //               <form
// //                 onSubmit={(e) => {
// //                   e.preventDefault();
// //                   handleAdd();
// //                 }}
// //               >
// //                 <input
// //                   type="text"
// //                   placeholder="Name"
// //                   value={newContact.Name}
// //                   onChange={(e) =>
// //                     setNewContact((prev) => ({
// //                       ...prev,
// //                       Name: e.target.value,
// //                     }))
// //                   }
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Contact"
// //                   value={newContact.Contact}
// //                   onChange={(e) =>
// //                     setNewContact((prev) => ({
// //                       ...prev,
// //                       Contact: e.target.value,
// //                     }))
// //                   }
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Disaster Type"
// //                   value={newContact.disaster_type}
// //                   onChange={(e) =>
// //                     setNewContact((prev) => ({
// //                       ...prev,
// //                       disaster_type: e.target.value,
// //                     }))
// //                   }
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Current Location"
// //                   value={newContact.current_location}
// //                   onChange={(e) =>
// //                     setNewContact((prev) => ({
// //                       ...prev,
// //                       current_location: e.target.value,
// //                     }))
// //                   }
// //                 />
// //                 <select
// //                   value={newContact.isCurrentVictim}
// //                   onChange={(e) =>
// //                     setNewContact((prev) => ({
// //                       ...prev,
// //                       isCurrentVictim: e.target.value === "true",
// //                     }))
// //                   }
// //                 >
// //                   <option value={true}>Yes</option>
// //                   <option value={false}>No</option>
// //                 </select>
// //                 <button className="btn" type="submit">
// //                   Add
// //                 </button>
// //               </form>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //       <AdminFooter />
// //     </>
// //   );
// // }

// // export default AdminEmergency;
// import React, { useState, useEffect } from "react";
// import AdminFooter from "./AdminFooter";
// import AdminNavbar from "./AdminNavbar";

// function AdminEmergency() {
//   const [emergencyContacts, setEmergencyContacts] = useState([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingContact, setEditingContact] = useState(null);
//   const [newContact, setNewContact] = useState({
//     E_ID: "",
//     Name: "",
//     Contact: "",
//     disaster_type: "",
//     current_location: "",
//     isCurrentVictim: false,
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8081/api/emergency_help_request_victim_records"
//       );
//       const data = await response.json();
//       setEmergencyContacts(data);
//       setTotalItems(data.length);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const deleteContact = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8081/api/emergency_help_request_victim_records/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to delete contact");
//       }
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8081/api/emergency_help_request_victim_records/${editingContact.E_ID}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(editingContact),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to update contact");
//       }
//       fetchData();
//       setShowEditForm(false);
//     } catch (error) {
//       console.error("Error updating contact:", error);
//     }
//   };

//   const handleAdd = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8081/api/emergency_help_request_victim_records",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newContact),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to add contact");
//       }

//       console.log("Contact added successfully");
//       setNewContact({
//         E_ID: "",
//         Name: "",
//         Contact: "",
//         disaster_type: "",
//         current_location: "",
//         isCurrentVictim: false,
//       });
//       fetchData();
//     } catch (error) {
//       console.error("Error adding contact:", error);
//     }
//   };

//   const [searchTerm, setSearchTerm] = useState("");
//   // Function to filter contacts based on search term
//   useEffect(() => {
//     searchContacts();
//   }, [searchTerm]);

//   return (
//     <>
//       <AdminNavbar />
//       <div className="bg-base-200">
//         <h1 className="text-5xl font-bold text-violet-800 flex justify-center m-4">
//           VICTIM DATA
//         </h1>
//         <p className="text-xl font-semibold text-blue-800 pb-3 flex justify-center">
//           Total No: {totalItems}
//         </p>
//         <div className="flex justify-center">
//           <input
//             type="text"
//             placeholder="Search by Name"
//             className="input input-bordered m-4"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               console.log("Search Term:", e.target.value);
//             }}
//           />
//         </div>
//         <button
//           className="btn btn-primary"
//           onClick={() => setShowAddForm(true)}
//         >
//           Add New Victim
//         </button>
//         <div className="overflow-x-auto pt-6">
//           <table className="table">
//             <thead className="p-5 text-2xl text-blue-800 bg-blue-50">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Contact</th>
//                 <th>Disaster Type</th>
//                 <th>Current Location</th>
//                 <th>Is Current Victim</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="p-4 text-lg">
//               {emergencyContacts.map((contact) => (
//                 <tr key={contact.E_ID}>
//                   <td>{contact.E_ID}</td>
//                   <td>{contact.Name}</td>
//                   <td>{contact.Contact}</td>
//                   <td>{contact.disaster_type}</td>
//                   <td>{contact.current_location}</td>
//                   <td>{contact.isCurrentVictim ? "Yes" : "No"}</td>
//                   <td>
//                     {/* <button
//                         className="btn btn-outline btn-error"
//                         onClick={() => deleteContact(contact.E_ID)}
//                       >
//                         Delete
//                       </button>
//                       &nbsp;&nbsp; */}
//                     <button
//                       className="btn btn-outline btn-success"
//                       onClick={() => {
//                         setShowEditForm(true);
//                         setEditingContact(contact);
//                       }}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {showEditForm && (
//           <div className="edit-form pt-4 pl-5 pb-6">
//             <h3 className="text-lg text-blue-800 font-semibold">
//               Edit Contact
//             </h3>
//             <input
//               type="text"
//               className="input input-bordered"
//               value={editingContact.E_ID}
//               onChange={(e) =>
//                 setEditingContact({ ...editingContact, E_ID: e.target.value })
//               }
//             />
//             &nbsp;&nbsp;
//             <input
//               type="text"
//               className="input input-bordered"
//               value={editingContact.Name}
//               onChange={(e) =>
//                 setEditingContact({ ...editingContact, Name: e.target.value })
//               }
//             />
//             &nbsp;&nbsp;
//             <input
//               type="text"
//               className="input input-bordered"
//               value={editingContact.Contact}
//               onChange={(e) =>
//                 setEditingContact({
//                   ...editingContact,
//                   Contact: e.target.value,
//                 })
//               }
//             />
//             &nbsp;&nbsp;
//             <input
//               type="text"
//               className="input input-bordered"
//               value={editingContact.disaster_type}
//               onChange={(e) =>
//                 setEditingContact({
//                   ...editingContact,
//                   disaster_type: e.target.value,
//                 })
//               }
//             />
//             &nbsp;&nbsp;
//             <input
//               type="text"
//               className="input input-bordered"
//               value={editingContact.current_location}
//               onChange={(e) =>
//                 setEditingContact({
//                   ...editingContact,
//                   current_location: e.target.value,
//                 })
//               }
//             />
//             &nbsp;&nbsp;
//             <label>
//               Is Current Victim:
//               <input
//                 type="checkbox"
//                 checked={editingContact.isCurrentVictim}
//                 onChange={(e) =>
//                   setEditingContact({
//                     ...editingContact,
//                     isCurrentVictim: e.target.checked,
//                   })
//                 }
//               />
//               &nbsp;&nbsp;
//             </label>
//             <button className="btn btn-success" onClick={handleUpdate}>
//               Update
//             </button>
//           </div>
//         )}

//         {showAddForm && (
//           <div className="add-form">
//             <h3 className="text-lg text-blue-800 font-semibold pt-5 pl-5">
//               Add New Contact
//             </h3>
//             <form
//               className="pt-4 pl-5 pb-6"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAdd();
//               }}
//             >
//               <input
//                 type="text"
//                 className="input input-bordered"
//                 placeholder="E_ID"
//                 value={newContact.E_ID}
//                 onChange={(e) =>
//                   setNewContact((prev) => ({
//                     ...prev,
//                     E_ID: e.target.value,
//                   }))
//                 }
//               />
//               &nbsp;&nbsp;
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="input input-bordered"
//                 value={newContact.Name}
//                 onChange={(e) =>
//                   setNewContact((prev) => ({
//                     ...prev,
//                     Name: e.target.value,
//                   }))
//                 }
//               />
//               &nbsp;&nbsp;
//               <input
//                 type="text"
//                 placeholder="Contact"
//                 className="input input-bordered"
//                 value={newContact.Contact}
//                 onChange={(e) =>
//                   setNewContact((prev) => ({
//                     ...prev,
//                     Contact: e.target.value,
//                   }))
//                 }
//               />
//               &nbsp;&nbsp;
//               <input
//                 type="text"
//                 placeholder="Disaster Type"
//                 className="input input-bordered"
//                 value={newContact.disaster_type}
//                 onChange={(e) =>
//                   setNewContact((prev) => ({
//                     ...prev,
//                     disaster_type: e.target.value,
//                   }))
//                 }
//               />
//               &nbsp;&nbsp;
//               <input
//                 type="text"
//                 placeholder="Current Location"
//                 className="input input-bordered"
//                 value={newContact.current_location}
//                 onChange={(e) =>
//                   setNewContact((prev) => ({
//                     ...prev,
//                     current_location: e.target.value,
//                   }))
//                 }
//               />
//               &nbsp;&nbsp;
//               <label>
//                 Is Current Victim:
//                 <input
//                   type="checkbox"
//                   checked={newContact.isCurrentVictim}
//                   onChange={(e) =>
//                     setNewContact((prev) => ({
//                       ...prev,
//                       isCurrentVictim: e.target.checked,
//                     }))
//                   }
//                 />
//               </label>
//               &nbsp;&nbsp;
//               <button className="btn btn-success" type="submit">
//                 Add
//               </button>
//             </form>
//           </div>
//         )}
//         <AdminFooter />
//       </div>
//     </>
//   );
// }

// export default AdminEmergency;
import React, { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

function AdminEmergency() {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    E_ID: "",
    Name: "",
    Contact: "",
    disaster_type: "",
    current_location: "",
    isCurrentVictim: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [emergencyContacts, filterCriteria]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/emergency_help_request_victim_records"
      );
      const data = await response.json();
      setEmergencyContacts(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/emergency_help_request_victim_records/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/emergency_help_request_victim_records/${editingContact.E_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingContact),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update contact");
      }
      fetchData();
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleAdd = async () => {
    try {
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
        E_ID: "",
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

  const filterContacts = () => {
    let filteredContacts = emergencyContacts;
    if (filterCriteria) {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.disaster_type === filterCriteria
      );
    }
    if (searchTerm) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setEmergencyContacts(filteredContacts);
  };

  return (
    <>
      <AdminNavbar />
      <div className="bg-base-200">
        <h1 className="text-5xl font-bold text-violet-800 flex justify-center m-4">
          VICTIM DATA
        </h1>
        <p className="text-xl font-semibold text-blue-800 pb-3 flex justify-center">
          Total No: {totalItems}
        </p>
        <div className="flex justify-center">
          {/* <input
            type="text"
            placeholder="Search by Name"
            className="input input-bordered m-4"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          /> */}
          <select
            className="input input-bordered m-4"
            value={filterCriteria}
            onChange={(e) => {
              setFilterCriteria(e.target.value);
            }}
          >
            <option value="">Filter by Disaster Type</option>
            <option value="Flood">Flood</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Fire">Fire</option>
            <option value="Hurricane">Hurricane</option>
            <option value="Cyclone">Cyclone</option>
            {/* Add other disaster types */}
          </select>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          Add New Victim
        </button>
        <div className="overflow-x-auto pt-6">
          <table className="table">
            <thead className="p-5 text-2xl text-blue-800 bg-blue-50">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Disaster Type</th>
                <th>Current Location</th>
                <th>Is Current Victim</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="p-4 text-lg">
              {emergencyContacts.map((contact) => (
                <tr key={contact.E_ID}>
                  <td>{contact.E_ID}</td>
                  <td>{contact.Name}</td>
                  <td>{contact.Contact}</td>
                  <td>{contact.disaster_type}</td>
                  <td>{contact.current_location}</td>
                  <td>{contact.isCurrentVictim ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-outline btn-success"
                      onClick={() => {
                        setShowEditForm(true);
                        setEditingContact(contact);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showEditForm && (
          <div className="edit-form pt-4 pl-5 pb-6">
            <h3 className="text-lg text-blue-800 font-semibold">
              Edit Contact
            </h3>
            {/* Input fields for editing contact */}
          </div>
        )}
        {showAddForm && (
          <div className="add-form">
            <h3 className="text-lg text-blue-800 font-semibold pt-5 pl-5">
              Add New Contact
            </h3>
            {/* Form for adding new contact */}
          </div>
        )}
        <AdminFooter />
      </div>
    </>
  );
}

export default AdminEmergency;
