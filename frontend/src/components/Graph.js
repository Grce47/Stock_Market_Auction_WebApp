import React, { useState } from 'react';
import store from "../store";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

function Graph(){
    
    const [data,setData] = useState({
      labels: store.getState().marketPrices.map((item,idx) => item.date),
      datasets: [
        {
          label: "Market Price vs Time",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: store.getState().marketPrices.map((item,idx) => item.price),
        },
      ],
    });
    
    store.subscribe(()=>{
        setData({
            labels:store.getState().marketPrices.map((item,idx) => item.date),
            datasets: [
              {
                label: "Market Price vs Time",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: store.getState().marketPrices.map((item,idx) => item.price),
              },
            ],
          });
    });
    return (
        <Line data={data} />
    );
}


export default Graph;