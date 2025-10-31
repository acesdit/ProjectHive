import React, { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

function AdminSafety() {
  const [safetyInstructions, setSafetyInstructions] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [newInstruction, setNewInstruction] = useState({
    did: "",
    safety_instructions: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

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

  const deleteInstruction = async (did) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/safety_instructions/${did}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete instruction");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting instruction:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/safety_instructions/${editingInstruction.did}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingInstruction),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update instruction");
      }
      fetchData();
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating instruction:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/safety_instructions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newInstruction),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add instruction");
      }

      console.log("Instruction added successfully");
      setNewInstruction({ did: "", safety_instructions: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding instruction:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="text-5xl font-bold flex justify-center m-4">
        SAFETY INSTRUCTIONS DATABASE
      </h1>
      <p>Total Instructions: {totalItems}</p>
      <button onClick={() => setShowAddForm(true)}>Add New Instruction</button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Safety Instructions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safetyInstructions.map((instruction) => (
              <tr key={instruction.did}>
                <td>{instruction.did}</td>
                <td>{instruction.safety_instructions}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteInstruction(instruction.did)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setShowEditForm(true);
                      setEditingInstruction(instruction);
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
          <h3>Edit Instruction</h3>
          <input
            type="text"
            value={editingInstruction.safety_instructions}
            onChange={(e) =>
              setEditingInstruction({
                ...editingInstruction,
                safety_instructions: e.target.value,
              })
            }
          />
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}
      {showAddForm && (
        <div className="add-form">
          <h3>Add New Instruction</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <input
              type="number"
              placeholder="ID"
              value={newInstruction.did}
              onChange={(e) =>
                setNewInstruction((prev) => ({
                  ...prev,
                  did: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="New Instruction"
              value={newInstruction.safety_instructions}
              onChange={(e) =>
                setNewInstruction((prev) => ({
                  ...prev,
                  safety_instructions: e.target.value,
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

export default AdminSafety;
