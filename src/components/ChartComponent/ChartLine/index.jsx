import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";
import dayjs from "dayjs";

const ChartLine = ({ data = [] }) => {
  if (data?.length === 0) return "";

  const config = {
    data,
    xField: "xField",
    yField: "yField",
    seriesField: "seriesField",
    // yAxis: {
    //   label: {
    //     formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
    //   },
    // },
    legend: {
      position: "top",
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
  };

  return (
    <Line
      {...config}
      xAxis={{
        label: {
          formatter: (txt) => {
            if (dayjs(txt).isValid()) {
              return dayjs(txt).format("DD/MM/YYYY");
            }
            return txt;
          },
        },
      }}
    />
  );
};

export default ChartLine;
