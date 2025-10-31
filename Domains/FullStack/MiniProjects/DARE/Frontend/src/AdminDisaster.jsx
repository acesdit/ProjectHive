import { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

function AdminDisaster() {
  const [disasterData, setDisasterData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    d_id: "",
    type: "",
    date: "",
    severity: "",
    shel_id2: "",
    re_id: "",
    location: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/admindisaster");
      const data = await response.json();
      setDisasterData(data);
      setTotalItems(data.length); // Update the totalItems state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const deleteItem = async (d_id) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/admindisaster/${d_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      // Optionally, you can refresh the data after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/admindisaster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      // Assuming success if the response status is 201
      console.log("Item added successfully");
      // Clear the newItem state after successful addition
      setNewItem({
        d_id: "",
        type: "",
        date: "",
        severity: "",
        shel_id2: "",
        re_id: "",
        location: "",
      });
      // Refresh the data after adding
      fetchData();
      // Hide the add form after successful addition
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8081/api/admindisaster/${editingItem.d_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingItem),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      // Optionally, refresh the data after updating
      fetchData();
      // Hide the edit form after successful update
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="text-5xl font-bold flex justify-center m-4">
        DISASTER TRACK DATABASE
      </h1>
      <p>Total Items: {totalItems}</p> {/* Display the total number of items */}
      <button onClick={() => setShowAddForm(true)}>Add New Item</button>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Severity</th>
              <th>Shelter ID</th>
              <th>Rescue Team ID</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {disasterData.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>{item.severity}</td>
                <td>{item.shel_id}</td>
                <td>{item.re_id}</td>
                <td>{item.location}</td>
                <td>
                  <button className="btn" onClick={() => deleteItem(item.d_id)}>
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setShowEditForm(true);
                      setEditingItem(item);
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
          <p>ID: {editingItem?.d_id}</p>
          <form onSubmit={handleUpdate}>
            {/* Form fields for each property of the item */}
            <input
              type="text"
              value={editingItem?.d_id}
              onChange={(e) =>
                setEditingItem({ ...editingItem, d_id: e.target.value })
              }
            />
            <input
              type="text"
              value={editingItem?.type}
              onChange={(e) =>
                setEditingItem({ ...editingItem, type: e.target.value })
              }
            />
            <input
              type="text"
              value={editingItem?.date}
              onChange={(e) =>
                setEditingItem({ ...editingItem, date: e.target.value })
              }
            />
            <input
              type="text"
              value={editingItem?.severity}
              onChange={(e) =>
                setEditingItem({ ...editingItem, severity: e.target.value })
              }
            />
            <input
              type="text"
              value={editingItem?.shel_ID2}
              onChange={(e) =>
                setEditingItem({ ...editingItem, Shel_ID2: e.target.value })
              }
            />
            <input
              type="text"
              value={editingItem?.re_id}
              onChange={(e) =>
                setEditingItem({ ...editingItem, Re_ID: e.target.value })
              }
            />
            <input
              type="text"
              value={editingItem?.location}
              onChange={(e) =>
                setEditingItem({ ...editingItem, location: e.target.value })
              }
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
      {showAddForm && (
        <div className="add-form">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission behavior
              handleAdd(newItem); // Call handleAdd function with newItem object
            }}
          >
            <input
              type="number"
              placeholder="Disaster ID"
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, d_id: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Type"
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, type: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Date"
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, date: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Severity"
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, severity: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Shelter ID"
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, shel_id2: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Rescue Team ID"
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, re_id: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Location"
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, location: e.target.value }))
              }
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
      <AdminFooter />
    </>
  );
}

export default AdminDisaster;
