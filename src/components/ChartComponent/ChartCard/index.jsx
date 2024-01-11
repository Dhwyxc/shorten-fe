import { Card, Statistic } from "antd";
import React from "react";
const ChartCard = ({ data, totalPlan, valueStyle, icon }) => {
  const value = data?.[0]?.value || 0;
  return (
    <Card bordered={false}>
      <Statistic
        // title="Active"
        value={totalPlan > 0 ? `${value}/${totalPlan}` : value}
        precision={0}
        valueStyle={valueStyle}
        suffix=""
      />
    </Card>
  );
};

export default ChartCard;
