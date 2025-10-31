import React, { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";

function AdminFunds() {
  const [fundsData, setFundsData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFund, setEditingFund] = useState(null);
  const [newFund, setNewFund] = useState({
    fa_id: "",
    A_ID: "",
    amount: "",
    S_ID: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/funds_allocated");
      const data = await response.json();
      setFundsData(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteFund = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/funds_allocated/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete fund");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting fund:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/funds_allocated/${editingFund.fa_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingFund),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update fund");
      }
      fetchData();
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating fund:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/funds_allocated",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFund),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add fund");
      }

      console.log("Fund added successfully");
      setNewFund({
        fa_id: "",
        A_ID: "",
        amount: "",
        S_ID: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error adding fund:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="text-5xl font-bold flex justify-center m-4">
        FUNDS ALLOCATED DATABASE
      </h1>
      <p>Total Funds: {totalItems}</p>
      <button onClick={() => setShowAddForm(true)}>Add New Fund</button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>A_ID</th>
              <th>Amount</th>
              <th>S_ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fundsData.map((fund) => (
              <tr key={fund.fa_id}>
                <td>{fund.fa_id}</td>
                <td>{fund.A_ID}</td>
                <td>{fund.amount}</td>
                <td>{fund.S_ID}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteFund(fund.fa_id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setShowEditForm(true);
                      setEditingFund(fund);
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
          <h3>Edit Fund</h3>
          <input
            type="text"
            value={editingFund.fa_id}
            onChange={(e) =>
              setEditingFund({ ...editingFund, fa_id: e.target.value })
            }
          />
          <input
            type="text"
            value={editingFund.A_ID}
            onChange={(e) =>
              setEditingFund({ ...editingFund, A_ID: e.target.value })
            }
          />
          <input
            type="text"
            value={editingFund.amount}
            onChange={(e) =>
              setEditingFund({ ...editingFund, amount: e.target.value })
            }
          />
          <input
            type="text"
            value={editingFund.S_ID}
            onChange={(e) =>
              setEditingFund({ ...editingFund, S_ID: e.target.value })
            }
          />
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="add-form">
          <h3>Add New Fund</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <input
              type="text"
              placeholder="fa_id"
              value={newFund.fa_id}
              onChange={(e) =>
                setNewFund((prev) => ({
                  ...prev,
                  fa_id: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="A_ID"
              value={newFund.A_ID}
              onChange={(e) =>
                setNewFund((prev) => ({
                  ...prev,
                  A_ID: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Amount"
              value={newFund.amount}
              onChange={(e) =>
                setNewFund((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="S_ID"
              value={newFund.S_ID}
              onChange={(e) =>
                setNewFund((prev) => ({
                  ...prev,
                  S_ID: e.target.value,
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

export default AdminFunds;
