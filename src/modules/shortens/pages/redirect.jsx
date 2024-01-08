import React from "react";
import ShortenFormCreateInline from "../components/Form/inline";
import useCreateShorten from "../hooks/mutate/useCreateShorten";
import { Alert, Button, Result, message } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import useShowShorten from "../hooks/query/useShowShorten";
import { useParams } from "react-router";

const RedirectShortLink = () => {
  const { code } = useParams();
  const { mutate: fnCreate, data, isLoading, isError } = useShowShorten(code);

  return (
    <div>
      <div className="flex justify-center">
        <div>
          {data && (
            <Result
              status="info"
              title="Bạn sẽ được chuyển hướng sau 3s!"
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
                  onClick={() => (window.location.href = data?.originalLink)}
                  type="primary"
                  key="console"
                >
                  Go
                </Button>,
              ]}
            />
          )}

          {isError && (
            <Result
              status="404"
              title="Không tìm thấy link này, vui lòng thử lại"
              //   subTitle={`Đích đến : ${data?.originalLink}`}
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
