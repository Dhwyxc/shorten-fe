import React from "react";
import { Pie } from "@ant-design/plots";

const ChartDonut = ({ data, total }) => {
  console.log("donut rerender");
  const config = {
    appendPadding: 10,
    // ...(haveColor ? { color } : {}),
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: 30,
        },
        content: total || "",
      },
    },
  };
  return (
    <Pie
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
      {...config}
      color={["orange", "blue"]}
    />
  );
};
export default ChartDonut;
