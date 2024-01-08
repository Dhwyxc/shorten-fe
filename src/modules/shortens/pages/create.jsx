import React from "react";
import ShortenFormCreateInline from "../components/Form/inline";
import useCreateShorten from "../hooks/mutate/useCreateShorten";
import { Alert, message } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const CreateShortLink = () => {
  const { mutate: fnCreate, data } = useCreateShorten();
  const handleCreate = (v) => {
    fnCreate(v, {
      onSuccess: () => {
        message.success("Done!");
      },
    });
  };
  return (
    <div>
      Insert Landing Page Here
      <h2>d</h2>
      <div className="grid grid-cols-3">
        <div>
          <ShortenFormCreateInline onFinish={handleCreate} />
          {data && (
            <Alert
              message={
                <Paragraph
                  copyable={{
                    text: `${window.location.host}/r/${data?.codeLink}`,
                  }}
                >
                  Link `{data?.originalLink}` have been shorten
                </Paragraph>
              }
            ></Alert>
          )}
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default CreateShortLink;
