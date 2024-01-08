import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";

const ShortenFormCreateInline = ({
  loading,
  onFinish,
  initialValues,
  okText = "Tạo",
}) => {
  const [form] = Form.useForm();

  const _onFinish = (values) => {
    onFinish(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Form onFinishFailed:", errorInfo);
  };
  return (
    <Form
      disabled={loading}
      form={form}
      labelCol={{ span: 6 }}
      // wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      autoComplete="off"
      onFinish={_onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name={"CodeLink"}>
        <Input placeholder="Nhập shortlink code" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            message: "Vui lòng nhập",
            required: true,
          },
        ]}
        name={"OriginalLink"}
      >
        <Input placeholder="Nhập link cần rút gọn" />
      </Form.Item>
      <div className="flex justify-center">
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {okText}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ShortenFormCreateInline;
