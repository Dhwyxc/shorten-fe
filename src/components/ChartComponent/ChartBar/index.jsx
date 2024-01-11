import React from "react";
import { Bar } from "@ant-design/plots";

const ChartBar = ({ data: dataCounts, color, haveColor }) => {
  // console.log({sv:color({"Sinh viên":"#fcf"})});
  const config = {
    data: dataCounts,
    ...(haveColor ? { color } : {}),
    xField: "value",
    yField: "type",

    // colorField: "type",

    seriesField: "type",
    legend: {
      position: "top-left",
    },
  };

  return (
    <Bar
      {...config}
      xAxis={{
        label: {
          style: {
            fill: "black",
          },
        },
      }}
      yAxis={{
        label: {
          style: {
            fill: "black",
          },
        },
      }}
    />
  );
};
export default ChartBar;
