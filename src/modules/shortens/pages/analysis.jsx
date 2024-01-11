import React, { useMemo } from "react";
import useShowShorten from "../hooks/query/useShowShorten";
import { Result, Button, Card, Form, DatePicker, Statistic } from "antd";
import "./../../../App.css";
import { useParams } from "react-router";
import useGetAnalysis from "../hooks/query/useGetAnalysis";
import ChartComponent from "@components/ChartComponent";
import { array2Group, array2Object } from "@helper/array2Obj";
import useSearchQuery from "@hooks/useSearchQuery";
import { SearchOutlined, AimOutlined } from "@ant-design/icons";
const AnalysisShortLink = () => {
  const { code } = useParams();
  const { initSearchValues, search, setSearch } = useSearchQuery();
  const [formSearch] = Form.useForm();
  const query = {
    // ...search,
    // page: pagination.current,
    // perPage: pagination.pageSize,

    startDate: search?.range?.[0]?.valueOf() || -1,
    endDate: search?.range?.[1]?.valueOf() || -1,
    range: undefined,
    // ...pagination?.sort,
  };
  const { data, isLoading, isError } = useShowShorten(code);
  const { data: analysis } = useGetAnalysis(data?.id, query);
  const dataCountry = useMemo(() => {
    const obj = {};
    [
      "country",
      "continent",
      "region",
      "city",
      "org",
      "isp",
      "currency",
    ].forEach((e) => {
      obj[e] = obj[e] || {};
      const rs = array2Group(analysis, e);
      obj[e] = Object.entries(rs || {}).map(([country, data]) => {
        return {
          type: country,
          value: data?.length,
          xField: data?.length,
          seriesField: "name",
          yField: country,
        };
      });
    });

    return obj;
  }, [analysis]);
  return (
    <div>
      <Form
        onFinish={setSearch}
        form={formSearch}
        layout="inline"
        initialValues={initSearchValues}
        autoComplete="off"
      >
        <div className="flex justify-end items-center gap-x-1 gap-y-1 [&>*]:!m-0 !space-x-reverse form-no-margin my-2">
          <Form.Item name="range">
            <DatePicker.RangePicker />
          </Form.Item>

          <Form.Item>
            <Button
              // disabled={loadingFetch}
              icon={<SearchOutlined />}
              type="primary"
              htmlType="submit"
            >
              Tìm
            </Button>
          </Form.Item>
        </div>
      </Form>

      {(data && (
        <div>
          <div className="my-2">
            {" "}
            <Card bordered={false}>
              <Statistic
                title="Total Click"
                value={dataCountry?.countAccess || 0}
                // precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<AimOutlined />}
                suffix="click"
              />
            </Card>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Card title="Country">
              <ChartComponent data={dataCountry?.country} type={"PIE"} />
            </Card>
            <Card title="Continent">
              <ChartComponent data={dataCountry?.continent} type={"COLUMN"} />
            </Card>
            <Card title="Region">
              <ChartComponent data={dataCountry?.region} type={"DONUT"} />
            </Card>
            <Card title="Country">
              <ChartComponent
                columnNameXField="value"
                data={dataCountry?.country}
                type={"TABLE"}
              />
            </Card>
            <Card title="ISP">
              <ChartComponent data={dataCountry?.isp} type={"COLUMN"} />
            </Card>
            <Card title="CITY">
              <ChartComponent
                columnNameXField="value"
                data={dataCountry?.city}
                type={"TABLE"}
              />
            </Card>
          </div>
        </div>
      )) || (
        <Result
          status="404"
          title={`Không tìm thấy Shorten Code này!`}
          extra={[
            <Button
              onClick={() => (window.location.href = "/")}
              type="primary"
              key="console"
            >
              Go home
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default AnalysisShortLink;
