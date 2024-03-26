import React, { useState } from "react";
import "../Comands.modules.css";

export default function City({ filtred ,setMore , more ,check}) {
  const data = filtred ? filtred[0] : null;
  const handelchange = (e) => {
    setMore({ ...more, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {
        check ?
        <div className="filter-command">
        <form>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              placeholder={"00/00/0000"}
              className="inputs"
              onChange={handelchange}
              name="date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="site">City:</label>
            <select
              className="form-control"
              name="city"
              placeholder="City"
              onChange={handelchange}
            >
              
                <option value="selectioner un city">selectioner un city</option>
              
              <option value="beni mellal">beni mellal</option>
              <option value="marrakesh">marrakesh</option>
              <option value="khouribga">khouribga</option>
              <option value="safi">safi</option>
              <option value="bengrir">bengrir</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="site" className="label">
              Client:
            </label>
            <select
              className="form-control2"
              name="name"
              placeholder="City"
              onChange={handelchange}
            >
            
                <option value="selectioner un city">selectioner un city</option>
            
              <option value="Mohamed oaabad">Mohamed oaabad</option>
              <option value="societe t G CC">societe t G CC</option>
            </select>
          </div>
        </form>
      </div>
        :
        <div className="filter-command">
        <form>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              placeholder={data ? data.date : "00/00/0000"}
              className="inputs"
              onChange={handelchange}
              name="date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="site">City:</label>
            <select
              className="form-control"
              name="city"
              placeholder="City"
              onChange={handelchange}
            >
              {data ? (
                <option value={data.city}>{data.city}</option>
              ) : (
                <option value="selectioner un city">selectioner un city</option>
              )}
              <option value="beni mellal">beni mellal</option>
              <option value="marrakesh">marrakesh</option>
              <option value="khouribga">khouribga</option>
              <option value="safi">safi</option>
              <option value="bengrir">bengrir</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="site" className="label">
              Client:
            </label>
            <select
              className="form-control2"
              name="name"
              placeholder="City"
              onChange={handelchange}
            >
              {data ? (
                <option value={data.name}>{data.name}</option>
              ) : (
                <option value="selectioner un city">selectioner un city</option>
              )}
              <option value="Mohamed oaabad">Mohamed oaabad</option>
              <option value="societe t G CC">societe t G CC</option>
            </select>
          </div>
        </form>
      </div>
      }
    </div>
  );
}
