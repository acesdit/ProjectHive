import React, { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

function AdminAid() {
  const [assetsData, setAssetsData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [newAsset, setNewAsset] = useState({
    aid: "",
    a_type: "",
    a_quantity: "",
    a_status: "",
    S_ID1: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/aid_supplies");
      const data = await response.json();
      setAssetsData(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/aid_supplies/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete asset");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/aid_supplies/${editingAsset.aid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingAsset),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update asset");
      }
      fetchData();
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/aid_supplies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsset),
      });

      if (!response.ok) {
        throw new Error("Failed to add asset");
      }

      console.log("Asset added successfully");
      setNewAsset({
        aid: "",
        a_type: "",
        a_quantity: "",
        a_status: "",
        S_ID1: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="text-5xl font-bold flex justify-center m-4">
        ASSETS DATABASE
      </h1>
      <p>Total Assets: {totalItems}</p>
      <button onClick={() => setShowAddForm(true)}>Add New Asset</button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>S_ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetsData.map((asset) => (
              <tr key={asset.aid}>
                <td>{asset.aid}</td>
                <td>{asset.a_type}</td>
                <td>{asset.a_quantity}</td>
                <td>{asset.a_status}</td>
                <td>{asset.S_ID1}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteAsset(asset.aid)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setShowEditForm(true);
                      setEditingAsset(asset);
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
          <h3>Edit Asset</h3>
          <input
            type="text"
            value={editingAsset.a_type}
            onChange={(e) =>
              setEditingAsset({ ...editingAsset, a_type: e.target.value })
            }
          />
          <input
            type="text"
            value={editingAsset.a_quantity}
            onChange={(e) =>
              setEditingAsset({ ...editingAsset, a_quantity: e.target.value })
            }
          />
          <input
            type="text"
            value={editingAsset.a_status}
            onChange={(e) =>
              setEditingAsset({ ...editingAsset, a_status: e.target.value })
            }
          />
          <input
            type="text"
            value={editingAsset.S_ID1}
            onChange={(e) =>
              setEditingAsset({ ...editingAsset, S_ID1: e.target.value })
            }
          />
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Asset</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <input
              type="text"
              placeholder="ID"
              value={newAsset.aid}
              onChange={(e) =>
                setNewAsset((prev) => ({
                  ...prev,
                  aid: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Type"
              value={newAsset.a_type}
              onChange={(e) =>
                setNewAsset((prev) => ({
                  ...prev,
                  a_type: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Quantity"
              value={newAsset.a_quantity}
              onChange={(e) =>
                setNewAsset((prev) => ({
                  ...prev,
                  a_quantity: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Status"
              value={newAsset.a_status}
              onChange={(e) =>
                setNewAsset((prev) => ({
                  ...prev,
                  a_status: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="S_ID"
              value={newAsset.S_ID1}
              onChange={(e) =>
                setNewAsset((prev) => ({
                  ...prev,
                  S_ID1: e.target.value,
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

export default AdminAid;
