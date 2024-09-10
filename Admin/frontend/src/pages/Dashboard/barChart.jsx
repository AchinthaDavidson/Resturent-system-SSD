import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  Export,
} from "devextreme-react/chart";

// import  grossProductData  from './chartData.jsx';

const BarChart = () => {

  function onPointClick(e) {
    e.target.select();
  }

  const [type, setType] = useState([]);

  useEffect(() => {
    function getorder() {
      axios.get("http://localhost:8070/order/type").then((res) => {
        console.log(res.data);
        setType(res.data);
        // console.log(orders[1]);
      });
    }
    getorder();
  }, []);
  var finalDate=[];
  for (var i=0;i<=6;i++) {
    var date = new Date();
    date.setDate(date.getDate() - i);
     finalDate.push ( date.getDate()+'-'+ (date.getMonth()+1) +'-'+date.getFullYear());
    
    
  }

  console.log(finalDate[1]);



  var Takeaway =[]
  var Dining=[]
  var Delivery=[]
 

  for (var i=0;i<=6;i++) {
    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;
    for (const obj of type) {
      if (obj.type === 'Takeaway' && obj.date==finalDate[i]) {
        counter1++;
      }else if (obj.type === 'Delivery' && obj.date==finalDate[i]) {
        counter2++;
      }else if (obj.type === 'Dining' && obj.date==finalDate[i]) {
        counter3++;
      }
      
    }
    Takeaway.push(counter1);
    Dining.push(counter3);
    Delivery.push(counter2);

    

  }


  console.log(Dining);
  // console.log(Delivery);
  // console.log(Takeaway);
  

  const grossProductData = [
    {
      state: finalDate[6],
      Delivery: Dining[6],
      Dining: Delivery[6],
      Takeaway: Takeaway[6],
    },
    {
      state: finalDate[5],
      Delivery: Dining[5],
      Dining: Delivery[5],
      Takeaway: Takeaway[5],
    },
    {
      state: finalDate[4],
      Delivery: Dining[4],
      Dining: Delivery[4],
      Takeaway: Takeaway[4],
    },
    {
      state: finalDate[3],
      Delivery: Dining[3],
      Dining: Delivery[3],
      Takeaway: Takeaway[3],
    },
    {
      state: finalDate[2],
      Delivery: Dining[2],
      Dining: Delivery[2],
      Takeaway: Takeaway[2],
    },
    {
      state: finalDate[1],
      Delivery: Dining[1],
      Dining: Delivery[1],
      Takeaway: Takeaway[1],
    },
    {
      state: finalDate[0],
      Delivery: Dining[0],
      Dining: Delivery[0],
      Takeaway: Takeaway[0],
    },
  ];

  return (
    <Chart
      id="chart"
      // title="<b>Sales Report</b>"
      dataSource={grossProductData}
      onPointClick={onPointClick}
    >
      <CommonSeriesSettings
        argumentField="state"
        type="bar"
        hoverMode="allArgumentPoints"
        selectionMode="allArgumentPoints"
      ></CommonSeriesSettings>
      <Series
        argumentField="state"
        valueField="Takeaway"
        name="Takeaway"
        color="#01BC90"
      />
      <Series valueField="Dining" name="Dining" color="#00A0AC" />
      <Series valueField="Delivery" name="Delivery" color="#0083BB" />
      <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
      <Export enabled={true} />
    </Chart>
  );
};

export default BarChart;
