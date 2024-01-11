import React from "react";
import { Column } from "@ant-design/plots";
const ChartColumn = ({
  data: dataCounts,
  haveColor,
  color,
  isGroup,
  scale,
}) => {
  const config = {
    data: dataCounts,
    xField: "type",
    yField: "value",
    isGroup: !!isGroup,
    // colorField: "type",
    // seriesField: "value",

    ...(haveColor ? { color } : {}),
    label: {
      offset: 10,
      // content: (item) => {
      //   return (item.value * 100).toFixed(2) + "%";
      // },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],

    yAxis: {
      label: {
        style: {
          fill: "black",
        },
      },
    },
    // legend: { position: "top-left" },
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: true,
        style: {
          fill: "black",
        },
      },
    },
  };
  if (scale) {
    config.slider = {
      start: 0,
      end: 0.4,
    };
  }

  return <Column {...config} />;
};

export default ChartColumn;
