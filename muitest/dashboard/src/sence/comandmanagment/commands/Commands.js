import React, { useEffect, useState } from "react";
import "../Comands.modules.css";

export default function Commands({ handleItemClick }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    nubCommand: "",
    date: "",
    client: "",
    totalHt: "",
    name: "",
    city: "",
    articleinfo: [{
      article: "",
      contite: "",
      prix: "",
      total: "",
    },
    {
      article: "",
      contite: "",
      prix: "",
      total: "",
    }
  ]
  }); 
  const [clickedItemId, setClickedItemId] = useState(null); // State variable to hold the ID of the clicked item
  const url = "http://localhost:3001/apiClient";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Debounce the input change event handler
  const handleInputChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // Function to filter the data list
  const filteredData = data.filter((item) => {
    return (
      (!filter.nubCommand || item.nubCommand.includes(filter.nubCommand)) &&
      (!filter.date || item.date.includes(filter.date)) &&
      (!filter.client || item.client.includes(filter.client)) &&
      (!filter.totalHt || item.totalHt === parseInt(filter.totalHt))
    );
  });

  // Function to handle item click and set the clicked item ID
  const handleClick = (id) => {
    setClickedItemId(id);
    handleItemClick(id); // Optional: Call the handleItemClick function with the clicked ID
  };

  return (
    <div>
      <div className="List-command">
        <h1>Liste des Commandes</h1>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>COMMANDE</th>
                <th>DATE</th>
                <th>CLIENT</th>
                <th>TOTAL HT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    value={filter.nubCommand}
                    name="nubCommand"
                    onChange={handleInputChange}
                    className="nim"
                  />
                </td>
                <td>
                  <input
                    value={filter.date}
                    name="date"
                    onChange={handleInputChange}
                    className="nim"
                  />
                </td>
                <td>
                  <input
                    value={filter.client}
                    name="client"
                    onChange={handleInputChange}
                    className="nim"
                  />
                </td>
                <td>
                  <input
                    value={filter.totalHt}
                    name="total"
                    onChange={handleInputChange}
                    className="nim"
                  />
                </td>
              </tr>
              {data.length > 0 ? (
                filteredData.map((e, idx) => (
                  <tr
                    key={idx}
                    onClick={() => handleClick(e._id)} // Call handleClick with the ID of the clicked item
                    className={clickedItemId === e._id ? "trr clicked" : "trr"} // Add a class to highlight the clicked row
                  >
                    <td>{e.nubCommand}</td>
                    <td>{e.date}</td>
                    <td>{e.client}</td>
                    <td>{e.totalHt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
