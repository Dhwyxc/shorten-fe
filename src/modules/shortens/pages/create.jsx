import React, { useRef } from "react";
import ShortenFormCreateInline from "../components/Form/inline";
import useCreateShorten from "../hooks/mutate/useCreateShorten";
import { Alert, message, QRCode, Button, Divider, Form } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import "./../../../App.css";
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
const CreateShortLink = () => {
  const { mutate: fnCreate, data, isLoading, error } = useCreateShorten();
  const [form] = Form.useForm();
  const handleCreate = (v) => {
    fnCreate(v, {
      onSuccess: () => {
        message.success("Done!");
        refModal.current?.open();
      },
    });
  };
  const downloadQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  const refInput = useRef();
  const refModal = useRef();
  return (
    <div className="px-6 py-2">
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <h1 class="mb-3 text-4xl font-bold leading-snug text-dark sm:text-[42px] lg:text-[40px] xl:text-[42px] dark:text-white">
              Welcome to our Link Shortener
            </h1>
            <p class="mb-8 max-w-[480px] text-base dark:text-dark-6 text-body-color">
              Customize links and detailed statistics of visits, automatically
              check links daily. Helps you control your links more effectively.
              Paste the URL to be shortened!
            </p>
            <Button
              onClick={() => refInput.current?.focus()}
              icon={<LinkOutlined />}
              type="primary"
              size="large"
            >
              Shortened Now
            </Button>
          </div>
        </div>
        <div className="rounded-tl-3xl rounded-br-3xl">
          <img
            className="object-cover w-full"
            alt=""
            src="https://sagemailer.com/blog/wp-content/uploads/2021/10/202004261739572590.jpeg"
          />
        </div>
      </div>
      <CustomModal
        onClose={() => form.resetFields()}
        noButton
        title={"Your link has been shorten"}
        ref={refModal}
      >
        {() => {
          return (
            <div>
              <div className="flex justify-center">
                <div>
                  <div id="myqrcode">
                    <QRCode
                      value={`${window.location.host}/r/${data?.codeLink}`}
                      bgColor="#fff"
                      size={200}
                      style={{
                        marginTop: 16,
                        marginBottom: 16,
                      }}
                    />
                    <Button type="primary" onClick={downloadQRCode}>
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
      </CustomModal>
      <div className="grid grid-cols-3">
        <div className="">
          {error && (
            <Alert
              type="error"
              className="my-1"
              message={error?.response?.data}
            ></Alert>
          )}
          <ShortenFormCreateInline
            form={form}
            loading={isLoading}
            ref={refInput}
            onFinish={handleCreate}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateShortLink;
