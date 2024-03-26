import React, { useEffect, useState } from "react";
import "./Comands.modules.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Commands from "./commands/Commands";
import City from "./city/City";
import Articles from "./articles/Articles";
import Buttons from "./buttons/Buttons";

export default function Comands() {
  const [data, setData] = useState([]);
  const [filtred, setFiltred] = useState();
  const [more, setMore] = useState({
    date: "",
    city: "",
    name: "",
  });
  const [check,setchesk] = useState(false)
  const url = "http://localhost:3001/apiClient";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handelclicke = (idx) => {
    const filteredUser = data.filter((user) => user._id === idx);
    setFiltred(filteredUser);
  };
  console.log(check)
  return (
    <div className="all">
      <div className="titel">
        <h1>Commandes</h1>
        <ArrowForwardIosIcon sx={{ marginTop: "35px", marginLeft: "5px" }} />
        <p className="a">Acceuil</p>
        <ArrowForwardIosIcon sx={{ marginTop: "35px", marginLeft: "5px" }} />
        <p className="b">ventes</p>
        <ArrowForwardIosIcon sx={{ marginTop: "35px", marginLeft: "5px" }} />
        <p className="c">Commandes</p>
      </div>
      <Commands handleItemClick={handelclicke} />
      <City filtred={filtred} setMore={setMore} more={more} check={check}/>
      <Articles filtred={filtred} check={check} />
     <Buttons filtred={filtred} more={more} fulldata={data} setchesk={setchesk} />
    </div>
  );
}
