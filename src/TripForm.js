import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TripForm = () => {
  const [formData, setFormData] = useState({
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    departureTime: "",
    destinationAirport: "",
    interests: [],
    mustVisit: "",
    pace: "",
    budget: "",
    transport: "",
  });

  const [itinerary, setItinerary] = useState(""); // To store the generated itinerary
  const [loading, setLoading] = useState(false); // Loading state for feedback

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://mysterious-brushlands-03919-edd2212860ad.herokuapp.com/generate-itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const result = await response.json();
      setItinerary(result.itinerary || "No itinerary generated.");
    } catch (error) {
      console.error("Error:", error);
      setItinerary("An error occurred while generating the itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/aa.png')", // Replace with the actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        color: "#000", // Ensure form text is readable
      }}
    >
      <div className="container mt-4">
        <h2>Extreme Day Trip Planner</h2>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Generating..." : "Generate Itinerary"}
          </button>
          <a
            href="https://www.buymeacoffee.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-warning btn-lg"
            style={{ fontWeight: "bold" }}
          >
            ☕ Donate Now
          </a>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">Arrival Date</label>
            <input
              type="date"
              className="form-control"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Arrival Time</label>
            <input
              type="time"
              className="form-control"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Departure Date</label>
            <input
              type="date"
              className="form-control"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Departure Time</label>
            <input
              type="time"
              className="form-control"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Destination Airport</label>
            <input
              type="text"
              className="form-control"
              name="destinationAirport"
              value={formData.destinationAirport}
              onChange={handleChange}
              placeholder="E.g., LHR (London Heathrow)"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Top Interests</label>
            <select
              multiple
              className="form-select"
              name="interests"
              value={formData.interests}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interests: [...e.target.selectedOptions].map((o) => o.value),
                })
              }
              required
            >
              <option value="sightseeing">Sightseeing</option>
              <option value="food">Food</option>
              <option value="cultural">Cultural Experiences</option>
              <option value="adventure">Adventure</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Additional Information</label>
            <input
              type="text"
              className="form-control"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="E.g. I would like to do some shopping for my sister's birthday in the afternoon"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Pace Preference</label>
            <select
              className="form-select"
              name="pace"
              value={formData.pace}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="relaxed">Relaxed</option>
              <option value="fast">Fast-Paced</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Budget Range for the Day (£)</label>
            <input
              type="number"
              className="form-control"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="E.g., 100"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Transport Preference</label>
            <select
              className="form-select"
              name="transport"
              value={formData.transport}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="walking">Walking</option>
              <option value="public">Public Transport</option>
              <option value="private">Taxis/Private Transfers</option>
            </select>
          </div>
        </form>

        {itinerary && (
          <div className="mt-4">
            <a
              href="https://www.buymeacoffee.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning btn-lg mb-4 d-block text-center"
              style={{ fontWeight: "bold" }}
            >
              ☕ Donate Now
            </a>
            <h4>Generated Itinerary</h4>
            <pre>{itinerary}</pre>
            <div className="mt-4 text-center">
              <a
                href="https://www.buymeacoffee.com/radiantrahul"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-warning btn-lg"
                style={{ fontWeight: "bold" }}
              >
                ☕ Donate Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripForm;
