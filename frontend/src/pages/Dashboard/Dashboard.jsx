import React from "react";
import Niv from "../../components/Niv";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Date from "./Date";
import Customer from "./customer";
import Order from "./order";
import Food from "./food";
import Income from "./income";
import Enventory from "./enventory";
import Barchart from "./barChart.jsx";
import Topsales from "./Topsales.jsx";
import Notification from "../../components/Notification";



const slidecard = { margin: "1em" };

const Dashboard = () => {
  return (
    <div style={{}}>
      <Niv name="Dashboard" />
      <Notification/>
      <div className="data">
        <div style={{ display: "flex", position: "relative" }}>
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#1c003f", marginTop: "10px" }}
              onClick={() => window.location.reload()}
              
            >
              Refresh
            </Button>
          </div>
          <div style={{ position: "absolute", right: "0px" }}>
            <Date />
          </div>
        </div>
        <div>
          <Card
            style={{
              minWidth: 230,
              marginTop: "40px",
              backgroundColor: "white",
              borderRadius: "9px",
            }}
          >
            <CardContent>
             <Income/>
            </CardContent>
          </Card>
        </div>
        <div>
          <CardGroup style={{ display: "flex", marginTop: "30px" }}>
            <div
              style={{
                margin: "1em",
                borderStyle: "solid",
                borderLeftWidth: "5px",
                width: "25%",
                borderColor: " white white white #84ECAD  ",
                backgroundColor: "white",
                borderRadius: "9px",
              }}
            >
              <Card style={slidecard}>
                <Card.Body>
                  <Customer />
                </Card.Body>
              </Card>
            </div>
            <div
              style={{
                margin: "1em",
                borderStyle: "solid",
                borderLeftWidth: "5px",
                width: "25%",
                borderColor: " white white white #FCE06F ",
                backgroundColor: "white",
                borderRadius: "9px",
              }}
            >
              <Card style={slidecard}>
                <Card.Body>
                  <Order />
                </Card.Body>
              </Card>
            </div>
            <div
              style={{
                margin: "1em",
                borderStyle: "solid",
                borderLeftWidth: "5px",
                width: "25%",
                borderColor: " white white white #FA6D6D ",
                backgroundColor: "white",
                borderRadius: "9px",
              }}
            >
              <Card style={slidecard}>
                <Card.Body>
                  <Food />
                </Card.Body>
              </Card>
            </div>
            <div
              style={{
                margin: "1em",
                borderStyle: "solid",
                borderLeftWidth: "5px",
                width: "25%",
                borderColor: " white white white #81DAFB ",
                backgroundColor: "white",
                borderRadius: "9px",
              }}
            >
              <Card style={slidecard}>
                <Card.Body>
                  <Enventory />
                </Card.Body>
              </Card>
            </div>
          </CardGroup>
        </div>
        <div style={{ display: "flex" }}>
          <Card
            style={{
              backgroundColor: "white",
              marginRight: "3%",
              borderRadius: "9px",
              marginTop: "20px",
              flexGrow: "1",
              padding: "10px",
            }}
          >
            <Card.Body>
              <h1>Sales Report</h1>
              <Barchart />
            </Card.Body>
          </Card>
          <Card
            style={{
              backgroundColor: "white",
              borderRadius: "9px",
              marginTop: "20px",
              flexGrow: "1",
              minWidth: "45%",
              padding: "10px",
            }}
          >
            <Card.Body>
              <h1>Top sales</h1>
              <Topsales />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
