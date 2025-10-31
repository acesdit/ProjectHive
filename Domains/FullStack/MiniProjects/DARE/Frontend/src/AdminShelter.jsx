import React, { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

function AdminShelters() {
  const [shelterData, setShelterData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingShelter, setEditingShelter] = useState(null);
  const [newShelter, setNewShelter] = useState({
    sid: "",
    location: "",
    capacity: "",
    aid: "",
  });
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/shelter");
      const data = await response.json();
      setShelterData(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteShelter = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/shelter/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete shelter");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting shelter:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/shelter/${editingShelter.sid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingShelter),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update shelter");
      }
      fetchData();
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating shelter:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/shelter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShelter),
      });

      if (!response.ok) {
        throw new Error("Failed to add shelter");
      }

      console.log("Shelter added successfully");
      setNewShelter({
        sid: "",
        location: "",
        capacity: "",
        aid: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error adding shelter:", error);
    }
  };
  const handleLocationChange = (e) => {
    setCurrentLocation(e.target.value);
  };

  const filteredShelterData = shelterData.filter((shelter) =>
    shelter.location.toLowerCase().includes(currentLocation.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />
      <h1 className="text-5xl font-bold flex justify-center m-4">
        SHELTERS DATABASE
      </h1>
      <div className="label">
        <span className="label-text text-lg text-blue-800">
          What is your current Location?
        </span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full max-w-xs"
        value={currentLocation}
        onChange={handleLocationChange}
      />
      <p>Total Shelters: {totalItems}</p>
      <button onClick={() => setShowAddForm(true)}>Add New Shelter</button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>AID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShelterData.map((shelter) => (
              <tr key={shelter.sid}>
                <td>{shelter.sid}</td>
                <td>{shelter.location}</td>
                <td>{shelter.capacity}</td>
                <td>{shelter.aid}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteShelter(shelter.sid)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setShowEditForm(true);
                      setEditingShelter(shelter);
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
        <div className="edit-form">
          <h3>Edit Shelter</h3>
          <input
            type="text"
            value={editingShelter.location}
            onChange={(e) =>
              setEditingShelter({ ...editingShelter, location: e.target.value })
            }
          />
          <input
            type="text"
            value={editingShelter.capacity}
            onChange={(e) =>
              setEditingShelter({ ...editingShelter, capacity: e.target.value })
            }
          />
          <input
            type="text"
            value={editingShelter.aid}
            onChange={(e) =>
              setEditingShelter({ ...editingShelter, aid: e.target.value })
            }
          />
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Shelter</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <input
              type="text"
              placeholder="ID"
              value={newShelter.sid}
              onChange={(e) =>
                setNewShelter((prev) => ({
                  ...prev,
                  sid: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={newShelter.location}
              onChange={(e) =>
                setNewShelter((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Capacity"
              value={newShelter.capacity}
              onChange={(e) =>
                setNewShelter((prev) => ({
                  ...prev,
                  capacity: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="AID"
              value={newShelter.aid}
              onChange={(e) =>
                setNewShelter((prev) => ({
                  ...prev,
                  aid: e.target.value,
                }))
              }
            />
            <button className="btn" type="submit">
              Add
            </button>
          </form>
        </div>
      )}

      <AdminFooter />
    </>
  );
}

export default AdminShelters;
