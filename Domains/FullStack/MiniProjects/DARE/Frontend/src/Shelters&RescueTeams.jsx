import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function SheltersandRescueTeams() {
  const [shelterData, setShelterData] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [rescueData, setRescueData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    fetchData();
    fetchRescueData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/shelter");
      const data = await response.json();
      setShelterData(data);
      setTotalItems(data.length);
    } catch (error) {
      console.error("Error fetching shelter data:", error);
    }
  };

  const fetchRescueData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/rescue_team");
      const data = await response.json();
      setRescueData(data);
      setTotalItem(data.length);
    } catch (error) {
      console.error("Error fetching rescue team data:", error);
    }
  };

  const handleLocationChange = (e) => {
    setCurrentLocation(e.target.value);
  };

  const filteredShelterData = shelterData.filter((shelter) =>
    shelter.location.toLowerCase().includes(currentLocation.toLowerCase())
  );

  const filteredRescueData = rescueData.filter((rescue) =>
    rescue.location.toLowerCase().includes(currentLocation.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center mb-8">
        <label className="form-control w-full max-w-xs">
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
        </label>
      </section>
      <h2 className="mb-5 text-4xl text-violet-800 font-semibold text-center">
        Shelters Near You
      </h2>
      <div className="overflow-x-auto ">
        <table className="table">
          <thead className="p-5 text-2xl text-blue-800 bg-blue-50">
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>AID</th>
            </tr>
          </thead>
          <tbody className="p-4 text-lg">
            {filteredShelterData.map((shelter) => (
              <tr key={shelter.sid}>
                <td>{shelter.sid}</td>
                <td>{shelter.location}</td>
                <td>{shelter.capacity}</td>
                <td>{shelter.aid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divider divider-neutral p-0 m-0"></div>
      <h2 className="mb-5 text-4xl font-semibold text-center pt-5 text-violet-800 ">
        Rescue Teams
      </h2>
      <div className="overflow-x-auto mb-8">
        <table className="table">
          <thead className="p-5 text-2xl text-blue-800 bg-blue-50">
            <tr>
              <th>ID</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody className="p-4 text-lg">
            {filteredRescueData.map((rescue) => (
              <tr key={rescue.rid}>
                <td>{rescue.rid}</td>
                <td>{rescue.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default SheltersandRescueTeams;
