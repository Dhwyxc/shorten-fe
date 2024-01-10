import React from "react";
import ShortenFormCreateInline from "../components/Form/inline";
import useCreateShorten from "../hooks/mutate/useCreateShorten";
import { Alert, message, QRCode, Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import "./../../../App.css"
import { useNavigate } from "react-router-dom/dist";
const CreateShortLink = () => {
  const { mutate: fnCreate, data } = useCreateShorten();

  const handleCreate = (v) => {
    fnCreate(v, {
      onSuccess: () => {
        message.success("Done!");
      },
    });
  };
  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  return (
    <>
      <div className="glass-container mt-2">
      <div className="landing-page-container p-40 pl-80 pr-80">
        <div className="landing-page-header text-center">
          <h1 className="font-actor">Welcome to our Link Shortener</h1>
          <h2 className="font-actor">Paste the URL to be shortened!</h2>
        </div>
        <div className="landing-page-content">
          <ShortenFormCreateInline onFinish={handleCreate} />
          {data && (
            <>
            <h2 className="text-center font-actor">Your link has been shorten</h2>
            <Alert
              className="shortened-link-alert"
              message={
                <Paragraph
                  copyable={{
                    text: `${window.location.host}/r/${data?.codeLink}`,
                  }}
                >
                  <h4 className="text-center font-actor">{window.location.host}/r/{data?.codeLink}</h4>
                 
                </Paragraph>
              }
            >
           
            </Alert>
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
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateShortLink;
