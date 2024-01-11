import { Button, Checkbox, Form, Input } from "antd";
import React, { forwardRef, useState } from "react";
import { nanoid } from "nanoid";

const ShortenFormCreateInline = (
  { loading, onFinish, initialValues, okText = "Create", form },
  ref
) => {
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
            message: "Require",
            required: true,
          },
          {
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }
              try {
                new URL(value);
                return Promise.resolve();
              } catch (error) {}
              return Promise.reject(new Error("Url is valid"));
            },
          },
        ]}
        name={"OriginalLink"}
      >
        <Input ref={ref} placeholder="Original link" />
      </Form.Item>

      <Form.Item>
        <Checkbox onChange={toggleCodeLink}>Advanced Options</Checkbox>
      </Form.Item>

      {showCodeLink && (
        <>
          <Form.Item
            rules={[
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.resolve();
                  }
                  let res = /^[a-zA-Z]+$/.test(value);
                  if (res) return Promise.resolve();

                  return Promise.reject(
                    new Error("code only english letters allowed")
                  );
                },
              },
            ]}
            name={"CodeLink"}
          >
            <Input placeholder="Custom code" />
          </Form.Item>
          <Form.Item name={"Password"}>
            <Input.Password placeholder="Enter Password" />
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

export default forwardRef(ShortenFormCreateInline);
