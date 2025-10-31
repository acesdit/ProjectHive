const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to match your frontend's URL
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());

let connection;
// Database connection setup
async function connectToDatabase() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}
app.get("/api/login", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT name FROM login");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/admindisaster", async (req, res) => {
  try {
    const [rows] = await connection.execute(
      "SELECT d_id, type, date, severity, shel_id2, re_id, location FROM disaster_track"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching disaster track data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.delete("/api/admindisaster/:d_id", async (req, res) => {
  try {
    const d_id = req.params.d_id;
    const [rows] = await connection.execute(
      "DELETE FROM disaster_track WHERE d_id = ?",
      [d_id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error deleting disaster track data:", error);
    // Log the error stack trace for more details
    console.error(error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
async function updateDisasterItemInDatabase(id, updatedItem) {
  try {
    // Assuming you have a connection object `connection`
    await connection.query(
      "UPDATE disaster_track SET type = ?, date = ?, severity = ?, shel_id2 = ?, re_id = ?, location = ? WHERE d_id = ?",
      [
        updatedItem.type,
        updatedItem.date,
        updatedItem.severity,
        updatedItem.shel_id2,
        updatedItem.re_id,
        updatedItem.location,
        id,
      ]
    );
    return { success: true };
  } catch (error) {
    console.error("Database update error:", error);
    return { success: false };
  }
}

app.put("/api/admindisaster/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  const updatedItem = req.body; // Extract the updated item data from the request body

  try {
    const result = await updateDisasterItemInDatabase(id, updatedItem);
    if (result.success) {
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      res.status(500).json({ message: "Failed to update item" });
    }
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.post("/api/admindisaster", async (req, res) => {
  // Basic input validation
  if (
    !req.body.d_id ||
    !req.body.type ||
    !req.body.date ||
    !req.body.shel_id2 || // Adjusted field name
    !req.body.re_id || // Adjusted field name
    !req.body.location
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newItem = {
    d_id: req.body.d_id,
    type: req.body.type,
    date: req.body.date,
    severity: req.body.severity, // Set to null if missing
    shel_id2: req.body.shel_id2, // Adjusted field name
    re_id: req.body.re_id, // Adjusted field name
    location: req.body.location,
  };

  try {
    const [result] = await connection.execute(
      "INSERT INTO disaster_track (d_id, type, date, severity, Shel_ID2, Re_ID, location) VALUES (?,?,?,?,?,?,?)",
      [
        newItem.d_id,
        newItem.type,
        newItem.date,
        newItem.severity,
        newItem.shel_id2, // Adjusted field name
        newItem.re_id, // Adjusted field name
        newItem.location,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Item added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add item" });
    }
  } catch (error) {
    console.error("Error adding item:", error);
    // Enhanced error handling
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Item already exists" });
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      return res.status(500).json({ message: "Database access denied" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.get("/api/safety_instructions", async (req, res) => {
  try {
    const [rows] = await connection.execute(
      "SELECT did, safety_instructions FROM safety_instructions"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching safety instructions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/safety_instructions/:did", async (req, res) => {
  try {
    const did = req.params.did;
    const [rows] = await connection.execute(
      "DELETE FROM safety_instructions WHERE did = ?",
      [did]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error deleting safety instruction:", error);
    console.error(error.stack); // Log the error stack trace for more details
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function updateSafetyInstructionInDatabase(id, updatedInstruction) {
  try {
    // Assuming you have a connection object `connection`
    await connection.query(
      "UPDATE safety_instructions SET safety_instructions = ? WHERE did = ?",
      [updatedInstruction, id]
    );
    return { success: true };
  } catch (error) {
    console.error("Database update error:", error);
    return { success: false };
  }
}

app.put("/api/safety_instructions/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  const updatedInstruction = req.body; // Extract the updated instruction from the request body

  try {
    const result = await updateSafetyInstructionInDatabase(
      id,
      updatedInstruction
    );
    if (result.success) {
      res.status(200).json({ message: "Instruction updated successfully" });
    } else {
      res.status(500).json({ message: "Failed to update instruction" });
    }
  } catch (error) {
    console.error("Error updating instruction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.post("/api/emergency_help_request_victim_records", async (req, res) => {
  // Basic input validation
  if (
    // !req.body.E_ID ||
    !req.body.Name ||
    !req.body.Contact ||
    !req.body.disaster_type ||
    !req.body.current_location ||
    req.body.isCurrentVictim === undefined
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newRecord = {
    E_ID: req.body.E_ID || null,
    Name: req.body.Name,
    Contact: req.body.Contact,
    disaster_type: req.body.disaster_type,
    current_location: req.body.current_location,
    isCurrentVictim: req.body.isCurrentVictim === "1" ? true : false, // Parse as boolean
  };

  try {
    const [result] = await connection.execute(
      "INSERT INTO emergency_help_request_victim_records (E_ID,Name, Contact, disaster_type, current_location, isCurrentVictim) VALUES (?,?, ?, ?, ?, ?)",
      [
        newRecord.E_ID,
        newRecord.Name,
        newRecord.Contact,
        newRecord.disaster_type,
        newRecord.current_location,
        newRecord.isCurrentVictim,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({
        message: "Emergency help request victim record added successfully",
      });
    } else {
      res.status(500).json({
        message: "Failed to add emergency help request victim record",
      });
    }
  } catch (error) {
    console.error("Error adding emergency help request victim record:", error);
    // Enhanced error handling
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Emergency help request victim record already exists",
      });
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      return res.status(500).json({ message: "Database access denied" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});
// app.post("/api/emergency_help_request_victim_records", async (req, res) => {
//   // Basic input validation
//   if (
//     !req.body.Name ||
//     !req.body.Contact ||
//     !req.body.disaster_type ||
//     !req.body.current_location ||
//     req.body.isCurrentVictim === undefined
//   ) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   const newRecord = {
//     Name: req.body.Name,
//     Contact: req.body.Contact,
//     disaster_type: req.body.disaster_type,
//     current_location: req.body.current_location,
//     isCurrentVictim: req.body.isCurrentVictim === "1" ? true : false, // Parse as boolean
//   };

//   try {
//     const [result] = await connection.execute(
//       "INSERT INTO emergency_help_request_victim_records (Name, Contact, disaster_type, current_location, isCurrentVictim) VALUES (?, ?, ?, ?, ?)",
//       [
//         newRecord.Name,
//         newRecord.Contact,
//         newRecord.disaster_type,
//         newRecord.current_location,
//         newRecord.isCurrentVictim,
//       ]
//     );

//     if (result.affectedRows > 0) {
//       res.status(201).json({
//         message: "Emergency help request victim record added successfully",
//       });
//     } else {
//       res.status(500).json({
//         message: "Failed to add emergency help request victim record",
//       });
//     }
//   } catch (error) {
//     console.error("Error adding emergency help request victim record:", error);
//     // Enhanced error handling
//     if (error.code === "ER_DUP_ENTRY") {
//       return res.status(409).json({
//         message: "Emergency help request victim record already exists",
//       });
//     } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
//       return res.status(500).json({ message: "Database access denied" });
//     } else {
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// });

// GET /api/emergency_help_request_victim_records
app.get("/api/emergency_help_request_victim_records", async (req, res) => {
  try {
    const [records] = await connection.execute(
      "SELECT * FROM emergency_help_request_victim_records"
    );
    res.json(records);
  } catch (error) {
    console.error(
      "Error fetching emergency help request victim records:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /api/emergency_help_request_victim_records/:id
app.put("/api/emergency_help_request_victim_records/:id", async (req, res) => {
  const id = req.params.id;
  const updatedRecord = req.body;

  try {
    const [result] = await connection.execute(
      "UPDATE emergency_help_request_victim_records SET Name = ?, Contact = ?, disaster_type = ?, current_location = ?, isCurrentVictim = ? WHERE E_ID = ?",
      [
        updatedRecord.Name,
        updatedRecord.Contact,
        updatedRecord.disaster_type,
        updatedRecord.current_location,
        updatedRecord.isCurrentVictim,
        id,
      ]
    );

    if (result.affectedRows > 0) {
      res.json({
        message: "Emergency help request victim record updated successfully",
      });
    } else {
      res
        .status(404)
        .json({ message: "Emergency help request victim record not found" });
    }
  } catch (error) {
    console.error(
      "Error updating emergency help request victim record:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE /api/emergency_help_request_victim_records/:id
app.delete(
  "/api/emergency_help_request_victim_records/:id",
  async (req, res) => {
    const id = req.params.id;

    try {
      const [result] = await connection.execute(
        "DELETE FROM emergency_help_request_victim_records WHERE E_ID = ?",
        [id]
      );

      if (result.affectedRows > 0) {
        res.json({
          message: "Emergency help request victim record deleted successfully",
        });
      } else {
        res
          .status(404)
          .json({ message: "Emergency help request victim record not found" });
      }
    } catch (error) {
      console.error(
        "Error deleting emergency help request victim record:",
        error
      );
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
app.post("/api/funds_allocated", async (req, res) => {
  // Basic input validation
  if (!req.body.fa_id || !req.body.A_ID || !req.body.amount || !req.body.S_ID) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newFund = {
    fa_id: req.body.fa_id, // Include fa_id
    A_ID: req.body.A_ID,
    amount: req.body.amount,
    S_ID: req.body.S_ID,
  };

  try {
    const [result] = await connection.execute(
      "INSERT INTO funds_allocated (fa_id, A_ID, amount, S_ID) VALUES (?, ?, ?, ?)", // Include fa_id in the query
      [newFund.fa_id, newFund.A_ID, newFund.amount, newFund.S_ID]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Fund record added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add fund record" });
    }
  } catch (error) {
    console.error("Error adding fund record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.delete("/api/funds_allocated/:fa_id", async (req, res) => {
  const fa_id = req.params.fa_id;

  try {
    const [result] = await connection.execute(
      "DELETE FROM funds_allocated WHERE fa_id = ?",
      [fa_id]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Fund record deleted successfully" });
    } else {
      res.status(404).json({ message: "Fund record not found" });
    }
  } catch (error) {
    console.error("Error deleting fund record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.put("/api/funds_allocated/:fa_id", async (req, res) => {
  const fa_id = req.params.fa_id;
  const updatedFund = req.body;

  try {
    const [result] = await connection.execute(
      "UPDATE funds_allocated SET A_ID = ?, amount = ?, S_ID = ? WHERE fa_id = ?",
      [updatedFund.A_ID, updatedFund.amount, updatedFund.S_ID, fa_id]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Fund record updated successfully" });
    } else {
      res.status(404).json({ message: "Fund record not found" });
    }
  } catch (error) {
    console.error("Error updating fund record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/api/funds_allocated", async (req, res) => {
  try {
    const [records] = await connection.execute("SELECT * FROM funds_allocated");
    res.json(records);
  } catch (error) {
    console.error("Error fetching fund records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/aid_supplies", async (req, res) => {
  // Basic input validation
  if (
    !req.body.aid ||
    !req.body.a_type ||
    !req.body.a_quantity ||
    !req.body.a_status ||
    !req.body.S_ID1
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newAid = {
    aid: req.body.aid,
    a_type: req.body.a_type,
    a_quantity: req.body.a_quantity,
    a_status: req.body.a_status,
    S_ID1: req.body.S_ID1,
  };

  try {
    const [result] = await connection.execute(
      "INSERT INTO aid_supplies (aid, a_type, a_quantity, a_status, S_ID1) VALUES (?, ?, ?, ?, ?)",
      [
        newAid.aid,
        newAid.a_type,
        newAid.a_quantity,
        newAid.a_status,
        newAid.S_ID1,
      ]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Aid record added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add aid record" });
    }
  } catch (error) {
    console.error("Error adding aid record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/aid_supplies/:aid", async (req, res) => {
  const aid = req.params.aid;

  try {
    const [result] = await connection.execute(
      "DELETE FROM aid_supplies WHERE aid = ?",
      [aid]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Aid record deleted successfully" });
    } else {
      res.status(404).json({ message: "Aid record not found" });
    }
  } catch (error) {
    console.error("Error deleting aid record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/aid_supplies/:aid", async (req, res) => {
  const aid = req.params.aid;
  const updatedAid = req.body;

  try {
    const [result] = await connection.execute(
      "UPDATE aid_supplies SET a_type = ?, a_quantity = ?, a_status = ?, S_ID1 = ? WHERE aid = ?",
      [
        updatedAid.a_type,
        updatedAid.a_quantity,
        updatedAid.a_status,
        updatedAid.S_ID1,
        aid,
      ]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Aid record updated successfully" });
    } else {
      res.status(404).json({ message: "Aid record not found" });
    }
  } catch (error) {
    console.error("Error updating aid record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/aid_supplies", async (req, res) => {
  try {
    const [records] = await connection.execute("SELECT * FROM aid_supplies");
    res.json(records);
  } catch (error) {
    console.error("Error fetching aid records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/rescue_team", async (req, res) => {
  // Basic input validation
  if (!req.body.location || !req.body.disaster_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newTeam = {
    location: req.body.location,
    disaster_id: req.body.disaster_id,
    leader_id: req.body.leader_id || null, // Assuming leader_id can be nullable
  };

  try {
    const [result] = await connection.execute(
      "INSERT INTO rescue_team (location, disaster_id, leader_id) VALUES (?, ?, ?)",
      [newTeam.location, newTeam.disaster_id, newTeam.leader_id]
    );

    if (result.affectedRows > 0) {
      res
        .status(201)
        .json({ message: "Rescue team record added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add rescue team record" });
    }
  } catch (error) {
    console.error("Error adding rescue team record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/rescue_team/:rid", async (req, res) => {
  const rid = req.params.rid;

  try {
    const [result] = await connection.execute(
      "DELETE FROM rescue_team WHERE rid = ?",
      [rid]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Rescue team record deleted successfully" });
    } else {
      res.status(404).json({ message: "Rescue team record not found" });
    }
  } catch (error) {
    console.error("Error deleting rescue team record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/rescue_team/:rid", async (req, res) => {
  const rid = req.params.rid;
  const updatedTeam = req.body;

  try {
    const [result] = await connection.execute(
      "UPDATE rescue_team SET location = ?, disaster_id = ?, leader_id = ? WHERE rid = ?",
      [
        updatedTeam.location,
        updatedTeam.disaster_id,
        updatedTeam.leader_id,
        rid,
      ]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Rescue team record updated successfully" });
    } else {
      res.status(404).json({ message: "Rescue team record not found" });
    }
  } catch (error) {
    console.error("Error updating rescue team record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/rescue_team", async (req, res) => {
  try {
    const [records] = await connection.execute("SELECT * FROM rescue_team");
    res.json(records);
  } catch (error) {
    console.error("Error fetching rescue team records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/shelter", async (req, res) => {
  // Basic input validation
  if (!req.body.location || !req.body.capacity || !req.body.aid) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newShelter = {
    location: req.body.location,
    capacity: req.body.capacity,
    aid: req.body.aid,
  };

  try {
    const [result] = await connection.execute(
      "INSERT INTO shelter (location, capacity, aid) VALUES (?, ?, ?)",
      [newShelter.location, newShelter.capacity, newShelter.aid]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Shelter record added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add shelter record" });
    }
  } catch (error) {
    console.error("Error adding shelter record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/shelter/:sid", async (req, res) => {
  const sid = req.params.sid;

  try {
    const [result] = await connection.execute(
      "DELETE FROM shelter WHERE sid = ?",
      [sid]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Shelter record deleted successfully" });
    } else {
      res.status(404).json({ message: "Shelter record not found" });
    }
  } catch (error) {
    console.error("Error deleting shelter record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/shelter/:sid", async (req, res) => {
  const sid = req.params.sid;
  const updatedShelter = req.body;

  try {
    const [result] = await connection.execute(
      "UPDATE shelter SET location = ?, capacity = ?, aid = ? WHERE sid = ?",
      [
        updatedShelter.location,
        updatedShelter.capacity,
        updatedShelter.aid,
        sid,
      ]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Shelter record updated successfully" });
    } else {
      res.status(404).json({ message: "Shelter record not found" });
    }
  } catch (error) {
    console.error("Error updating shelter record:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/shelter", async (req, res) => {
  try {
    const [records] = await connection.execute("SELECT * FROM shelter");
    res.json(records);
  } catch (error) {
    console.error("Error fetching shelter records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function startServer() {
  await connectToDatabase(); // Ensure the database is connected before starting the server

  // Server setup
  const port = process.env.PORT || 8081;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "not_authorized";

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

// Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const [_, fields] = await connection.execute(
      "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.json({ message: "sign up successfully" });
  } catch (error) {
    console.error("Database error:", error);
    // Provide more detailed error messages
    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      res.status(500).json({
        error:
          "Database access denied. Please check your database credentials.",
      });
    } else if (error.code === "ER_NO_SUCH_TABLE") {
      res.status(500).json({
        error: "Database table not found. Please check your database schema.",
      });
    } else if (error.code === "ER_DUP_ENTRY") {
      // Handle duplicate entry error
      res.status(400).json({
        error: "name already exists. Please choose a different name.",
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [rows] = await connection.execute(
//       "SELECT email, password FROM login WHERE email = ?",
//       [email]
//     );
//     const userWithEmail = rows[0];

//     if (!userWithEmail) {
//       return res
//         .status(400)
//         .json({ message: "Email or Password does not match!!" });
//     }

//     // Compare the provided password with the hashed password from the database
//     const isPasswordValid = await bcrypt.compare(
//       password,
//       userWithEmail.password
//     );

//     if (!isPasswordValid) {
//       return res
//         .status(400)
//         .json({ message: "Email or Password does not match!!" });
//     }

//     // If the password is valid, generate a JWT token
//     const jwtToken = jwt.sign(
//       { id: userWithEmail.id, email: userWithEmail.email },
//       JWT_SECRET
//     );
//     // var idlogin = connection.query("SELECT idlogin FROM login WHERE email= ?", [
//     //   userWithEmail.email,
//     // ]);

//     // connection.query("UPDATE login SET count=count+1 WHERE idlogin= '?' ", [
//     //   idlogin,
//     // ]);
//     res.json({ message: "Login successful", token: jwtToken });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await connection.execute(
      "SELECT email, password FROM login WHERE email = ?",
      [email]
    );
    const userWithEmail = rows[0];

    if (!userWithEmail) {
      return res
        .status(400)
        .json({ message: "Email or Password does not match!!" });
    }

    // Compare the provided password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(
      password,
      userWithEmail.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email or Password does not match!!" });
    }

    // If the password is valid, generate a JWT token
    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      JWT_SECRET
    );

    // Increment the login count for the user
    const [idloginResult] = await connection.query(
      "SELECT idlogin FROM login WHERE email = ?",
      [userWithEmail.email]
    );
    const idlogin = idloginResult[0].idlogin;

    await connection.query(
      "UPDATE login SET count = count + 1 WHERE idlogin = ?",
      [idlogin]
    );

    res.json({ message: "Login successful", token: jwtToken });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/login/:idlogin", async (req, res) => {
  const idlogin = req.params.idlogin;
  try {
    const [rows] = await connection.execute(
      "SELECT count FROM login WHERE idlogin = ?",
      [idlogin]
    );
    if (rows.length > 0) {
      res.json({ loginCount: rows[0].count, idlogin: idlogin });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching login count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.get("/api/:id", isAuthenticated, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await connection.execute(
//       "SELECT * FROM feedback WHERE F_House_No = ?",
//       [id]
//     );
//     const complaintDetails = rows[0];
//     if (!complaintDetails) {
//       return res
//         .status(404)
//         .json({ error: "No complaint details found for the given house ID" });
//     }
//     res.json(complaintDetails);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.get("/login/:idlogin", (req, res) => {
//   const idlogin = req.user.idlogin; // Assuming idlogin is stored in the user object after authentication
//   if (idlogin) {
//     res.json({ idlogin });
//   } else {
//     res.status(401).json({ message: "User not authenticated" });
//   }
// });

app.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await connection.execute(
      "SELECT email, password FROM admin WHERE email = ?",
      [email]
    );
    const userWithEmail = rows[0];

    if (!userWithEmail) {
      return res
        .status(400)
        .json({ message: "Email or Password does not match!!" });
    }

    // Compare the provided password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(
      password,
      userWithEmail.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email or Password does not match!!" });
    }

    // If the password is valid, generate a JWT token
    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      JWT_SECRET
    );

    res.json({ message: "Login successful", token: jwtToken });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

startServer();
