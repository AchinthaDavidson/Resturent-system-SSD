import React from "react";
import { useState,  useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { MdFastfood} from "react-icons/md"
import { AiOutlinePlusCircle} from "react-icons/ai";

const Food = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState("");
  useEffect(() => {
    function getcount() {
      axios.get("http://localhost:8070/food/count").then((res) => {
        // console.log(res.data);
        setCount(res.data);
        // console.log(orders[1]);
      });
    }
    getcount();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: "6", minWidth: "25%", maxWidth: "40%" }}>
        <MdFastfood
          style={{ fontSize: "65px", marginTop: "15px", marginLeft: "13px" }}
        />
      </div>
      <div style={{ flexGrow: "1" }}>
        <Card.Title>
          <label style={{ fontSize: "20px" }}>Food</label>
        </Card.Title>
        <Card.Text>
          <label style={{ fontSize: "30px" }}>{count}</label>
          <br />
          <div style={{ color: "red" }} onClick={ () => navigate("food")}>
            {" "}
            <AiOutlinePlusCircle
              style={{
                fontSize: "15px",
                paddingTop: "1px",
                marginLeft: "13px",
              }}
            />{" "}
            Add new food{" "}
          </div>
        </Card.Text>
      </div>
    </div>
  );
};
export default Food;
