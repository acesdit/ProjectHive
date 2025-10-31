import React, { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

function AdminRescue() {
  const [rescueData, setRescueData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRescue, setEditingRescue] = useState(null);
  const [newRescue, setNewRescue] = useState({
    rid: "",
    location: "",
    disaster_id: "",
    leader_id: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/rescue_team");
      const data = await response.json();
      setRescueData(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteRescue = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/rescue_team/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete rescue team");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting rescue team:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/rescue_team/${editingRescue.rid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingRescue),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update rescue team");
      }
      fetchData();
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating rescue team:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/rescue_team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRescue),
      });

      if (!response.ok) {
        throw new Error("Failed to add rescue team");
      }

      console.log("Rescue team added successfully");
      setNewRescue({
        rid: "",
        location: "",
        disaster_id: "",
        leader_id: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error adding rescue team:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="text-5xl font-bold flex justify-center m-4">
        RESCUE TEAMS DATABASE
      </h1>
      <p>Total Rescue Teams: {totalItems}</p>
      <button onClick={() => setShowAddForm(true)}>Add New Rescue Team</button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Disaster ID</th>
              <th>Leader ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rescueData.map((rescue) => (
              <tr key={rescue.rid}>
                <td>{rescue.rid}</td>
                <td>{rescue.location}</td>
                <td>{rescue.disaster_id}</td>
                <td>{rescue.leader_id}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteRescue(rescue.rid)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setShowEditForm(true);
                      setEditingRescue(rescue);
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
          <h3>Edit Rescue Team</h3>
          <input
            type="text"
            value={editingRescue.location}
            onChange={(e) =>
              setEditingRescue({ ...editingRescue, location: e.target.value })
            }
          />
          <input
            type="text"
            value={editingRescue.disaster_id}
            onChange={(e) =>
              setEditingRescue({
                ...editingRescue,
                disaster_id: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editingRescue.leader_id}
            onChange={(e) =>
              setEditingRescue({ ...editingRescue, leader_id: e.target.value })
            }
          />
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Rescue Team</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <input
              type="text"
              placeholder="ID"
              value={newRescue.rid}
              onChange={(e) =>
                setNewRescue((prev) => ({
                  ...prev,
                  rid: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={newRescue.location}
              onChange={(e) =>
                setNewRescue((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Disaster ID"
              value={newRescue.disaster_id}
              onChange={(e) =>
                setNewRescue((prev) => ({
                  ...prev,
                  disaster_id: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Leader ID"
              value={newRescue.leader_id}
              onChange={(e) =>
                setNewRescue((prev) => ({
                  ...prev,
                  leader_id: e.target.value,
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

export default AdminRescue;
