//                                             Modules                                  //
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

//                                             Components                                //
import CustomButton from "@/components/atoms/Button";
import { getContentFromLink } from "@/helpers/getContentFromLink";
import downloadlink from "@/assets/Images/reformulate/mdi_backup.png";
import { baseURL } from "@/redux/api/url";
import { importRephrase } from "@/redux/slices/apiSlice";
import CenteredModal from "./Modal";

const LinkModal = ({ onClose, show }) => {
  const [link, setLink] = useState("");
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state) => state.api.rephrasePost
  );
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();

  //                                  Getting text with URL reformulate                       //
  const importFromURL = async () => {
    //
    //                                        Check Url Form                                  //
    //
    if (link.length === 0) return toast.error("لم يتم ادخال رابط ");
    const linkPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    const isLinkValid = linkPattern.test(link);
    if (!isLinkValid) return toast.error("برجاء ادخل رابط صحيح");

    //                                       Generate ID                                        //

    try {
      const resId = await axios.post(
        `${baseURL}v1/text-rephrase/texts/`,
        { prompt: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = resId.data;
      const id = response.unique_id;
      //                                             Getting data                           //
      await dispatch(
        importRephrase({
          endpoint: `v1/text-rephrase/create/${id}/`,
          URL: link,
        })
      );
      onClose();
      setLink("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CenteredModal
      onClose={onClose}
      show={show}
      size="lg">
      <Stack
        dir="rtl"
        gap={1}
        className="text-secondary text-center p-sm-5 p-2">
        <div>
          <img
            src={downloadlink}
            style={{ maxWidth: "100px" }}
          />
        </div>
        <p className="fs-1 ">إسترداد مقال من الويب</p>
        <p>ستيم اضافة المحتوي من الرابط تلقائيا</p>
        <div className="input">
          <input
            type="text"
            className="form-control moadalCustom"
            placeholder="أدخل الرابط هنا"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-center customButtonContainer mt-3">
          <CustomButton
            className={"customButtonModal"}
            //  Check Path to chose API  base on Page
            onClick={
              pathname.includes("reformulate")
                ? () => importFromURL()
                : () => {
                    getContentFromLink(link, state.checker.currentDoc).then(
                      (res) => {
                        dispatch(setContent(res));
                        onClose();
                      }
                    );
                  }
            }>
            {loading ? (
              <Stack
                direction="horizontal"
                gap={2}
                className="justify-center  items-center">
                <Spinner size="sm" />
                جاري التحميل
              </Stack>
            ) : (
              "استرداد المحتوي"
            )}
          </CustomButton>
          <CustomButton
            outline
            className="customButtonModal"
            onClick={onClose}>
            إلغاء
          </CustomButton>
        </Stack>
      </Stack>
    </CenteredModal>
  );
};

export default LinkModal;
