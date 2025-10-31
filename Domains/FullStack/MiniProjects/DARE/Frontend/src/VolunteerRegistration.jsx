import React, { useState } from "react";

function VolunteerRegistrationForm() {
  const [showForm, setShowForm] = useState(false);

  const handleRegisterClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <h1 >Register as Volunteer</h1>
      <button onClick={handleRegisterClick}>Register</button>
      {showForm && (
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="contact">Contact:</label>
          <input type="tel" id="contact" name="contact" required />

          <label htmlFor="expertise">Expertise:</label>
          <input type="text" id="expertise" name="expertise" required />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required />

          <label htmlFor="currentStatus">Current Status:</label>
          <select id="currentStatus" name="currentStatus" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default VolunteerRegistrationForm;
