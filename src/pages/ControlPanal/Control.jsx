import React, { useState } from "react";
import "./Control.css";
import curve from "@/assets/Images/dashboredCards/curve.png";
import TableC from "./Table";
import CallMadeIcon from "@mui/icons-material/CallMade";
import haverimg1 from "@/assets/Images/control/chat 1.svg";
import haverimg2 from "@/assets/Images/control/articles_7195421 1.svg";
import haverimg3 from "@/assets/Images/control/content_9743163 1.svg";
import haverimg4 from "@/assets/Images/control/vision_10650701 1.svg";
import article from "@/assets/Images/control/content-writing 1.svg";
import shopping from "@/assets/Images/control/products 1.svg";
import annoucement from "@/assets/Images/control/Idea.svg";
import fluent from "@/assets/Images/control/youtube (1) 1.svg";
import homeicon from "@/assets/Images/control/website 1.svg";
import facebook from "@/assets/Images/control/bi_facebook.svg";
import TextWithSansSerifNumbers from '@/helpers/TextwithSensSierfNumber';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
export default function Control() {
  const navigate = useNavigate(); 
  
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [showMore, setShowMore] = useState(false);

  const HandleShow = () => {
    if (showMore == true) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };
  const items = [
    {
      title: "أفكار المقالات",
      description:
        " أفكارًا جديدة ومبتكرة باستخدام أداتنا لتوليد أفكار مقالات متنوعة",
      icon: article, // Add the icon name here
      path:"/myaccount"
      
    },
    {
      title: "وصف المنتج ",
      description:
        " اكتب وصفا  جذابا للمنتج باستخدام أداتنا لكتابة معلومات شاملة ",
      icon: shopping, // Add the icon name here
    },
    {
      title: " أفكار إعلانية",
      description:
        " أفكاراً إعلانية مبتكرة بواسطة أداتنا، لضمان جاذبية أعلى لإعلاناتك",
      icon: annoucement, // Add the icon name here
    },
    {
      title: " سكريبت فيديو يوتيوب",
      description: " كتابة سكريبت يوتيوب يساعد في توصيل رسالتك بشكل فعال",
      icon: fluent, // Add the icon name here
    },
    {
      title: " وصف العقارات",
      description: "إنشاء وصف شامل وجذاب للعقارات   لجذب انتباه المهتمين     ",
      icon: homeicon, // Add the icon name here
    },
    {
      title: "منشورات فيسبوك ",
      description: "زود صفحتك على فيسبوك بمحتوى متنوع  يجذب الانتباه والتفاعل",
      icon: facebook, // Add the icon name here
    },
  ];

  const cardData = [
    {
      id: 1,
      number: "55",
      text: " أحصل على إجابات فورية ودقيقة على أسئلتك، واستمتع بتفاعل متقدم مع متقن شات.  ",
      title: "ابدا محادثة جديدة",
      src: haverimg1,
      path:"/chat"
    },
    {
      id: 2,
      number: "12",
      text: "       اكتب محتوى بشكل احترافي، ولتحسين SEO حيث يكتب مُتقِن محتوى ذكي يلبي احتياجاتك.",
      title: "كتابة مقال احترافي",
      src: haverimg2,
      path:"/create-article"
    },
    {
      id: 3,
      number: "24",
      text: "أنشئ أكثر من 80 نوعًا من نماذج المحتوى المختلفة الذي يلبي احتياجات الجمهور المستهدف. ",
      title: "  نماذج محتوى متنوعة",
      src: haverimg3,
      path:"/content-section"
    },
    {
      id: 4,
      number: "08",
      text: "يقوم متقن بفحص نصوصك بدقة، يصحح الأخطاء الإملائية والنحوية، ويضمن لك دقة لغوية عالية.",
      title: "تدقيق لغوي ذكي ",
      src: haverimg4,
      path:"/detector"
    },
  ];
  return (
    <section className="Control  ">
      <div className="container-fluid p-0 m-0">
        <div className=" p-0  mx-auto">
          <div
            dir="rtl"
            className=" controlHeight overflow-y-scroll   pt-2 pb-2 ">
            <div
              dir="ltr"
              className="containerC">
              <div
                className="welcome  rounded-4  pt-3 pb-3   p-4"
                dir="rtl">
                <h3 className=" font-bold fw-bolder font-basic ">
                  مَرحباً مصطفي
                </h3>
                <p className="welcome-p  breif-title mt-2 font-basic pb-0">
                  مجموعة الأدوات الأكثر تطورا في كتابة المحتوى متوفرة هنا
                </p>
                <div className="row justify-content-between pb-0">
                  {cardData.map((item, index) => (
                  
                    <div
                    
                      className="pb-0  overflow-y-hidden col-xl-3 p-xl-2 p-xxl-2 p-md-2 p-lg-2 p-1 col-lg-6 col-md-6 col-sm-12 col-12"
                      key={item.id}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}>
                      <Link to={item.path} key={item.id} className=" text-decoration-none"> 
                
                      <div
                        className={`position-relative img${item.number}  cards text-center py-4 mt-0 d-flex flex-column justify-content-between `}>
                        <div className="thired">fdfdfsd</div>
                        <div
                          className={
                            index === hoveredIndex
                              ? // ? "   d-none"
                                " opacity-0 "
                              : "first d-block  mt-md-5"
                          }>
                          <img
                            src={item.src}
                            height={75}
                            width={75}
                          />
                          <h4
                            className={`${
                              index === hoveredIndex
                                ? // ? "   d-none"
                                  " d-none "
                                : "py-md-5 mt-4 mt-md-0"
                            } `}>
                            {item.title}
                          </h4>
                        </div>
                        <div
                          className={
                            index === hoveredIndex
                              ? "position-absolute py-5 mb-5 secand bg-transparent  active"
                              : "position-absolute  bg-transparent py-5 mb-5 secand"
                          }>
                          <h4>{item.title}</h4>
                          <p className="font-light p-welcome-text py-md-5 py-3">
                       
                                     
                          <TextWithSansSerifNumbers text={item.text} />
                          </p>
                        </div> 

<div className="thired">



</div>

                      </div>
                      </Link>
                    </div>
                   
                  ))}
                </div>
              </div>

              <div
                className=" p-3 font-basic "
                dir="rtl">
                <div className=" row">
                  <div className="col-xl-10 col-lg-10 col-md-10 col-9 pb-0">
                    <h5 className="py-3 pb-3">الأدوات الأكثر إستخداماً</h5>
                  </div>
                  <div className=" col-lg-2 col-xl-2 col-xxl-2 col-3 col-md-2  d-flex justify-content-end  p-2 pb-0">
                    <h6 className="p-2 pb-3 " onClick={()=>navigate("/content-section")}>اظهار الكل</h6>
                  </div>
                </div>

                <div className="p-3 rounded-3  border-blue">
                  <div className="row">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="col-xl-4 p-2 col-lg-4 col-xxl-4 col-md-6">
                        <div className="rounded-3 border-blue pb-0 p-2">
                          <div className="d-flex justify-content-start align-items-start">
                            <div className=" d-flex align-items-start mt-2 ">
                              {/* Render the icon component */}
                              <img src={item.icon}></img>
                            </div>
                            <div className="p-2 pt-2 pb-0">
                              <small
                                className="d-block  "
                                style={{ color: "rgba(0, 27, 121, 1)" }}>
                                {item.title}
                              </small>
                              <p className="text-muted font-small-p font-light fw-light">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="control-table  p-3 font-basic   rounded-4 "
                dir="rtl">
                <h5 className="pb-3 ps-2 mt-4"> آخر الأنشطة</h5>

                <div className="table-con p-4">
                  <div className="table-head">
                    <p>عرض</p>
                    <select className="form-select font-number font-basic select-num-show rounded-2 d-inline-block">
                      <option
                        selected
                        value="20">
                        20
                      </option>
                      <option value="10">10</option>
                    </select>
                    <input
                      type="text"
                      className="form-controld-inline-block me-3 rounded-2 search-input"
                      placeholder="بحث"
                    />
                  </div>
                  <div>
                    <TableC />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
