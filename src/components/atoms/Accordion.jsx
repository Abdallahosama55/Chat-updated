import { Stack } from "react-bootstrap";
import CheckMarkIcon from "@/assets/icons/CheckMark";
import { themeColors } from "@/Util/theme.js";
import ArrowIcon from "@/assets/icons/Arrow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSelector, useDispatch } from "react-redux";
import lodash from "lodash";
import { useState } from "react";
import "./atoms.css";
import { GoArrowLeft } from "react-icons/go";
import { correctMistake, correctMistakes } from "@/redux/features/api/apiSlice";
const CustomAccordion = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <div>
      {accordionData.map(({ title, color, value }, index) => {
        return (
          <AccordionItem
            key={index}
            title={title}
            color={color}
            isSelected={selectedIndex === index}
            setSelectedIndex={setSelectedIndex}
            index={index}
            value={value}
          />
        );
      })}
    </div>
  );
};

export default CustomAccordion;

const AccordionItem = ({
  title,
  color,
  isSelected,
  setSelectedIndex,
  index,
  value,
}) => {
  const checker = useSelector((state) => state.checker);
  const objectErrors = checker.mistakes[value];
  // const state = useAppSelector((state) => state);
  // const objectErrors = state.checker.mistakes[value];
  const dispatch = useDispatch();
  return (
    <>
      <div className="accordion-item py-3 ">
        <Stack
          direction="horizontal"
          className="justify-content-between z-3"
          role="button"
          onClick={() => {
            setSelectedIndex((prev) => (prev === index ? null : index));
          }}>
          <Stack
            direction="horizontal"
            gap={3}>
            <span>
              <CheckMarkIcon
                width={19}
                height={19}
                color={color}
              />
            </span>
            <span style={{ fontSize: "12px", fontWeight: "300" }}>{title}</span>
          </Stack>
          <ArrowIcon
            width={10}
            height={10}
            rotate={isSelected ? 270 : 90}
            color={themeColors.colors.primary}
          />
        </Stack>
      </div>
      {isSelected && (
        <div
          style={{
            background: "white",
            border: "1px solid   #5225CE33",
            borderRadius: "12px",
            // maxHeight: "120px",
            // overflowY: "auto",
          }}
          className="p-2 px-3 accordion-content">
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-between">
            <span
              style={{
                borderRadius: "8px",
                padding: "4px 18px",
                fontSize: "10px",
              }}
              className="btn btn-primary label errorButton  "
              onClick={() => dispatch(correctMistakes(objectErrors || {}))}>
              صحح الأخطاء
            </span>
            <span className="label">
              <span style={{ fontFamily: "sans-serif", fontWeight: "600" }}>
                {Object.keys(objectErrors || {}).length}
              </span>{" "}
              خطأ
            </span>
          </Stack>

          {!!Object.keys(objectErrors || {}).length && (
            <div
              style={{ maxHeight: "100px", overflowY: "auto" }}
              className="bg-light rounded  py-2 mt-2">
              {Object.keys(objectErrors || {}).map((key, index) => {
                const error = objectErrors ? objectErrors[key] : null;
                if (!error) return null;
                return (
                  <span
                    className=" d-flex  justify-content-around align-items-center flex-wrap"
                    key={index}>
                    <span
                      style={{ padding: "4px 10px", borderRadius: "7px" }}
                      className="btn btn-outline-danger errorButton label  m-1">
                      {key}
                    </span>
                    <GoArrowLeft />
                    <span>
                      {lodash.isArray(error) ? (
                        error.map((errorText, index) => (
                          <span
                            style={{ padding: "5px 8px" }}
                            className="btn btn-outline-primary label m-1 errorButton"
                            role="button"
                            key={index}
                            onClick={() => {
                              dispatch(
                                correctMistake({ mistake: key, correct: error })
                              );
                            }}>
                            {errorText}
                          </span>
                        ))
                      ) : (
                        <span
                          className="btn btn-outline-primary errorButton label m-1"
                          role="button"
                          key={index}
                          onClick={() => {
                            dispatch(
                              correctMistake({ mistake: key, correct: error })
                            );
                          }}>
                          {error}
                        </span>
                      )}
                    </span>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const accordionData = [
  {
    title: "الأخطاء الإملائية",
    color: themeColors.colors.danger,
    value: "Spelling Mistakes",
  },
  {
    title: "التدقيق النحوي",
    color: themeColors.colors.primary,
    value: "Grammar Check",
  },
  {
    title: "الصياغة",
    color: themeColors.colors.warning,
    value: "Lexicon",
  },
  {
    title: "المعجم",
    color: themeColors.colors.success,
    value: "Drafting",
  },
  {
    title: "تصحيحات اخرى",
    color: themeColors.colors.purble,
    value: "Other Corrections",
  },
];
