import React from "react";
import Navbar from "@/Util/dashboardLayout/Navbar";
import "./Myplan.css";
import { TbPointFilled } from "react-icons/tb";
function MyPlan() {
  return (
    <div>
      {/* <Navbar /> */}

      <div className="  mt-3" dir="rtl">
        <h1 className=" font-basic ps-2 py-3 me-5 ">الباقات</h1>
        <div className="  ps-5 pe-5">
          <div className="row    justify-content-center align-items-start ">
            <div className=" p-2 pb-5 col-xl-3 col-lg-3 col-xxl-3 col-sm-12 col-md-6">
              <div className="border-blue height-card  rounded-3 container">
                <div className="p-2 pb-1 header-card py-5">
                  <h4 className=" font-basic d-block ">اشتراك مجاني</h4>

                  <small className="   font-light d-block  py-2  font-basic">
                    استمتع بتجربة الإبداع مع اشتراكنا المجاني! احصل على الوصول
                    إلى محتوى متنوع وجودة عالية في كافة الأقسام دون دفع أي رسوم.
                  </small>

                  <h2 className=" fw-bolder  font-number font-basic">EGP 0</h2>
                </div>

                <div className=" w-100 d-flex  justify-content-center">
                  <button className=" border-blue rounded-5  btn-rounded w-100 m-3 mt-0 bg-white font-basic ps-5 pe-5 p-2">
                    ابدأ الآن مجاناً
                  </button>
                </div>

                <div className=" row p-2">
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ">GPT-3.5</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">500</span>
                    <span className="font-light">نموذج محتوى</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">ChatWithDOC</span>
                    <span className="font-light"> لملفين يومياً</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light ">
                      {" "}
                      رسائل وتفاعلات غير محدود
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">أوقات الاستجابة العادية </span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">سجل دردشة غير محدود</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      طول الرسالة محدود ( حتى{" "}
                      <span className=" font-number">2000</span> حرف)
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      دعم أكثر من <span className=" font-number">100</span> لغة
                      مختلفة
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      تدقيق المحتوى نحوياً وإملائياً لـ{" "}
                      <span className=" font-number">2500</span> كلمة
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">تحويل الصوت الي نص</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      تصميم <span className=" font-number">15</span> صورة فقط
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">التحديثات الشهرية</span>
                  </div>
                </div>
              </div>
            </div>

            <div className=" p-2  col-xl-3 col-lg-3 col-xxl-3 col-sm-12 col-md-6">
              <div
                style={{ border: "1px" }}
                className="border-blue  height-card rounded-3 container"
              >
                <div className="p-2 pb-1 header-card py-5">
                  <h4 className=" font-basic d-block ">اشتراك شهري</h4>

                  <small className="   font-light d-block  py-2  font-basic">
                    اشترك بالباقة الشهرية واستمتع بمزايا مُتقِن دون حدود
                    للاستخدام، للوصول لخيارات مخصصة للصناعات الخاصة والاحتياجات
                    الفردية
                  </small>

                  <h2 className=" fw-bolder  font-number font-basic">
                    {" "}
                    EGP 180
                  </h2>
                </div>

                <div className=" w-100 d-flex  justify-content-center">
                  <button className=" border-blue rounded-5  btn-rounded w-100 m-3 mt-0 bg-white font-basic ps-5 pe-5 p-2">
                    اشترك الان
                  </button>
                </div>

                <div className=" row p-2">
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ">GPT-3.5</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> GPT-4</span>
                    <span className="font-light"></span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> PaLM 2</span>
                    <span className="font-light"> </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">DALL-E 3</span>
                    <span className="font-light"> </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">Gemini </span>
                    <span className="font-light"> </span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> 500</span>
                    <span className="font-light"> نموذج محتوى </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">ChatWithDOC </span>
                    <span className="font-light"> غير محدودة</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      رسائل وتفاعلات غير محدود
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> أوقات استجابة أسرع</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> سجل دردشة غير محدود</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> طول الرسالة الغير محدود</span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تحويل الصوت الى نص</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">تصميم صور غير محدود</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تصدير المحتوى لملفات </span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">التحديثات الشهرية</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      أداة تدقيق المحتوى نحوياً وإملائياً
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />

                    <span className="font-light"> تحرير النص المدعوم بال</span>
                    <span className=" font-number ms-1">AI </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تحليل البيانات المتقدم</span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />

                    <span className="font-light">
                      دعم أكثر من{" "}
                      <span className=" font-number ms-1">100 </span> لغة مختلفة
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className=" p-2  col-xl-3 text-white col-lg-3 col-xxl-3 col-sm-12 col-md-6">
              <div className="border-blue height-card bg-blue rounded-3 container">
                <div className=" p-2 py-0   font-blue mt-3 d-flex  justify-content-end ">
                  <div className=" bg-white offer-badge p-2 ps-3 pe-3  rounded">
                    <span> خصم</span>
                    <span className=" font-number"> 30%</span>
                  </div>
                </div>
                <div className="p-2 py-0 pb-1 header-card ">
                  <h4 className="  d-block ">اشتراك ربع سنوي</h4>

                  <small className="   font-light d-block  py-2  ">
                    اشترك في الباقة الربع سنوية واستمتع بجميع مزايا مُتقِن.
                    الحصرية لمدة <span className="  font-number">3</span> اشهور،
                    ووفّر <span className=" font-number">30%</span> من قيمة
                    الباقة الأساسية
                  </small>

                  <h2 className=" fw-bolder  font-number "> EGP 378</h2>
                </div>

                <div className=" w-100 d-flex  justify-content-center">
                  <button className=" font-basic border-blue rounded-5  btn-rounded w-100 m-3 mt-0 bg-white  ps-5 pe-5 p-2">
                    اشترك الان
                  </button>
                </div>

                <div className=" row p-2">
                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ">GPT-3.5</span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> GPT-4</span>
                    <span className="font-light"></span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> PaLM 2</span>
                    <span className="font-light"> </span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">DALL-E 3</span>
                    <span className="font-light"> </span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">Gemini </span>
                    <span className="font-light"> </span>
                  </div>
                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> 500</span>
                    <span className="font-light"> نموذج محتوى </span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">ChatWithDOC </span>
                    <span className="font-light"> غير محدودة</span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      رسائل وتفاعلات غير محدود
                    </span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> أوقات استجابة أسرع</span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> سجل دردشة غير محدود</span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> طول الرسالة الغير محدود</span>
                  </div>
                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تحويل الصوت الى نص</span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">تصميم صور غير محدود</span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تصدير المحتوى لملفات </span>
                  </div>
                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">التحديثات الشهرية</span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      أداة تدقيق المحتوى نحوياً وإملائياً
                    </span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />

                    <span className="font-light"> تحرير النص المدعوم بال</span>
                    <span className=" font-number ms-1">AI </span>
                  </div>

                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تحليل البيانات المتقدم</span>
                  </div>
                  <div className="list font-light">
                    <TbPointFilled className="text-basic" />

                    <span className="font-light">
                      دعم أكثر من{" "}
                      <span className=" font-number ms-1">100 </span> لغة مختلفة
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className=" p-2  col-xl-3 col-lg-3 col-xxl-3 col-sm-12 col-md-6">
              <div
                style={{ border: "1px" }}
                className="border-blue  height-card rounded-3 container"
              >
                <div className="p-2 pb-1 header-card py-1">
                  <div className=" p-2 py-0   font-blue mt-3 d-flex  justify-content-end ">
                    <div className=" bg-white offer-badge2 p-2 ps-3 pe-3  rounded">
                      <span> خصم</span>
                      <span className=" font-number"> 50%</span>
                    </div>
                  </div>
                  <h4 className=" font-basic d-block ">اشتراك سنوي</h4>

                  <small className="   font-light d-block  py-2  font-basic">
                    اشترك بالباقة السنوية ووفّر <span>50%</span>من قيمة
                    الاشتراك. اشترك الآن واحصل على فرصة حصرية للوصول إلى محتوى
                    مميز على مدار السنة كاملة.
                  </small>

                  <h2 className=" fw-bolder  font-number font-basic">
                    {" "}
                    EGP 1080
                  </h2>
                </div>

                <div className=" w-100 d-flex  justify-content-center">
                  <button className=" border-blue rounded-5  btn-rounded w-100 m-3 mt-0 bg-white font-basic ps-5 pe-5 p-2">
                    اشترك الان
                  </button>
                </div>

                <div className=" row p-2">
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ">GPT-3.5</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> GPT-4</span>
                    <span className="font-light"></span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> PaLM 2</span>
                    <span className="font-light"> </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">DALL-E 3</span>
                    <span className="font-light"> </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">Gemini </span>
                    <span className="font-light"> </span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> 500</span>
                    <span className="font-light"> نموذج محتوى </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1">ChatWithDOC </span>
                    <span className="font-light"> غير محدودة</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      رسائل وتفاعلات غير محدود
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> أوقات استجابة أسرع</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> سجل دردشة غير محدود</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> طول الرسالة الغير محدود</span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تحويل الصوت الى نص</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">تصميم صور غير محدود</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تصدير المحتوى لملفات </span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">التحديثات الشهرية</span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light">
                      {" "}
                      أداة تدقيق المحتوى نحوياً وإملائياً
                    </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />

                    <span className="font-light"> تحرير النص المدعوم بال</span>
                    <span className=" font-number ms-1">AI </span>
                  </div>

                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />
                    <span className=" font-number ms-1"> </span>
                    <span className="font-light"> تحليل البيانات المتقدم</span>
                  </div>
                  <div className="list font-basic">
                    <TbPointFilled className="text-basic" />

                    <span className="font-light">
                      دعم أكثر من{" "}
                      <span className=" font-number ms-1">100 </span> لغة مختلفة
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPlan;
