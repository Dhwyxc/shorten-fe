import { Table } from "antd";
import React from "react";
import { useMemo } from "react";

const ChartTable = ({ data: initData, columnNameXField }) => {
  const columns = useMemo(() => {
    const seriesFields = [
      ...new Set(initData?.map((e) => e?.seriesField) || []),
    ];
    return seriesFields
      ?.map((e) => {
        return {
          title: e,
          dataIndex: e,
          key: e,
        };
      })
      .concat([
        {
          title: columnNameXField,
          dataIndex: columnNameXField,
          key: columnNameXField,
        },
      ]);
  }, [columnNameXField, initData]);
  const dataSource = useMemo(() => {
    return initData?.map((e, i) => {
      return {
        key: i,
        [columnNameXField]: e?.xField,
        [e?.seriesField]: e?.yField,
      };
    });
  }, [columnNameXField, initData]);

  return <Table pagination={false} dataSource={dataSource} columns={columns} />;
};

export default ChartTable;
