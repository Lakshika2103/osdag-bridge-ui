import React, { useState } from "react";
import "./App.css";

function App() {
  const [tab, setTab] = useState("basic");
  const [structure, setStructure] = useState("Highway");
  const [city, setCity] = useState("Chennai");

  const [span, setSpan] = useState("");
  const [width, setWidth] = useState("");
  const [skew, setSkew] = useState("");
  const [footpath, setFootpath] = useState("None");

  const [girder, setGirder] = useState("E250");
  const [bracing, setBracing] = useState("E250");
  const [deck, setDeck] = useState("M25");

  const [showPopup, setShowPopup] = useState(false);
  const [spacing, setSpacing] = useState("");
  const [girders, setGirders] = useState("");
  const [overhang, setOverhang] = useState("");

  const locationData = {
    Chennai: { wind: 50, temp: 35, zone: 3 },
    Mumbai: { wind: 44, temp: 32, zone: 3 },
    Delhi: { wind: 47, temp: 40, zone: 4 },
    Bangalore: { wind: 39, temp: 30, zone: 2 },
    Kolkata: { wind: 50, temp: 36, zone: 3 }
  };

  const overallWidth = width ? Number(width) + 5 : 0;

  return (
    <div className="main">

      {/* LEFT PANEL */}
      <div className="left">
        <h2>Group Design</h2>

        {/* TABS */}
        <div className="tabs">
          <button type="button" onClick={() => setTab("basic")}>
            Basic Inputs
          </button>

          <button type="button" onClick={() => setTab("additional")}>
            Additional Inputs
          </button>
        </div>

        {/* BASIC INPUTS */}
        {tab === "basic" && (
          <div>

            {/* Type */}
            <h3>Type of Structure</h3>
            <select value={structure} onChange={(e) => setStructure(e.target.value)}>
              <option>Highway</option>
              <option>Other</option>
            </select>

            {structure === "Other" && (
              <p style={{ color: "red" }}>
                ❌ Other structures not included
              </p>
            )}

            {/* Location */}
            <h3>Project Location</h3>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={structure === "Other"}
            >
              <option>Chennai</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Kolkata</option>
            </select>

            <div style={{ color: "green" }}>
              <p>Wind: {locationData[city].wind}</p>
              <p>Temp: {locationData[city].temp}</p>
              <p>Zone: {locationData[city].zone}</p>
            </div>

            {/* Geometry */}
            <h3>Geometric Details</h3>

            <input
              type="number"
              placeholder="Span (m)"
              value={span}
              onChange={(e) => setSpan(e.target.value)}
              disabled={structure === "Other"}
            />
            {span && (span < 20 || span > 45) && (
              <p style={{ color: "red" }}>❌ Invalid Span</p>
            )}

            <input
              type="number"
              placeholder="Carriageway Width (m)"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              disabled={structure === "Other"}
            />
            {width && (width < 4.25 || width > 24) && (
              <p style={{ color: "red" }}>❌ Invalid Width</p>
            )}

            <select
              value={footpath}
              onChange={(e) => setFootpath(e.target.value)}
              disabled={structure === "Other"}
            >
              <option>None</option>
              <option>Single-sided</option>
              <option>Both</option>
            </select>

            <input
              type="number"
              placeholder="Skew Angle (°)"
              value={skew}
              onChange={(e) => setSkew(e.target.value)}
              disabled={structure === "Other"}
            />
            {skew && (skew < -15 || skew > 15) && (
              <p style={{ color: "orange" }}>
                ⚠️ IRC requires detailed analysis
              </p>
            )}

            {/* BUTTON */}
            <button type="button" onClick={() => setShowPopup(true)}>
              Modify Additional Geometry
            </button>

            {/* MATERIAL */}
            <h3>Material Inputs</h3>

            <select value={girder} onChange={(e) => setGirder(e.target.value)}>
              <option>E250</option>
              <option>E350</option>
              <option>E450</option>
            </select>

            <select value={bracing} onChange={(e) => setBracing(e.target.value)}>
              <option>E250</option>
              <option>E350</option>
            </select>

            <select value={deck} onChange={(e) => setDeck(e.target.value)}>
              <option>M25</option>
              <option>M30</option>
              <option>M35</option>
            </select>

          </div>
        )}

        {/* ADDITIONAL TAB */}
        {tab === "additional" && (
          <div>
            <h3>Additional Inputs</h3>
            <p>This section is intentionally left empty.</p>
          </div>
        )}

      </div>

      {/* RIGHT PANEL */}
      <div className="right">
       <img
        src="https://wallpaperaccess.com/full/112098.jpg"
        alt="Bridge"
        style={{ width: "100%" }}
/>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup">
          <div className="popup-box">
            <h3>Modify Geometry</h3>

            <input
              placeholder="Girder Spacing"
              value={spacing}
              onChange={(e) => setSpacing(e.target.value)}
            />

            <input
              placeholder="No of Girders"
              value={girders}
              onChange={(e) => setGirders(e.target.value)}
            />

            <input
              placeholder="Deck Overhang"
              value={overhang}
              onChange={(e) => setOverhang(e.target.value)}
            />

            {spacing && Number(spacing) > overallWidth && (
              <p style={{ color: "red" }}>❌ Invalid spacing</p>
            )}

            <button type="button" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;