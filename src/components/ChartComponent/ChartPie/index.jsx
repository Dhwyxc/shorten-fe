import React from "react";
import { Pie } from "@ant-design/plots";

const ChartPie = ({ rawData, data, haveColor, color }) => {
  console.log({ data });
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    // ...(haveColor ? { color } : {}),
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <Pie
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

export default ChartPie;
