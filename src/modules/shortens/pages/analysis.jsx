import React from "react";
import ShortenFormCreateInline from "../components/Form/inline";
import useCreateShorten from "../hooks/mutate/useCreateShorten";
import useShowShorten from "../hooks/query/useShowShorten";
import { Alert, message, Result, Button} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import "./../../../App.css"
import { useNavigate } from "react-router-dom/dist";
import { useParams } from "react-router";
import Link from "antd/es/typography/Link";

const AnalysisShortLink = () => {
  const { code } = useParams();
  const { data, isLoading, isError } = useShowShorten(code);
  return (
    <div>
        {data &&(
        <span className="font-actor">
        <h1 className="font-actor">Link Shorten Analysis</h1>
        <h2 className="font-actor">Shorten Link: <b className="text-sky-900 font-actor">{window.location.host}/r/{data?.codeLink}</b></h2>
        <h2 className="font-actor">Original Link: <b className="text-sky-900 font-actor">{data?.originalLink}</b></h2>
        <h2 className="font-actor">Password: {data?.password == 0 ? "No Password" : data?.password}</h2>
        <h2 className="font-actor">Status: {data?.status == 0 ? 200 : data?.status}</h2>
        </span>
        )||(
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
