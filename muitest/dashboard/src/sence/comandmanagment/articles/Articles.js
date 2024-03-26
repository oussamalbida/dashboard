import React from "react";
import "./Articles.css";
import "../Comands.modules.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function Articles({ filtred ,check}) {
  const data = filtred && filtred.length > 0 ? filtred[0] : null;
  const url = "http://localhost:3001/apiClient/";

  // Use optional chaining to access articleInfo property
  const datas = data?.articlinfo || [];

  const handeladd = () =>{
    fetch(url,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({article: "",
      contite: "",
      prix: "",
      total: "",})
  })
  .then(res => console.log('Data posted successfully',res))
  .catch(error => console.error('Error posting data',error))
  }
 return (
    <div>
      <div className="managment-command">
        <form>
          <button type="submit" onClick={handeladd}>Ajouter article</button>
          <table>
            <thead>
              <tr>
                <th>ARTICLE</th>
                <th>QUANTITÉ</th>
                <th>PRIX</th>
                <th>TOTAL HT</th>
              </tr>
            </thead>

            {
              check?
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              :
              (datas.map((article, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      <select>
                        <option value={article.article}>{article.article}</option>
                      </select>
                      <AddCircleOutlineOutlinedIcon
                        sx={{
                          height: "100%",
                          position: "absolute",
                          bottom: "0px",
                          top: "0px",
                          left: "140px",
                          color: "green",
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={article.contite}
                        className="inputs"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={article.prix}
                        className="inputs"
                      />
                    </td>
                    <td>
                      {article.total}
                      <DeleteOutlineOutlinedIcon
                        sx={{
                          marginBottom: "-5px",
                          position: "relative",
                          left: "105px",
                          color: "red",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              )))
            }
            
          </table>
        </form>
      </div>
    </div>
  );
}
