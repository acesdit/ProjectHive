   app.post("/login", async (req, res) => {
     const { email, password } = req.body;
     // ... (existing code to authenticate user)

     // If the user is authenticated, insert a new record into the login table
     if (isAuthenticated) {
       try {
         const [result] = await connection.execute(
           "INSERT INTO login (email, password) VALUES (?, ?)",
           [email, hashedPassword]
         );
         // ... (existing code to handle successful login)
       } catch (error) {
         console.error("Error inserting login record:", error);
         res.status(500).json({ message: "Internal Server Error" });
       }
     }
     // ... (existing code to handle failed login)
   });