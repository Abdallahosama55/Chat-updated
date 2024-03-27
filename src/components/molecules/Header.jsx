import { Image, Navbar, Stack } from "react-bootstrap";
import CustomButton from "./../atoms/Button";
import ArrowIcon from "@/assets/icons/Arrow";
import logo from "@/assets/logo.svg";
import { themeColors } from "@/Util/theme";
import HistoryIcon from "@/assets/icons/History";
import contact from "@/assets/Images/control/streamline_customer-support-1-solid.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BREAKPOINTS, actionsTypes } from "@/helpers/constants";
import MenuIcon from "@/assets/icons/Menu";
import { TbArrowDown, TbArrowDownBar, TbPointFilled } from "react-icons/tb";
import { useBreakpoint } from "use-breakpoint";
import { useRef, useState } from "react";
import MultiOptionDropDown from "./MultiOptionDropDown";
import { useOnClickOutside } from "usehooks-ts";
import { setTitle, updateDocument } from "@/redux/features/api/apiSlice";
import { exportToFile } from "@/helpers/exportToFile";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import avatar from "@/assets/Images/navBar/Avatar.png";
import logoutIcon from "@/assets/Images/navBar/logoutNav.png";
import myaccout from "@/assets/Images/control/octicon_feed-person-16.svg";
import plan from "@/assets/Images/control/solar_money-bag-bold.svg";
import app from "@/assets/Images/control/ri_app-store-fill.svg";
const Header = () => {
  const dispatch = useAppDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [exportDropDown, setExportDropDown] = useState(false);
  const [optionsDropDown, setOptionsDropDown] = useState(false);
  const [dropDownHeader, setDropDownHeader] = useState(false);
  const ref = useRef(null);
  const refOptions = useRef(null);
  const checker = useAppSelector((state) => state.checker);
  const handleClickOutside = () => {
    setExportDropDown(false);
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useOnClickOutside(ref, handleClickOutside);
  useOnClickOutside(refOptions, () => setOptionsDropDown(false));
  const [dropDownProfile, setDropDownProfile] = useState(false);

  //Navigate
  const goToPlan = () => {
    navigate("/myplan");
  };
  const goToAccount = () => {
    navigate("/myaccount");
  };

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/signin");
  };

  const [showUsage, setShowUsage] = useState(false);
  const [navDroplist, setNavDroplist] = useState(false);
  return (
    <Navbar className="border-bottom  bg-transparent py-2 pb-2 px-4 position-relative">
      <Stack direction="horizontal" className="justify-content-between w-100">
        <Stack
          className="justify-content-end text-end align-items-center"
          direction="horizontal"
          gap={3}
        >
          <div className=" d-flex gap-2  align-items-center">
            <div className=" d-flex justify-content-center align-items-center">
              <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                }}
                src={logo}
                className=" hover-of-link w-100 h-100 side-logo"
              />
            </div>
            <div>
              <div>
                {pathname.includes("create-article") ||
                pathname.includes("reformulate") ? (
                  <HistoryArticleIcon />
                ) : (
                  ""
                )}
                
                {pathname.includes("content-section") ||
                pathname.includes("add-ads") ? (
                  <CustomButton
                    onlyIcon
                    onClick={() =>
                      dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
                    }
                  >
                    <HistoryArticleIcon width={20} height={20} />
                  </CustomButton>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {isBelowDesktop  && (
            <>
              <CustomButton onlyIcon>
                <ArrowIcon
                  color={themeColors.colors.primary}
                  width={15}
                  height={15}
                />
              </CustomButton>
              <CustomButton
                onlyIcon
                onClick={() =>
                  dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
                }
              >
                <HistoryIcon width={20} height={20} />
              </CustomButton>

              <Stack className="align-items-center justify-content-center ">
                

                <input
                  type="text"
                  style={{ width: "150px" }}
                  className="text-primary fw-medium border-0 outline-0"
                  value={checker.title}
                  placeholder="أكتب اسم للملف"
                  onChange={(e) => {
                    dispatch(setTitle(e.target.value));
                    dispatch(
                      updateDocument({
                        title: e.target.value,
                        isEditor: pathname.includes("/editor"),
                        content: checker.content,
                      })
                    );
                  }}
                />
              </Stack>
            </>
          )}
          {!isBelowDesktop  && (
            <>
              <CustomButton onlyIcon>
                <ArrowIcon
                  color={themeColors.colors.primary}
                  width={15}
                  height={15}
                />
              </CustomButton>
              <CustomButton
                onlyIcon
                onClick={() =>
                  dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
                }
              >
                <HistoryIcon width={20} height={20} />
              </CustomButton>

              <Stack className="align-items-center justify-content-center ">
                

                <input
                  type="text"
                  style={{ width: "150px" }}
                  className="text-primary fw-medium border-0 outline-0"
                  value={checker.title}
                  placeholder="أكتب اسم للملف"
                  onChange={(e) => {
                    dispatch(setTitle(e.target.value));
                    dispatch(
                      updateDocument({
                        title: e.target.value,
                        isEditor: pathname.includes("/editor"),
                        content: checker.content,
                      })
                    );
                  }}
                />
              </Stack>
            </>
          )}
        </Stack>
        {isBelowDesktop ? (
          <Stack direction="horizontal">
       
            <CustomButton onlyIcon className="position-relative z-3">
              <div>
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
                          <div className="droplist-subtext">
                            الخطط و الاشتراكات{" "}
                          </div>
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
                          <div className="droplist-subtext">
                            {" "}
                            التواصل مع الدعم
                          </div>
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
              {dropDownProfile && (
                <MultiOptionDropDown
                  options={[
                    {
                      value: "حسابي",
                      className: "border border-primary px-3 py-3",
                    },
                    {
                      value: `${checker.text.split(" ").length - 1}/2500 متبقي`,
                      className: "border border-primary px-3 py-3",
                    },
                  ]}
                  dropDownAction={(value) => {
                    exportToFile(checker.content, value);
                    setDropDownProfile(false);
                  }}
                />
              )}
            </CustomButton>
          
            
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={4} ref={ref}>
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
                        <span>0 / 5000</span>
                      </div>
                      <div className="all-words d-flex justify-content-between ">
                        <span> تدقيق</span>
                        <span>0 / 2500</span>
                      </div>
                      <div className="all-words d-flex justify-content-between ">
                        <span> تصميم</span>
                        <span>0 / 5000</span>
                      </div>
                      <div className="all-words d-flex justify-content-between ">
                        <span>GPT-4</span>
                        <span>8 / 5000</span>
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
                        <div className="droplist-subtext">
                          الخطط و الاشتراكات{" "}
                        </div>
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
                        <div className="droplist-subtext">
                          {" "}
                          التواصل مع الدعم
                        </div>
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
          </Stack>
        )}
      </Stack>
      <Stack
        className="position-absolute top-100  bg-light w-100  z-3 "
        style={{
          transform: dropDownHeader ? "translateY(0)" : "translateX(125%)",
          display: dropDownHeader ? "block" : "none",
        }}
      >
        <>
          <div className="border-bottom p-2 px-3">
            <CustomButton
              onlyIcon
              onClick={() =>
                dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL })
              }
            ></CustomButton>
          </div>

      
        
          <div className="border-bottom p-2 px-3">
            <Stack className="justify-content-center fs-3 fw-medium text-primary ">
              <input
                type="text"
                className="text-primary fw-medium border-0 outline-0"
                value={checker.title}
                placeholder="أكتب اسم للملف"
                onChange={(e) => {
                  dispatch(setTitle(e.target.value));
                  dispatch(
                    updateDocument({
                      title: e.target.value,
                      isEditor: pathname.includes("/editor"),
                      content: checker.content,
                    })
                  );
                }}
              />
            </Stack>
          </div>
        </>
      </Stack>
    </Navbar>
  );
};

export default Header;
