import React, { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LoopIcon from "@mui/icons-material/Loop";
import "./Client.modules.css";
import "./Client.css";
import CloseIcon from "@mui/icons-material/Close";

export default function Client() {
  const [chonger, setchonger] = useState("");
  const url = "http://localhost:3001/apiAcount/";
  const [id, setid] = useState();
  const [page, setPage] = useState(0); // State to manage current page
  const rowsPerPage = 8; // Number of rows per page
  const [data, setdata] = useState([]);
  const [updated, setupdated] = useState({
    name: "",
    cin: "",
    rc: "",
    type: "",
    ice: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Set default values for fields if they are empty

  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [ajouttrik, setajouttrik] = useState(0); // State to manage
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row data
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setdata(data))
      .catch((err) => console.error(err));
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage); // Calculate total pages

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handeldelet = (id) => {
    fetch(url + id, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          // Account deleted successfully, update the UI by removing the deleted account from the data array
          setdata(data.filter((account) => account._id !== id));
          console.log("Account deleted successfully");
        } else {
          console.error("Failed to delete account");
        }
      })
      .catch((err) => {
        console.error("Error deleting account:", err);
      });
  };

  const handelupdate = (row, idx) => {
    setSelectedRow(row); // Set the selected row
    setShowForm(true); // Show the form
    setid(idx);
  };
  const renderRows = () => {
    // Logic to render rows based on current page and search query
    const filteredData = data.filter((row) =>
      row.cin.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
    return filteredData.slice(startIndex, endIndex).map((row, index) => (
      <tr key={startIndex + index} className="trees">
        <td className="tdees">{row.name}</td>
        <td className="tdees">{row.type}</td>
        <td className="tdees">{row.cin}</td>
        {row.type === "particulier" && (
          <Fragment>
            <td className="tdees">
              <CloseIcon />
            </td>
            <td className="tdees">
              <CloseIcon />
            </td>
          </Fragment>
        )}
        {row.type === "revendeur" && (
          <Fragment>
            <td className="tdees">{row.rc}</td>
            <td className="tdees">{row.ice}</td>
          </Fragment>
        )}
        {row.type === "bigacount" && (
          <Fragment>
            <td className="tdees">{row.rc}</td>
            <td className="tdees">
              <CloseIcon />
            </td>
          </Fragment>
        )}
        <td className="tdees">
          <div
            style={{
              position: "relative",
              left: "72px",
            }}
          >
            <DeleteOutlineIcon
              sx={{ color: "red" }}
              onClick={() => handeldelet(row._id)}
            />
            <LoopIcon
              sx={{ color: "blue" }}
              onClick={() => handelupdate(row, row._id)}
            />
          </div>
        </td>
      </tr>
    ));
  };

  const handelchange = (e) => {
    setupdated({ ...updated, [e.target.name]: e.target.value });
  };
  const hadelrealupdate = () => {
    fetch(url + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Data updated successfully");
          // After successful update, hide the form
          setShowForm(false);
        } else {
          console.error("Failed to update data");
        }
      })
      .catch((err) => console.error("Error updating data:", err));
  };
  const handelajoute = () => {
    setajouttrik(1);
  };
  const hadelrealadd = () => {
    setajouttrik(2);
  };
  console.log(updated);
  const handeladd = async () => {
    await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Data added successfully");
          // Assuming you want to clear the form fields after successful addition
          setupdated({
            name: "",
            cin: "",
            rc: "",
            type: "",
            ice: "",
          });
        } else {
          console.error("Failed to add data");
        }
      })
      .catch((error) => console.error("There is an error in the post", error));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <div className="sersh">
          <div className="searshbar">
            <input
              type="text"
              name="cin"
              className="bar"
              placeholder="Search by CIN"
              onChange={handleSearchChange}
            />
            <SearchIcon className="search-icon" />
          </div>
          <button type="button" className="addbutton" onClick={handelajoute}>
            Ajouter
          </button>
          <div className="line"></div>
        </div>
        <div className="tables">
          <table className="tabile">
            <thead className="theadees">
              <tr className="trees">
                <th className="thees">Name</th>
                <th className="thees">Type</th>
                <th className="thees">CIN</th>
                <th className="thees">RC</th>
                <th className="thees">ICE</th>
                <th className="thees">Action</th>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
        <div className="pagination">
          {/* Rendering pagination buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={index === page ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {/* Update Form */}
      {showForm && selectedRow && (
        <div className="update-form-container">
          <div className="update-form">
            {selectedRow.type === "revendeur" && (
              <form className="formmm">
                <div className="form-group">
                  <label htmlFor="name" className="labelees">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="brrr"
                    onChange={handelchange}
                    name="name"
                    placeholder={selectedRow.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ice" className="labelees">
                    ICE
                  </label>
                  <input
                    type="text"
                    id="ice"
                    className="brrr"
                    onChange={handelchange}
                    name="ice"
                    placeholder={selectedRow.cie}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cin" className="labelees">
                    CIN
                  </label>
                  <input
                    type="text"
                    id="cin"
                    className="brrr"
                    onChange={handelchange}
                    name="cin"
                    placeholder={selectedRow.cin}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rc" className="labelees">
                    RC
                  </label>
                  <input
                    type="text"
                    id="rc"
                    className="brrr"
                    onChange={handelchange}
                    name="rc"
                    placeholder={selectedRow.rc}
                  />
                </div>
                <button type="submit" onClick={hadelrealupdate} className="sub">
                  Update
                </button>
              </form>
            )}
            {selectedRow.type === "particulier" && (
              <form className="formmm">
                <div className="form-group">
                  <label htmlFor="name" className="labelees">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="brrr"
                    onChange={handelchange}
                    name="name"
                    placeholder={selectedRow.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cin" className="labelees">
                    CIN
                  </label>
                  <input
                    type="text"
                    id="cin"
                    className="brrr"
                    onChange={handelchange}
                    name="cin"
                    placeholder={selectedRow.cin}
                  />
                </div>
                <button type="submit" onClick={hadelrealupdate} className="sub">
                  Update
                </button>
              </form>
            )}
            {selectedRow.type === "bigacount" && (
              <form className="formmm">
                <div className="form-group">
                  <label htmlFor="name" className="labelees">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="brrr"
                    onChange={handelchange}
                    name="name"
                    placeholder={selectedRow.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cin" className="labelees">
                    CIN
                  </label>
                  <input
                    type="text"
                    id="cin"
                    className="brrr"
                    onChange={handelchange}
                    name="cin"
                    placeholder={selectedRow.cin}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rc" className="labelees">
                    RC
                  </label>
                  <input
                    type="text"
                    id="rc"
                    className="brrr"
                    onChange={handelchange}
                    name="rc"
                    placeholder={selectedRow.rc}
                  />
                </div>
                <button type="submit" onClick={hadelrealupdate} className="sub">
                  Update
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {ajouttrik === 1 ? (
        <div className="update-form-container">
          <div className="update-form">
            <form className="formmm">
              <div className="form-group">
                <label htmlFor="type" className="labelees">
                  Type of Article
                </label>
                <input
                  type="text"
                  id="type"
                  className="brrr"
                  placeholder="Type"
                  onChange={(e) => setchonger(e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={hadelrealadd} className="susb">
                Next
              </button>
            </form>
          </div>
        </div>
      ) : ajouttrik === 2 ? (
        <div className="update-form-container">
          <div className="update-form">
            {chonger === "revendeur" && (
              <form className="formmm">
                <div className="form-group">
                  <label htmlFor="name" className="labelees">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="brrr"
                    name="name"
                    onChange={handelchange}
                    placeholder="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ice" className="labelees">
                    ICE
                  </label>
                  <input
                    type="text"
                    id="ice"
                    className="brrr"
                    name="ice"
                    onChange={handelchange}
                    placeholder="ice"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cin" className="labelees">
                    CIN
                  </label>
                  <input
                    type="text"
                    id="cin"
                    className="brrr"
                    name="cin"
                    onChange={handelchange}
                    placeholder="cin"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rc" className="labelees">
                    RC
                  </label>
                  <input
                    type="text"
                    id="rc"
                    className="brrr"
                    name="rc"
                    onChange={handelchange}
                    placeholder="rc"
                  />
                </div>
                <button type="submit" className="sub" onClick={handeladd}>
                  Add
                </button>
              </form>
            )}
            {chonger === "particulier" && (
              <form className="formmm">
                <div className="form-group">
                  <label htmlFor="name" className="labelees">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="brrr"
                    name="name"
                    onChange={handelchange}
                    placeholder="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cin" className="labelees">
                    CIN
                  </label>
                  <input
                    type="text"
                    id="cin"
                    className="brrr"
                    name="cin"
                    onChange={handelchange}
                    placeholder="cin"
                  />
                </div>
                <button type="submit" className="sub" onClick={handeladd}>
                  Add
                </button>
              </form>
            )}
            {chonger === "bigacount" && (
              <form className="formmm">
                <div className="form-group">
                  <label htmlFor="name" className="labelees">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="brrr"
                    name="name"
                    onChange={handelchange}
                    placeholder="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cin" className="labelees">
                    CIN
                  </label>
                  <input
                    type="text"
                    id="cin"
                    className="brrr"
                    name="cin"
                    onChange={handelchange}
                    placeholder="cin"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rc" className="labelees">
                    RC
                  </label>
                  <input
                    type="text"
                    id="rc"
                    className="brrr"
                    name="rc"
                    onChange={handelchange}
                    placeholder="rc"
                  />
                </div>
                <button type="submit" className="sub" onClick={handeladd}>
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
