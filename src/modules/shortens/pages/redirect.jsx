import React, { useCallback, useEffect, useState } from "react";
import ShortenFormCreateInline from "../components/Form/inline";
import useCreateShorten from "../hooks/mutate/useCreateShorten";
import { Alert, Button, Result, message, Input } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import useShowShorten from "../hooks/query/useShowShorten";
import { useParams } from "react-router";
import useGetIpInfo from "../hooks/query/useGetIPInfo";
import useCollectIpInfo from "../hooks/mutate/useCollectIpInfo";

const RedirectShortLink = () => {
  const { code } = useParams();
  const { mutate: fnCreate, data, isLoading, isError } = useShowShorten(code);
  const { mutateAsync: collectInfo } = useCollectIpInfo(data?.id);
  const [countdown, setCountdown] = useState(10);
  const [password, setPassword] = useState("");
  const { data: info } = useGetIpInfo();
  const collectFn = useCallback(async () => {
    const k = "clicked." + code;
    if (!window.sessionStorage.getItem(k)) {
      window.sessionStorage.setItem(k, "ok");
      await collectInfo(info);
    }
  }, [collectInfo, info, code]);

  const handleSubmit = async () => {
    // Kiểm tra mật khẩu
    if (password == data?.password) {
      message.success("Go go go!");
      await collectFn();
      window.location.href = data?.originalLink;
    } else {
      message.error("Wrong Password!");
    }
  };
  useEffect(() => {
    if (!data?.password) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      // Redirect after 10 seconds
      const redirectTimeout = setTimeout(async () => {
        if (data) {
          await collectFn();
          window.location.href = data?.originalLink;
        } else {
          window.location.href = "/";
        }
      }, 10000);
      // Clear intervals and timeouts on component unmount
      return () => {
        clearInterval(countdownInterval);
        clearTimeout(redirectTimeout);
      };
    }
  }, [collectFn, data]);
  const handleClickLink = async () => {
    await collectFn();
    window.location.href = data?.originalLink;
  };
  return (
    <div>
      <div className="flex justify-center">
        <div>
          {!isError &&
            (!data?.password ? (
              <Result
                status="info"
                title={`Bạn sẽ được chuyển hướng sau ${countdown} giây!`}
                subTitle={
                  data?.status === 404 ? (
                    <span className="text-red-500">
                      Đích đến có thể [404 Not Found]
                    </span>
                  ) : (
                    ""
                  )
                }
                extra={[
                  <Button
                    onClick={handleClickLink}
                    type="primary"
                    key="console"
                  >
                    Go
                  </Button>,
                ]}
              />
            ) : (
              <Result
                status="info"
                title={`Vui lòng nhập mật khẩu để chuyển tiếp!`}
                extra={[
                  <>
                    <Input.Password
                      className="mb-5"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleSubmit} type="primary">
                      Go
                    </Button>
                  </>,
                ]}
              />
            ))}

          {isError && (
            <Result
              status="404"
              title={`Không tìm thấy link này, về lại trang chủ sau ${countdown} giây`}
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
        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default RedirectShortLink;
