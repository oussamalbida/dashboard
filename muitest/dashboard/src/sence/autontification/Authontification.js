import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Authontification.css";
import Routes from "../../routes/Routes";

export default function Authontification() {
  const [login, setLogin] = useState(false);
  const [origin, setOrigin] = useState([]);
  const [userinfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userinfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const url = "http://localhost:3001/userApi/";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrigin(data))
      .catch((err) => console.log(err, "you have an error in getting data"));
  }, []);

  const handleLogin = () => {
    const matchedUser = origin.find(
      (user) =>
        user.email === userinfo.email && user.password === userinfo.password
    );
    if (matchedUser) {
      setLogin(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      {
        login ?
          <Routes/>
        :
        <div className="auth-container">
        <div className="form-container">
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={userinfo.email}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={userinfo.password}
              required
            />
            <button type="button" onClick={handleLogin}>
             Login
            </button>
          </form>
        </div>
      </div>
      }
    </div>
  );
}
