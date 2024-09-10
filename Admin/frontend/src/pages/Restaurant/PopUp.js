import React, { Component } from "react";
import "./RestaurantDelete.css";

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
        <div className="carddel">
        <form action="#" className="Resdelform">
          <header className="delheader">Delete the records</header>
          <br />
          <div className="form first">
            <div class="delete details">
              <div class="fields">
                <div class="input-field">
                  <label className="ResdelProductCode">Item Name</label>
                  <input type="text" placeholder="Item Name" />
                </div>

                <div class="input-field">
                  <label>Date</label>
                  <input type="date" />
                </div>
              </div>

              <button class="Add">
                <span class="addbtn">Delete</span>
              </button>
            </div>
          </div>
        </form>
        <table className="ResDelDesc">
          <tr className="tbl-head">
            <td className="del-tbl-head">Time</td>
            <td className="del-tbl-head">Buy Date</td>
            <td className="del-tbl-head">Quantity</td>
            <td className="del-tbl-head">Buy Price</td>
            <td className="del-tbl-head"></td>
          </tr>
          <tr>
            <td className="del-tbl-data">09:00</td>
            <td className="del-tbl-data">2023.05.03</td>
            <td className="del-tbl-data">100</td>
            <td className="del-tbl-data">130,000</td>
            <td className="del-tbl-data"><input type="checkbox"/></td>
          </tr>
          <tr>
            <td className="del-tbl-data">11:00</td>
            <td className="del-tbl-data">2023.05.05</td>
            <td className="del-tbl-data">50</td>
            <td className="del-tbl-data">15,000</td>
            <td className="del-tbl-data"><input type="checkbox"/></td>
          </tr>
        </table>
      </div>
    );
  }
}
