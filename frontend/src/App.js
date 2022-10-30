import Graph from "./components/Graph";
import Portfolio from "./components/Portfolio";
import Tform from "./components/Tform";
import OrderBook from "./components/OrderBook";
import Navbar from "./components/Navbar";
import Transaction from "./components/Transaction";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("light");

  const togglemode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#1f2330";
    } else {
      setMode("light");
      document.body.style.backgroundColor = " #4d648d";
    }
  };
  return (
    <>
      <Navbar mode={mode} togglemode={togglemode} />
      <div className="row">
        <div className="col-7 card">
          <div className="card-body">
            <h5 class="card-title">Graph</h5>
            <Graph />
          </div>
        </div>
        <div className="col-3 card">
          <div className="card-body">
            <h5 class="card-title">Transaction Form</h5>
            <Tform />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3 card">
          <div className="card-body">
            <h5 class="card-title">Users</h5>
            <Portfolio />
          </div>
        </div>
        <div className="col-7 card">
          <div className="card-body">
            <h5 class="card-title">Order Book</h5>
            <OrderBook />
          </div>
        </div>
      </div>
      <div className="container card" style={{ height: "400px", overflow: "scroll" }}>
        <div className="card-body">
          <h5 class="card-title">Transaction History</h5>
          <Transaction />
        </div>
      </div>
    </>
  );
}

export default App;