import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";
import {
  addKeyword,
  delKeyword,
  setArticle,
  setSubTitles,
  setTitle,
} from "@/redux/slices/createArticle/articleSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useTypingAnimation from "@/hooks/typingAnimation";
import throttle from "@/helpers/throttle";
import {
  addSubTitle,
  delSubTitle,
} from "../../../redux/slices/createArticle/articleSlice";
export default function SideBox({ phase, data, loading }) {
  const textareaRef = useRef(null);
  const scrollToEndRef = useRef(true);
  const [subTitlesSelected, setSubTitlesSelected] = useState(null);
  const dispatch = useDispatch();
  const { keywords, title, article, language, subTitles } = useSelector(
    (s) => s.article
  );

  // Typeing article with animation
  const articleTypingAnimation = useTypingAnimation(
    article.split(" "),
    100,
    loading
  );

  // TODO: Move cursor to end
  const articleToEndThrottle = useCallback(
    throttle(() => {
      textareaRef.current?.blur();
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(
        articleTypingAnimation.length,
        articleTypingAnimation.length
      );
    }, 100).bind(null),
    []
  );

  useEffect(() => {
    // Handle scrolling
    const controller = new AbortController();
    textareaRef.current?.addEventListener(
      "scroll",
      (e) => {
        const offset = e.target.getClientRects()?.[0]?.height + 50;
        if (e.target?.scrollHeight <= e.target?.scrollTop + offset) {
          scrollToEndRef.current = true;
        } else scrollToEndRef.current = false;
      },
      { signal: controller.signal }
    );

    // Default state
    if (articleTypingAnimation.length >= article.length) {
      controller.abort();
      scrollToEndRef.current = true;
    }
    return () => {
      controller.abort();
    };
  }, [textareaRef.current, articleTypingAnimation.length]);

  if (articleTypingAnimation.length < article.length && scrollToEndRef.current)
    articleToEndThrottle();

  return (
    <div
      className={`${styles["box-container"]} ${
        phase > 1 ? styles["phase-2-3"] : ""
      } h-100 `}
    >
      <h5
        className={`${phase === 0 || phase === 1 ? styles["phase0"] : ""} ${
          styles["title"]
        } px-2 mb-0`}
      >
        {phase === 0
          ? "الكلمات المقترحة"
          : phase === 1
          ? "العناويين المقترحة"
          : phase === 2
          ? "العناويين الفرعية المقترحة"
          : "المقال"}
      </h5>
      {loading ? (
        <Skeleton count={10} height={30} />
      ) : (!Array.isArray(data) || !data?.length) && !article.length ? (
        <>
          {
            <p className={`${styles["description"]} mb-0 py-2 pe-2`}>
              {phase === 0
                ? "سيتم إدراج الكلمات المفتاحية التي تم إنشاؤها هنا"
                : phase === 1
                ? "سيتم إدراج العناوين التي تم إنشاؤها هنا"
                : phase === 2
                ? "سيتم إدراج العناوين الفرعية التي تم إنشاؤها هنا"
                : "سيتم إدراج المقال هنا"}
            </p>
          }
          {phase === 0 ? (
            <p className={`${styles["extra-description"]} mb-0 py-2 pe-2`}>
              * يتم إنشاء جميع الكلمات المفتاحية بناءً على موضوعك
            </p>
          ) : null}
        </>
      ) : (
        <div
          dir={
            language
              ? language !== "ar" && language !== "العامية المصرية"
                ? "ltr"
                : "rtl"
              : "rtl"
          }
          className={`${styles["content"]} overflow-y-scroll p-1`}
        >
          {
            phase === 3 && article.length ? (
              <textarea
                ref={textareaRef}
                className={`form-control ${styles["main-article"]} px-2 p-1 w-100`}
                value={
                  articleTypingAnimation.length < article.length
                    ? articleTypingAnimation
                    : article
                }
                onChange={(e) => {
                  dispatch(setArticle(e.target.value));
                }}
              ></textarea>
            ) : (
              // phase === 0 || phase === 1 ?
              <ul className={` ${styles["list-item"]} `}>
                {data.map((item, i) => (
                  <li
                    key={i}
                    className={`py-3 ${
                      language
                        ? language !== "ar" && language !== "العامية المصرية"
                          ? "ps-3"
                          : "pe-3"
                        : "pe-3"
                    }`}
                  >
                    <label className="d-flex align-items-center ">
                      <input
                        checked={
                          phase === 0
                            ? keywords.includes(item)
                            : phase === 1
                            ? title === item
                            : subTitles.includes(item)
                        }
                        name="list-item"
                        type="checkbox"
                        value={item}
                        onChange={(e) => {
                          if (phase === 0)
                            e.target.checked
                              ? dispatch(addKeyword(item))
                              : dispatch(delKeyword(item));
                          else if (phase === 1) dispatch(setTitle(item));
                          else
                            e.target.checked
                              ? dispatch(addSubTitle(item))
                              : dispatch(delSubTitle(item));
                        }}
                      />
                      <span
                        className={`${
                          language
                            ? language !== "ar" &&
                              language !== "العامية المصرية"
                              ? "ms-3"
                              : "me-3"
                            : "me-3"
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )
            // : (
            //   <>
            //     {data.map((subT, index) => (
            //       <ul
            //         key={index}
            //         onClick={() => {
            //           setSubTitlesSelected(index);
            //           dispatch(setSubTitles(subT));
            //         }}
            //         className={` ${styles["list-item"]}
            //     ${styles["list-item-sub-titles"]} ${
            //           subTitlesSelected === index
            //             ? styles["list-item-sub-titles__selected"]
            //             : ""
            //         } ${
            //           language
            //             ? language !== "ar" && language !== "العامية المصرية"
            //               ? "ps-5"
            //               : "pe-5"
            //             : "pe-5"
            //         }`}
            //       >
            //         {subT.map((sub, i) => (
            //           <li key={i} className="mb-1">
            //             {sub}
            //           </li>
            //         ))}
            //       </ul>
            //     ))}
            //   </>
            // )
          }
        </div>
      )}
    </div>
  );
}
