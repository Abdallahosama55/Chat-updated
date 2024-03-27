import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../../../assets/Images/logo.svg";
import google from "../../../../assets/Images/google.png";
import { Link, useSearchParams } from "react-router-dom";
import { SiFacebook } from "react-icons/si";
import toast from "react-hot-toast";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Loader } from "../../../atoms/Loader/Loader";

// import { baseURLl } from "../../../redux/api/url";

const SignUp = () => {
  const [isloading, setIsloading] = useState(false);
  const [ip, setIP] = useState("");
  const token = localStorage.getItem("token");

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);
      // You might navigate using your preferred method here
      navigate("/control");
      window.location.reload(); // Redirect to the control page
    }
  }, [searchParams]);
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  const navigate = useNavigate();
  const [errorSignUp, setErrorSignUp] = useState(null);
  const [settings, setSettings] = useState(true);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    region: ip,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("يرجى إدخال اسمك"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("يرجى إدخال بريدك الإلكتروني"),
    password: Yup.string().required("يرجى إدخال كلمة المرور"),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "يجب أن تتطابق كلمة المرور الجديدة"
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission here
    const { name, email, password, confirmPassword, region } = values;
    try {
      setIsloading(true);
      const response = await axios.post(
        `https://srv475086.hstgr.cloud/api/users/`,
        {
          name,
          email,
          password,
          region: ip,
        }
      );

      // Assuming the response contains user data
      const userData = response.data;
      const tokenKey = userData.tokens.access;

      // Save token to localStorage
      localStorage.setItem("token", tokenKey);
      setIsloading(false);
      toast.success("تم انشاء حساب و ارسال الكود");
      // Navigate to the desired route
      navigate("/verifyaccount");
    } catch (error) {
      setIsloading(false);
      // Handle error
      toast.error(error.response.data.message);
    }
  };

  return (
    <div dir="rtl" className="  py-md-5 ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header ar">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body ar text-muted">
                    التزامنا بمراعاة خصوصيتك تلتزم إي أف بحماية خصوصية عملائنا.
                    وتنطبق سياسة حماية الخصوصية المعتمدة من قبل إي أف ("سياسة
                    حماية الخصوصية") على كل المعلومات الشخصية التي يتم جمعها من
                    قبلنا أو تقديمها لنا، إن دون الاتصال بالإنترنت (offline) أو
                    بالاتصال بالإنترنت (online)، بما في ذلك المعلومات الشخصية
                    التي يتم جمعها أو تقديمها من خلال مواقعنا الإلكترونية
                    ("مواقعنا الإلكترونية") وعلى أي مواقع على الهواتف الجوالة
                    والتطبيقات الصغيرة وغيرها من الميزات التفاعلية للجوّال
                    (والمشار إليها مجتمعةً بـ"تطبيقاتنا")، من خلال صفحاتنا
                    الرسمية على وسائل التواصل الاجتماعي التي نتحكم بها ("صفحاتنا
                    على وسائل التواصل الاجتماعي")، ومن خلال رسائل HTML التي
                    نرسلها إليكم (والمشار إليها مجتمعةً، بما في ذلك الصفحات على
                    وسائل التواصل الاجتماعي والتطبيقات والمواقع الإلكترونية،
                    بـ"المواقع"). ومن خلال تقديمكم المعلومات الشخصية لنا،
                    توافقون على أحكام وشروط هذه السياسة. ت الشخصية ما هي
                    المعلومات الشخصية التي نجمعها؟ "المعلومات الشخصية" هي
                    المعلومات التي تعرّف عنكم كأفراد، وتشمل: الاسم اسم المستخدم
                    العنوان البريدي (بما في ذلك عنوان إرسال الفواتير والشحنات)
                    رقم الهاتف (بما في ذلك رقم الهاتف الجوّال ورقم المنزل) عنوان
                    البريد الإلكتروني رقم بطاقة الاعتماد ورقم بطاقة الخصم الصورة
                    الشخصية رقم الحساب على وسائل التواصل الاجتماعي بلد الإقامة
                    اسم وعنوان المدرسة اسم وعنوان الشركة الدورات التعليمية
                    المفضّلة التفضيلات معلومات حول المتصفّح والجهاز معلومات حول
                    ملفّ سجلّ الخادم المعلومات التي يتم جمعها من خلال ملفات
                    تعريف الارتباط وبيانات البكسل الإضافية والتقنيات الأخرى
                    بيانات استخدام التطبيقات المعلومات الديموغرافية وغيرها من
                    المعلومات التي توفّرونها معلومات الموقع المعلومات المجمّعة
                    المعلومات الأخرى التي تشاركها خلال المكالمات الهاتفية أو
                    مكالمات الفيديو، والتسجيلات المرئية أو النصية مثل المكالمات
                    والمحادثات. يف نجمع المعلومات الشخصية؟ قد نقوم نحن ومقدمو
                    الخدمات لدينا بجمع معلومات شخصية بأساليب مختلفة، تشمل ما
                    يلي: عبر المواقع: يمكننا أن نجمع المعلومات الشخصية عبر
                    المواقع؛ مثلا: عند تسجيلكم للحصول على نشرة إخبارية ,تتواصل
                    مع بوت المحادثات,أو إجراء عملية شراء. دون اتصال بالإنترنت
                    offline: في المكتب: نحن نجمع معلوماتك الشخصية في مكاتبنا،
                    على سبيل المثال، عندما تتواصل مع خدمة العملاء لتشترك في إحدى
                    البرامج أو الخدمات أو لتقدم إلينا معلومات سواءً كان ذلك
                    كتابياً، عن طريق مكالمة صوتية أو مرئية. من خلال المتصفح أو
                    الجهاز الخاص بكم: يتم جمع بعض المعلومات بواسطة معظم
                    المتصفحات أو من خلال جهازكم تلقائيا. نستخدم هذه المعلومات
                    لأغراض الإحصائيات وضمان حسن عمل المواقع. من خلال ملفات سجل
                    الخادم: إنّ "عنوان بروتوكول الإنترنت" الخاص بكم هو رقم
                    يُخصّص تلقائيا للحاسوب أو الجهاز الذي تستخدمونه من قبل موفّر
                    خدمة الإنترنت الخاص بكم. ويتمّ تحديد عنوان بروتوكول الإنترنت
                    وتسجيله تلقائيًا في ملفات سجل الخادم كلّما قام المستخدم
                    بزيارة المواقع، مع تحديد وقت الزيارة والصفحة/الصفحات التي
                    جرت زيارتها. باستخدام ملفات تعريف الارتباط (الكوكيز): تتيح
                    ملفات تعريف الارتباط لخادم الويب نقل البيانات إلى حاسوب أو
                    جهاز لغرض حفظها ولأغراض أخرى. إن كنتم لا تريدون أن يتم جمع
                    المعلومات من خلال استخدام ملفات تعريف الارتباط، هناك إجراء
                    بسيط متوفر في معظم المتصفحات يتيح لكم عدم استخدام ملفات
                    تعريف الارتباط. للمزيد من المعلومات حول استخدامنا لملفات
                    تعريف الارتباط، نرجو مراجعة سياسة ملفات تعريف الارتباط
                    المعتمدة من قبلنا. من خلال استخدامكم للتطبيق: عند تنزيل أو
                    استخدام أحد التطبيقات، يمكننا نحن ومقدّمو الخدمات لدينا أن
                    نتتبّع ونجمع بيانات استخدام التطبيق، مثل وقت وتاريخ دخول
                    التطبيق الموجود على جهازكم إلى خوادمنا والمعلومات والملفات
                    التي تم تنزيلها على التطبيق بالاعتماد على رقم جهازكم. من
                    خلالكم: يمكن جمع معلومات مثل تاريخ الولادة والجنس والرمز
                    البريدي، بالإضافة إلى غيرها من المعلومات، مثل وسائل الاتصّال
                    المفضلة لديكم، عندما تقومون أنتم بتوفير هذه المعلومات طوعًا.
                    من خلال الموقع الجغرافي: قد نجمع معلومات حول الموقع الجغرافي
                    لجهازكم.
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <section className="d-flex justify-content-center align-items-center ar">
              <div className="d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 h_vh_UP">
                <LazyLoadImage
                  alt={"hi"}
                  effect="blur"
                  src={logo}
                  className="  w-100"
                  opacity="true"
                  placeholderSrc={logo}
                />
                <h5
                  className="text-move  py-2"
                  style={{ color: "#ed5ab3", border: "1px" }}
                >
                  {" "}
                  إنشاء حساب جديد{" "}
                </h5>
                <div className="d-flex mt-3 flex-column gap-1 align-content-end w-100 px-5  gap-2">
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    className="input_style_auth mb-1"
                    placeholder="اسم المستخدم"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />

                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className="input_style_auth  mb-1"
                    placeholder="البريد الإلكتروني"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />

                  {/* <span className=" span_input  mb-1"> */}
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    className="input_style_auth "
                    placeholder="كلمة المرور"
                  />
                  {/* </span> */}

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />

                  <Field
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="input_style_auth  mb-1"
                    placeholder=" تأكيد كلمة المرور "
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                  <div className="form-check fw-bold  primary">
                    <Field
                      type="checkbox"
                      name="privacyPolicy"
                      id="privacyPolicy"
                      required
                      className="form-check-input pointer"
                    />
                    <label
                      // htmlFor="privacyPolicy"
                      className="form-check-label text-move fs_auth fw-normal "
                    >
                      أوافق على{" "}
                      <span
                        className="pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        سياسة الخصوصية
                      </span>
                    </label>
                  </div>
                  <div className=" text-center text-danger">{errorSignUp}</div>
                  <button
                    type="submit"
                    className="button_auth fs_auth"
                    style={{ background: "#ed5ab3", border: "1px" }}
                  >
                    {" "}
                    {isloading ? <Loader /> : " إنشاء حساب "}
                  </button>
                </div>
                <p className=" fw-normal my-2  text-move">أو إنشاء بواسطة </p>
                <div className="d-flex flex-column gap-3 align-content-end w-100 px-5  gap-2">
                  <Link
                    to="https://srv475086.hstgr.cloud/api/google-login"
                    className="button_auth fs_auth text-decoration-none bg-white"
                    // target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="bg-white button"
                      type="button"
                      style={{ position: "relative", color: "#001b79" }}
                    >
                      <LazyLoadImage
                        alt={"hi"}
                        effect="blur"
                        src={google}
                        className="h-100 ps-1"
                        opacity="true"
                        placeholderSrc={google}
                      />
                      التسجيل بواسطة جوجل
                    </button>
                  </Link>

                  <button className="button_auth fs_auth">
                    <SiFacebook className=" -white fs-5" />
                    التسجيل بواسطة فيس بوك
                  </button>
                </div>
                <span className="mt-4 d-flex gap-2">
                  <p className=" fs-6 text-black-50"> لديك حساب؟</p>
                  <Link
                    to="/signin"
                    className=" text-move fw-bold  primary  text-decoration-none"
                  >
                    تسجيل الدخول
                  </Link>
                </span>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
