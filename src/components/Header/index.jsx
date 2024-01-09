/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import useGetProfile from "@modules/auth/hooks/useGetProfile";
import { useAppSelector } from "@hooks/reduxHook";
import useLogout from "@modules/auth/hooks/useLogout";
import { Button, Dropdown, Input, Space, version } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMatch, useParams } from "react-router";
import logo from "@assets/logo.jpg";
import useShowProject from "@modules/projects/hooks/query/useShowProject";
import { useNavigate } from "react-router-dom/dist";

const Header = () => {
  const { data: u } = useGetProfile();
  const user = useAppSelector((s) => s?.auth?.user);
  const { mutate: logout } = useLogout();
  const match = useMatch("/projects/:projectId/*");
  const projectId = match?.params?.projectId;

  const [code, setCode] = useState("");
  const nav = useNavigate()
  const handleSubmit = () => {
    console.log(code);
    nav(`analysis/${code}`)
    setCode('');
  };
  const items = [
    user?.type === "SUPER_ADMIN"
      ? {
          key: "2",
          label: <Link to={"/projects"}>Dự án</Link>,
        }
      : null,
    user?.type === "QC"
      ? {
          key: "3",
          label: (
            <Link to={`/project-submit/${user?.projectId}`}>Đổi địa điểm</Link>
          ),
        }
      : null,
    {
      key: "1",
      label: (
        <div className="text-red-400" aria-hidden type="text" onClick={logout}>
          Đăng xuất
        </div>
      ),
    },
  ].filter((e) => !!e);
  console.log({ items });
  // const { data: project } = useShowProject(projectId);
  return (
    <header className="">
      <nav class="bg-slate-300 border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center">
          <Link to={"/"} class="flex items-center">
            <img
              src={
                "https://cdn6.aptoide.com/imgs/b/9/c/b9cac9b36d84fbb1c2159b14c3175e72_icon.png"
              }
              class="mr-3 h-12 sm:h-12"
              alt="Logo"
            />
            <span class="font-actor text-[#135dac] text-4xl font-bold dark:text-white">
            HNV Link Shortener
            </span>
          </Link>
            <div className="text-xl font-bold uppercase text-[#135dac]  flex-shrink lg:w-[500px]">
              <span className="font-actor">Explore Shorten Code</span>
              <Input.Search
            className="mr-5"
            value={code}
            placeholder="Nhập code"
            onChange={(e) => setCode(e.target.value)}
            onSearch={handleSubmit}

          />
            </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
