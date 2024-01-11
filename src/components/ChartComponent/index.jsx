import React, { useMemo, lazy, Suspense, useCallback } from "react";
// import { PacmanLoader } from "react-spinners";
const ChartCard = lazy(() => import("./ChartCard"));
const ChartColumn = lazy(() => import("./ChartColumn"));
const ChartPie = lazy(() => import("./ChartPie"));
const ChartBar = lazy(() => import("./ChartBar"));
const ChartBarMulti = lazy(() => import("./ChartMulti"));
const ChartTable = lazy(() => import("./ChartTable"));
const ChartDonut = lazy(() => import("./ChartDonut"));
const ChartLine = lazy(() => import("./ChartLine"));
const mappingTypeChart = {
  COLUMN: ChartColumn,
  PIE: ChartPie,
  BAR: ChartBar,
  BAR_MULTI: ChartBarMulti,
  DONUT: ChartDonut,
  LINE: ChartLine,
  TABLE: ChartTable,
};

const ChartComponent = ({
  type,
  isGroup,
  columnNameXField,
  totalPlan,
  valueStyle,
  icon,
  data,
  scale,
  total,
}) => {
  const Chart = mappingTypeChart?.[type];
  // const mappingColorTitle = array2Object(data, "title");

  // console.log({ mappingColorTitle });

  // console.log({ color: color() });
  // return type;
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        {/* <ScaleLoader color="#00B649" /> */}
        {/* {name} */}

        <Chart
          isGroup={isGroup}
          valueStyle={valueStyle}
          icon={icon}
          totalPlan={totalPlan}
          columnNameXField={columnNameXField}
          // mappingColorTitle={mappingColorTitle}
          // color={color}
          // haveColor={!!haveColor}

          // rawData={data}
          data={data}
          scale={scale}
          total={total}
          // data={dataFinal || []}
        />
        {/* <ChartColumn rawData={data} data={dataCounts} /> */}
      </Suspense>
    </div>
  );
  //   return <Column {...config} />;
};

export default React.memo(ChartComponent);
