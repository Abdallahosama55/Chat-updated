import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { Spinner } from "react-bootstrap";
import { useOnClickOutside } from "usehooks-ts";
import ReformulatePanel from "@/components/organisms/Reformulate/ReformulatePanel";
import MultiOptionDropDown from "@/components/molecules/MultiOptionDropDown";
import ArrowIcon from "@/assets/icons/Arrow";
import { BREAKPOINTS } from "@/helpers/constants";
import { RiFileList2Line } from "react-icons/ri";
import "./Reformulate.css";
import { useBreakpoint } from "use-breakpoint";
import CustomButton from "@/components/atoms/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PiPencilSimpleLine } from "react-icons/pi";
import { exportToFile } from "@/helpers/exportToFile";
import { useDispatch, useSelector } from "react-redux";
import { postData, postRephrase } from "@/redux/slices/apiSlice";
import axios from "axios";
import { baseURL } from "@/redux/api/url";
import toast from "react-hot-toast";
import pin from "@/assets/Images/reformulate/shape.png";
import file from "@/assets/Images/reformulate/fluent_textbox-16-regular.png";

import uploadImage from "@/assets/Images/reformulate/Frame 1171276471.png";
import { IoIosArrowDown } from "react-icons/io";

const Reformulate = () => {
  //Lang. DropList
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("العربية");
  const dropdownRef = useRef(null);
  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  //Lang. List as  PDF
  const langList = [
    "العربية",
    "العامية المصرية",
    "الإنجليزية",
    "الفرنسية",
    "الإسبانية",
    "الألمانية",
    "الصينية",
    "اليابانية",
    "الكورية",
    "الروسية",
    "البرتغالية",
    "الإيطالية",
    "التركية",
    "الهولندية",
    "السويدية",
    "الدنماركية",
    "النرويجية",
    "الفنلندية",
    "البولندية",
    "التشيكية",
    "المجرية",
    "الرومانية",
    "اليونانية",
    "البلغارية",
    "الصربية",
    "الكرواتية",
    "السلوفينية",
    "الأوكرانية",
    "البيلاروسية",
    "الكازاخية",
    "الأوزبكية",
    "التركمانية",
    "الطاجيكية",
    "المنغولية",
  ];

  //Close Lang. DropList
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  //Editor Content
  const [editorData, setEditorData] = useState("");
  const rephraseDispatch = useDispatch();
  const { loading } = useSelector((state) => state.api.rephrasePost);
  const token = localStorage.getItem("token");

  //ProgressBar
  const [bar, setbar] = useState(0);

  //Generate Rephrase
  const handleRephrase = async () => {
    //Check Content
    if (editorData === "") return toast.error("لا يوجد محتوي لصياغته");
    setbar(Math.floor(Math.random() * (5 - 1 + 1)) + 1);

    //Generate Id
    try {
      const resId = await axios.post(
        `${baseURL}v1/text-rephrase/texts/`,
        { prompt: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          //Set Progress Limit
          onUploadProgress: () => {
            setbar(Math.floor(Math.random() * (25 - 15 + 1)) + 15);
          },
        }
      );
      const response = resId.data;
      setbar(Math.floor(Math.random() * (30 - 26 + 1)) + 26);
      //When transform to ID change it !
      const id = response.unique_id;
      await rephraseDispatch(
        postRephrase({
          endpoint: `v1/text-rephrase/create/${id}/`,
          data: editorData,
          setbar,
        })
      );
      setbar(100);
    } catch (error) {
      setbar(0);
    }
  };

  return (
    <div
      className=" flex-grow-1  mt-3 "
      dir="rtl">
      <div></div>
      <div
        style={{ height: "80vh" }}
        className=" overflow-y-auto row mt-2 px-5">
        {/* First  Editor*/}

        <div className=" col-12  col-lg-6 px-2 pt-3    p-0">
          {" "}
          {/* header */}
          <div className=" h-100   contianer-editor pt-3    p-0">
            <div className="px-3 pb-3  d-flex justify-content-between align-items-center">
              <div
                ref={dropdownRef}
                className=" d-flex gap-3 align-items-center">
                <button
                  onClick={handleRephrase}
                  className="generat-button">
                  {loading ? "جاري الصياغة" : "إعادة الصياغة"}
                </button>
                <button
                  className="position-relative droplist-lang"
                  onClick={toggleList}>
                  {lang}
                  {isOpen && (
                    <div
                      key={lang}
                      className="position-absolute droplist-lang-lang">
                      {langList.map((lang) => (
                        <div
                          key={lang}
                          onClick={() => setLang(lang)}
                          className="lang">
                          {lang}
                        </div>
                      ))}
                    </div>
                  )}
                  <IoIosArrowDown />
                </button>
              </div>
              <div>
                <img
                  src={file}
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </div>

            {/* Editor */}
            <div>
              <ReformulatePanel setEditorData={setEditorData} />
            </div>
          </div>
        </div>

        {/* Second Editor */}

        <div
          style={{ height: "80vh" }}
          className=" col-12 col-lg-6  px-2 pt-3    p-0">
          {" "}
          {/* Header */}
          <div className="   h-100 contianer-editor pt-3    p-0">
            <div className="px-3 pb-3  d-flex justify-content-start align-items-center">
              <div>
                {bar === 0 || bar === 100 ? (
                  <img
                    src={pin}
                    style={{ width: "14px", height: "14px" }}
                  />
                ) : (
                  <img
                    src={uploadImage}
                    style={{ maxWidth: "25px" }}
                  />
                )}
              </div>
              {bar !== 0 && (
                <>
                  {" "}
                  <div className=" progresNumber px-3">
                    {bar < 10 ? `0${bar}` : bar}%
                  </div>
                  <div className=" progressas position-relative">
                    <div
                      className="  progressasbar  position-absolute z-3 h-100 "
                      style={{
                        width: `${bar}%`,
                        backgroundColor: bar === 100 ? "#5cb85c" : "#5225CE",
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Editor */}
            <div>
              <ReformulatePanel noGenerate="no" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reformulate;
