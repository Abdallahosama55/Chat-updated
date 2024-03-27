import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import logo from "@/assets/logo.svg";
import logoutIcon from "@/assets/Images/navBar/logoutNav.png";
import myaccout from "@/assets/Images/control/octicon_feed-person-16.svg";
import plan from "@/assets/Images/control/solar_money-bag-bold.svg";
import resfresh from "@/assets/Images/navBar/shape.png";
import app from "@/assets/Images/control/ri_app-store-fill.svg";
import contact from "@/assets/Images/control/streamline_customer-support-1-solid.svg";
import signout from "@/assets/Images/control/humbleicons_logout.svg";
import { useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import TextWithSansSerifNumbers from '../../helpers/TextwithSensSierfNumber';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import ArrowIcon from "@/assets/icons/Arrow";
import avatar from "@/assets/Images/navBar/Avatar.png";
import HistoryArticleIcon from "@/Util/HistoryArticleIcon";
import { TbArrowDown, TbArrowDownBar, TbPointFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { themeColors } from "@/Util/theme";
import CustomButton from "../../components/atoms/Button";

const Navbar = ({ width = "97%" }) => {
  const [navDroplist, setNavDroplist] = useState(false);
  const [showUsage, setShowUsage] = useState(false);

  //renewalDate For Api
  const [renewalDate, setRenewalDate] = useState("2024-01-01");
  //user's Words For Api
  const [wordsCount, setWordsCount] = useState(850);
  const [wordsUsed, setWordsUsed] = useState(300);
  const widthProgress = (wordsUsed / wordsCount) * 100;

  //Logout Nav For Api
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initialValues = {
    search: "",
  };

  const validationSchema = Yup.object({
    search: Yup.string(),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission if needed
    // You can perform additional actions here
    setSubmitting(false);
  };
  const searchFunction = (searchTerm) => {
    // Perform search logic with the searchTerm
    console.log(`Searching for: ${searchTerm}`);
    // Replace the console.log with your actual search implementation
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/signin");
  };

  const goToPlan = () => {
    navigate("/myplan");
  };
  const goToAccount = () => {
    navigate("/myaccount");
  };

  return (
    <div
      dir="rtl"
      style={{ width: width }}

      className=" d-flex  pb-0 pt-0 .align-items-center align-items-center justify-content-between flex-row "
    >
      {/* <div className=" nav-input-container flex-grow-1 "></div> */}
      <div className=" d-flex p-0  align-items-center">
        <div className=" d-flex p-0 justify-content-center align-items-center">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            src={logo}
            className=" hover-of-link w-100 h-100 side-logo"
          />
 
        </div>
        {!(pathname.includes("control")) ? (
          <CustomButton onlyIcon  onClick={() => {
            navigate("/");
          }}>
          <ArrowIcon
            color={themeColors.colors.primary}
            width={15}
            className="me-4"
            height={15}
          />
        </CustomButton>
        ) : (
          ""
        )}

        <div>
          <div>
            {pathname.includes("create-article") ||
            pathname.includes("reformulate") ? (
              
               <div className="p-3">
               <HistoryArticleIcon  />
               </div>
             

            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className=" nav-icon-container position-relative  .align-items-center gap-2 d-flex bg-white px-2   flex-row">
        <div className="usage">
          <div className="text-basic ms-3 d-flex align-items-center position-relative">
            <div
              onClick={() => setShowUsage(!showUsage)}
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center"
            >
              {showUsage ? (
                <IoIosArrowDown
                  className="text-basic fw-medium"
                  style={{ color: "#5225ce" }}
                />
              ) : (
                <IoIosArrowUp
                  className="text-basic"
                  style={{ color: "#5225ce" }}
                />
              )}
              <span className="me-md-2 me-1 usage-title">الاستخدام</span>
              <TbPointFilled
                className="text-basic d-none d-sm-inline-block"
                style={{ color: "#5225ce" }}
              />
            </div>

            {showUsage && (
              <div className="d-flex flex-column position-absolute usage-list gap-3">
                <div className="all-words d-flex justify-content-between m">
                  <span> جميع الكلمات</span>
                  <span><TextWithSansSerifNumbers text="0 / 5000"/></span>
                </div>
                <div className="all-words d-flex justify-content-between ">
                  <span> تدقيق</span>
                  <span> <TextWithSansSerifNumbers text="0 / 2500"/></span>
                </div>
                <div className="all-words d-flex justify-content-between ">
                  <span> تصميم</span>
                  <span><TextWithSansSerifNumbers text="0 / 2500"/></span>
                </div>
                <div className="all-words d-flex justify-content-between ">
                  <span> <TextWithSansSerifNumbers text="GPT-4"/></span>
                  <span><TextWithSansSerifNumbers text="8 / 2500"/></span>
                </div>
              </div>
            )} 
          </div>
        </div>

        <button
          onClick={goToPlan}
          className="btn-upgrade  ms-3   rounded-3
        p-1 ps-4 pe-4"
        >
          ترقية
        </button>

        <button
          onClick={() => setNavDroplist(!navDroplist)}
          className="nav-icon "
        >
          <img className="nav-icon " src={avatar} />
        </button>
        {navDroplist && (
          <div className=" position-absolute  user-list">
            <div>
              <div className=" d-flex gap-2 pt-3 flex-column">
                <button className=" button-user-list d-flex  align-items-center  gap-1">
                  <img
                    onClick={goToAccount}
                    src={myaccout}
                    alt="myaccout"
                    className="  droplist-sub-icon"
                  />
                  <div className="droplist-subtext">حسابي</div>
                </button>
                <button
                  onClick={goToPlan}
                  className=" button-user-list align-items-center d-flex gap-1 "
                >
                  <img
                    src={plan}
                    alt="myaccout"
                    className="  droplist-sub-icon"
                  />
                  <div className="droplist-subtext">الخطط و الاشتراكات </div>
                </button>
                <button className=" button-user-list align-items-center d-flex gap-1 ">
                  <img
                    src={app}
                    alt="myaccout"
                    className="  droplist-sub-icon"
                  />
                  <div className="droplist-subtext">تحميل التطبيق </div>
                </button>
                <button className=" button-user-list align-items-center d-flex gap-1 ">
                  <img
                    src={contact}
                    alt="myaccout"
                    className="  droplist-sub-icon"
                  />
                  <div className="droplist-subtext"> التواصل مع الدعم</div>
                </button>
              </div>
              <div className="" />

              <button
                onClick={handleLogout}
                style={{
                  border: "none",
                  backgroundColor: "white",
                  outline: "none",
                }}
                className=" d-flex  pt-3  align-items-center gap-2"
              >
                <img
                  src={logoutIcon}
                  style={{ maxWidth: "20px", maxHeight: "20px" }}
                  alt="logOut"
                />
                <div
                  style={{
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: "600",
                  }}
                >
                  تسجيل الخروج
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
