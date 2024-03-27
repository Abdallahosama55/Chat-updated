import React, { Fragment, useEffect, useState } from "react";
import "./MyAccount.css";
import accountimg from "../../assets/Images/AccountSetting/Ellipse 3242.png";
import { IoIosArrowBack } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Loader } from "@/components/atoms/Loader/Loader";
import { Button } from "bootstrap";
import logo from "../../assets/logo.svg";
function MyAccount() {
  const [isloading, setIsloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const token = localStorage.getItem("token");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
    }
  };

  const inputFields = [
    { label: "اسم المستخدم", type: "text", id: "username", name: "username" },
    { label: "الإسم الكامل  ", type: "text", id: "name", name: "name" },
    {
      label: "عنوان البريد الإلكتروني",
      type: "email",
      id: "email",
      name: "email",
    },
    {
      label: "رقم الجوال",
      type: "tel",
      id: "phone_number",
      name: "phone_number",
    },
  ];

  const inputFieldspassword = [
    {
      label: " كلمة المرور القديمة",
      type: "password",
      id: "password",
      name: "password",
    },
    {
      label: "كلمة المرور الجديدة",
      type: "password",
      id: "password",
      name: "new_password",
    },
    {
      label: "تأكيد كلمة المرور",
      type: "password",
      id: "confirm_password",
      name: "confirm_password",
    },
  ];

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("البريد الإلكتروني غير صالح"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "يجب أن تتطابق كلمة المرور الجديدة"
    ),
  });
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchData({ endpoint: "userinfo/" }));
  }, [dispatch]);

  console.log("data", data?.username);
  // Initial values for Formik
  const initialValues = {
    username: data?.username || "",
    name: data?.name || "",
    email: data?.email || "",
    phone_number: data?.phone_number || "",
    new_password: "",
    confirm_password: "",
    profile_picture: data?.profile_picture,
  };

  // Handle Submit user Data
  const handleSubmit = async (values) => {
    console.log(values);
    console.log(uploadedImage);
    // Convert Base64 to binary
    const imageBlob = await fetch(uploadedImage).then((res) => res.blob());

    // Handle form submission
    // Initial values for Formik
    const value = {
      username: values.username,
      name: values.name || null,
      email: values.email || null,
      phone_number: values.phone_number || null,
      new_password: values.new_password,
      confirm_password: values.confirm_password,
      profile_picture: imageBlob ||data?.profile_picture,
    };
    console.log("value", value);

    try {
      setIsloading(true);
      const response = await axios.put(
        `https://srv475086.hstgr.cloud/api/userinfo/update/`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );
      setIsloading(false);
      // Assuming the response contains user data
      const userData = response.data;
    } catch (error) {
      setIsloading(false);
      // Handle error
    }
  };

  // Delete All Conversations
  const deleteConversations = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `https://srv475086.hstgr.cloud/api/userinfo/remove_profile_picture/`,

        { headers: { Authorization: `Bearer ${token}` } }
      );
  

      setIsDeleting(false);
      toast.success("تم حذف الصورة بنجاح")
    } catch (error) {
      setIsDeleting(false);
      console.log(error, "find error");
    }
  };

  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate("/control");
  };
  const handleNavigatemyplan = () => {
    navigate("/myplan");
  };

  if (loading) {
    return (
      <div
        className=" d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <Loader />
      </div>
    );
  }
  return (
    <Fragment>
      <div dir="rtl">
        <div className="  ">
          <div className="row pe-0   w-100  w-100      ">
            <div className="col-md-9    order-1 order-xl-1 order-xxl-1  col-xl-2 col-lg-2 col-xxl-2 mb-5 border-custom-container   shadow-sm rounded  ">
              <div className=" d-flex justify-content-center ">
                <div className=" d-block w-100 m-3">
                  <div className=" py-2  d-flex  justify-content-center  align-items-center">
                    <img src={logo} />
                  </div>
                  <div>
                    <button
                      onClick={handleNavigateBack}
                      className="w-100 rounded mt-2 mb-3  button-white   fw-light   text-move shadow-sm    mt-2">
                      الرجوع
                      <IoIosArrowBack />
                    </button>
                  </div>
                  <div>
                    <button className=" w-100 rounded     fw-light p-1  text-white btn-move1 ">
                      إعدادات الحساب
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={handleNavigatemyplan}
                      className=" w-100 rounded mt-2    fw-light p-1  text-move button-white ">
                      خطتي
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-10    order-3 order-xl-1 order-xxl-1  col-xl-10 col-lg-10 col-xxl-10 p-5  pb-0 py-3 ">
              <div className="   container-myaccount">
                <h3 className="text-move  fw-bold pb-2 me-5 ">الملف الشخصي</h3>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}>
                  {({ dirty }) => (
                    <Form>
                      <div className=" personal-details shadow-sm me-md-5  border-custom-container rounded p-3 py-3 row">
                        <h5 className="text-move  fw-semibold  p-1 pb-0">
                          {" "}
                          تغيير صورة الملف الشخصي{" "}
                        </h5>
                        <div className="col-md-12">
                          <div className="row g-md-5 p-0">
                            <div className=" col-md-9">
                              <p className=" fw-light  text-move">
                                قم بتحميل صورة جديدة لتغيير صورة ملفك الشخصي
                              </p>
                            </div>
                            <div className="col-md-3">
                              <div className=" d-flex  justify-content-center align-items-start mb-3">
                                <img
                                  src={
                                    uploadedImage ||
                                    `https://srv475086.hstgr.cloud${data?.profile_picture}`
                                  }
                                  className="w-75 rounded-circle border-custom-container"
                                  alt="Profile"
                                />
                              </div>
                              <input
                                type="file"
                                id="imageUpload"
                                name="profile_picture"
                                hidden
                                onChange={handleImageChange}
                              />

                              <Field
                                type="hidden"
                                onChange={handleImageChange}
                                id="imageUploadd"
                                name="profile_picture"
                                hideen
                                value={uploadedImage || ""}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-12 d-flex  mt-3 mt-md-0"
                          dir="ltr">
                          <button
                            type="button" // Change this to type="button" to prevent form submission
                            className="fw-light p-1 text-white rounded   ps-3 pe-3 btn-move1"
                            onClick={() =>
                              document.getElementById("imageUpload").click()
                            }>
                            تحميل الصورة
                          </button>

                          <button
                            type="button" // Change this to type="button" to prevent form submission
                            className="fw-light p-1 rounded text-move  border-custom-container  ps-5 pe-5 ms-3  bg-white" onClick={()=>deleteConversations()}>
                            مسح
                          </button>
                        </div>
                      </div>
                      <div className="personal-details shadow-sm me-md-5 mt-md-4 border-custom-container rounded p-3 py-3 row">
                        <h5 className="text-move  fw-medium  p-1 pb-3">
                          المعلومات الشخصية
                        </h5>
                        <div className="col-md-8">
                          <div className="row m-0 p-0 ">
                            {inputFields.map(({ label, type, id, name }) => (
                              <div
                                className="col-md-6 mt-2 "
                                key={id}>
                                <div className="">
                                  <label
                                    htmlFor={id}
                                    className="form-label text-move ">
                                    {label}
                                  </label>
                                  <Field
                                    type={type}
                                    className="form-control border-custom font-number"
                                    id={id}
                                    name={name}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="personal-details mb-4 shadow-sm me-md-5 mt-md-4 border-custom-container rounded p-3 py-3 row">
                        <h5 className="text-move  fw-semibold  p-1 pb-3">
                          كلمة المرور{" "}
                        </h5>
                        <div className="col-md-8">
                          <div className="row g-md-4">
                            {inputFieldspassword.map(
                              ({ label, type, id, name }) => (
                                <div
                                  className="col-md-6 mt-2 "
                                  key={id}>
                                  <div className="">
                                    <label
                                      htmlFor={id}
                                      className="form-label text-move ">
                                      {label}
                                    </label>
                                    <Field
                                      type={type}
                                      className="form-control border-custom"
                                      id={id}
                                      name={name}
                                    />
                                    <ErrorMessage
                                      name={name}
                                      component="div"
                                      className="text-red"
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-md-12  mt-2 mb-4 mt-md-0"
                        dir="ltr">
                        <button
                          type="submit"
                          className=" fw-light btn btn-primary ps-5 pe-5 btn-move1">
                          {isloading ? <Loader /> : "حفظ"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MyAccount;
