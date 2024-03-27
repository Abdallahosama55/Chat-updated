import React, { useEffect, useState } from "react";

import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { Outlet, useLocation } from "react-router-dom";

import "./AppLayoutmot.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import openSideIcon from "@/assets/logo.png";
import HistoryArticles from "@/Util/HistoryArticles";

const AppLayoutmot = ({ chats, setChats, showChat, setShowChat }) => {
  const [openSideBar, setOpenSideBar] = useState(true);

  //Change between Chat and Main SideBar
  // const [sideBar, setSideBar] = useState(true);

  //Change between TwoChats
  const [switchSideBar, setSwitchSideBar] = useState(true);

  const [selectedSection, setSelectedSection] = useState("");

  //close when screen is mobile
  const [sideBar, setSideBar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setOpenSideBar(window.innerWidth > 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { pathname } = useLocation();

  return (
    <div className="    w-100 applayout">
      <div className={`    position-relative h-100  w-100   `}>
        <MdOutlineArrowForwardIos
          src={openSideIcon}
          style={
            !openSideBar
              ? {
                  rotate: "180deg",
                  transitionDuration: "500ms",
                }
              : { transitionDuration: "500ms" }
          }
          onClick={() => setOpenSideBar(!openSideBar)}
          alt=" OpenIcon"
          className=" position-absolute z-3   d-lg-none  openSideBarIcon "
        />
        <div style={{ height: "60px" }}>
          <header className=" h-100 border-bottom  headerLayout">
          <Navbar width="97%" />


            {/* <NavCArticle /> */}
            {/* {pathname.includes("create-article") && <NavCArticle />} */}
          </header>
        </div>
        <div className=" d-flex">
          <main className=" flex-grow-1">
            <Outlet />
          </main>
          <div
            dir="rtl"
            className={`${
              openSideBar ? " media-close-sidebar " : " closeSideBar  "
            }`}>
            <Sidebar
              setOpenSideBar={setOpenSideBar}
              openSideBar={openSideBar}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
            {pathname.includes("create-article") ||
            pathname.includes("reformulate") ? (
              <HistoryArticles />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayoutmot;
