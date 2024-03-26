import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/Add";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "../Comands.modules.css";

export default function Buttons({ filtred, more ,setchesk}) {
  const data = filtred ? filtred[0] : null;
  const url = "http://localhost:3001/apiClient/";
  const [variab, setvariab] = useState(true);
  const handelupdates = async() => {
    try {
        const response = await fetch(url + data._id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(more),
        });
    
        if (!response.ok) {
          throw new Error("Failed to update data");
        }
    
        console.log("Data updated successfully");
      } catch (error) {
        console.error("Error updating data:", error);
      }
  };
  const handelvariab = () => {
    setvariab(false)
    fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(more)
    })
    .then(res => console.log('Data posted successfully',res))
    .catch(error => console.error('Error posting data',error))
    setchesk(false)

  }

  const handeldelite = async () => {
    try {
      const response = await fetch(url + data._id, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
  
      console.log('Data deleted successfully');
      
      // Here you might want to update your UI to reflect the deletion
      // For example, if you're using some state to manage the list of articles, you can remove the deleted article from the state
  
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  
  const handelchkout = () => {
    setchesk(true)
    setvariab(true)
  }
  return (
    <div>
      <div className="effect-command">
        <div className="btn">
          <button class="button" onClick={variab?handelchkout:''}>
            <AddIcon
              sx={{
                height: "17px",
                width: "17px",
                position: "relative",
                left: "-5px",
              }}
            />
          </button>
          <button class="button" onClick={handelvariab}>
            <CheckOutlinedIcon
              sx={{
                height: "17px",
                width: "17px",
                position: "relative",
                left: "-5px",
              }}
            />
          </button>
          <button class="button" onClick={handelupdates}>
            <SaveOutlinedIcon
              sx={{
                height: "17px",
                width: "17px",
                position: "relative",
                left: "-5px",
              }}
            />
          </button>
          <button class="button">
            <ClearOutlinedIcon
              sx={{
                height: "17px",
                width: "17px",
                position: "relative",
                left: "-5px",
              }}
            />
          </button>
          <button class="button" onClick={handeldelite}>  
            <DeleteOutlineOutlinedIcon
              sx={{
                height: "17px",
                width: "17px",
                position: "relative",
                left: "-5px",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
