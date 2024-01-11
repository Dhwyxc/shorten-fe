import React from "react";
import { Bar } from "@ant-design/plots";
const ChartMulti = ({ data, color, haveColor, mappingColorTitle }) => {
  const finalData = data
    ?.map((e) => ({
      ...e,
      // question: e?.question?.substring(0, 30),
    }))
    ?.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type - b.type;
      }
      return 1;
    });
  console.log({ mappingColorTitle: mappingColorTitle });
  const config = {
    data: finalData,
    xField: "value",
    yField: "question",
    seriesField: "type",
    isPercent: true,
    isStack: true,

    ...(haveColor ? { color } : {}),
    /** 自定义颜色 */
    // color: ['#2582a1', '#f88c24', '#c52125', '#87f4d0'],
    label: {
      position: "middle",
      content: (item) => {
        // return (item.value * 100).toFixed(2) + "%";
        return "";
      },
      // content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fill: "#fff",
      },
    },
  };
  return (
    <Bar
      groupField="question"
      color={(a) => {
        console.log(a);
      }}
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
          autoHide: true,
          formatter: (text) => {
            return text?.substring(0, 30);
          },
          style: {
            fill: "black",
          },

          // autoRotate: true,
        },
      }}
    />
  );
};

export default ChartMulti;
