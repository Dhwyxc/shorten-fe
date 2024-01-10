import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { nanoid } from "nanoid";

const ShortenFormCreateInline = ({
  loading,
  onFinish,
  initialValues,
  okText = "Create",
}) => {
  const [form] = Form.useForm();
  const [showCodeLink, setShowCodeLink] = useState(false);

  const toggleCodeLink = () => {
    setShowCodeLink(!showCodeLink);
  };

  const _onFinish = (values) => {
    if (!values.CodeLink) {
      values.CodeLink = nanoid(6);
    }
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
      initialValues={initialValues}
      autoComplete="off"
      onFinish={_onFinish}
      onFinishFailed={onFinishFailed}
    >
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
      
      <Form.Item>
        <Checkbox onChange={toggleCodeLink}>Advanced Options</Checkbox>
      </Form.Item>

      {showCodeLink && (
        <>
        <Form.Item name={"CodeLink"}>
          <Input placeholder="Nhập Shorten Link code" />
        </Form.Item>
          <Form.Item name={"Password"}>
          <Input.Password placeholder="Nhập Password" />
        </Form.Item>
        </>
      )}

      <div className="flex justify-center">
        <Form.Item>
          <Button
            type="primary"
            className="w-32"
            htmlType="submit"
            loading={loading}
          >
            {okText}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ShortenFormCreateInline;