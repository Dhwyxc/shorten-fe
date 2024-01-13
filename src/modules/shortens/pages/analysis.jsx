import React, { useMemo } from "react";
import useShowShorten from "../hooks/query/useShowShorten";
import { Result, Button, Card, Form, DatePicker, Statistic, Popconfirm, Divider, QRCode, Space } from "antd";
import "./../../../App.css";
import { useNavigate, useParams } from "react-router";
import useGetAnalysis from "../hooks/query/useGetAnalysis";
import ChartComponent from "@components/ChartComponent";
import { array2Group, array2Object } from "@helper/array2Obj";
import useSearchQuery from "@hooks/useSearchQuery";
import { SearchOutlined, AimOutlined } from "@ant-design/icons";
import useDeleteShorten from "../hooks/mutate/useDeleteShorten";
import Paragraph from "antd/es/typography/Paragraph";
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LinkOutlined,
  SmileFilled,
} from "@ant-design/icons";
import CustomModal from "@components/CustomModal";
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
  const {mutate:deleteFn}= useDeleteShorten()
  const nav = useNavigate()
  const onDelete=()=>{
    deleteFn(data?.id,{
      onSuccess:()=>{
        nav("/")
      }
    });
  }
  const canDelete = !!window.localStorage.getItem("owner."+code)
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
            <Card  extra={canDelete && <Space> <CustomModal
          
              txtBtn="Get link"
        title={"Your link has been shorten"}
       
      >
        {() => {
          return (
            <div>
              <div className="flex justify-center">
                <div>
                  <div id="myqrcode">
                    <QRCode
                      value={`http://${window.location.host}/r/${data?.codeLink}`}
                      bgColor="#fff"
                      size={200}
                      style={{
                        marginTop: 16,
                        marginBottom: 16,
                      }}
                    />
                    <Button type="primary" >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
              <Divider>Or copy link</Divider>

              <Paragraph
                className="text-primary text-2xl font-semibold"
                copyable={{
                  icon: [
                    <SmileOutlined key="copy-icon" />,
                    <SmileFilled key="copied-icon" />,
                  ],
                  tooltips: ["click here", "you clicked!!"],
                }}
              >
                {`${window.location.host}/r/${data?.codeLink}`}
              </Paragraph>
            </div>
          );
        }}
      </CustomModal><Popconfirm onConfirm={()=>{
              onDelete()
            }} title="You sure? this will cannot undo."><Button type="primary" danger>Delete</Button></Popconfirm></Space>} bordered={false}>
              <Statistic
                title="Total Click"
                value={data?.countAccess || 0}
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
