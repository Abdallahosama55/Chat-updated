import styles from "./main.module.css";
import { Divider } from "@mui/material";
import { useFormik } from "formik";
import Arrows from "./Arrows";
import Subject from "./Subject";
import Title from "./Title";
import SubTitles from "./SubTitles";
import Keywords from "./Keywords";
import ContentStyle from "./ContentStyle";
import Language from "./Language";
import NumKeywords from "./NumKeywords";
import NumTitles from "./NumTitles";
import { useDispatch, useSelector } from "react-redux";
import { tryCatch, validation } from "@/Util/Create-article/helpers";
import NumWords from "./NumWords";
import {
  setArticle,
  setArticleId,
} from "@/redux/slices/createArticle/articleSlice";
import { useNavigate } from "react-router-dom";
import { useLazyGenerateIdQuery } from "@/redux/slices/createArticle/createArticleEndpoints";
import { Subtitles } from "@mui/icons-material";
import {
  replaceKeywords,
  setSubTitles,
  setTitle,
} from "../../../../redux/slices/createArticle/articleSlice";

export default function MainForm({ phase, onPhaseChanched, getData, loading }) {
  const [generateId, { isFetching: generatedIdLoading }] =
    useLazyGenerateIdQuery();

  const { language } = useSelector((s) => s.article);

  const { title, keywords, subTitles, article, newArticleId } = useSelector(
    (s) => s.article
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      topic: "",
      num_of_keywords: "",
      // num_Of_points: "",
      num_titles: "",
      tone_of_voice: "",
      num_Article_words: "",
    },
    onSubmit: async ({
      topic,
      num_of_keywords,
      tone_of_voice,
      num_titles,
      // num_Of_points,
      num_Article_words,
    }) => {
      if (!newArticleId) {
        const data = await tryCatch(generateId.bind(null, null));
        if (data?.article_id) dispatch(setArticleId(data.article_id));
        else return;
      }
      if (loading) return;
      const validateMsgs = {
        num_Article_words: {
          value: num_Article_words,
          msg: "عدد كلمات المقال",
        },
        topic: {
          value: topic,
          msg: "الموضوع",
        },
        title: {
          value: title,
          msg: "العنوان",
        },
        language: {
          value: language,
          msg: "اللغة",
        },
        tone_of_voice: {
          value: tone_of_voice,
          msg: "أسلوب المحتوى",
        },
        keywords: {
          value: keywords,
          msg: "الكلمات المفتاحية",
        },
        num_titles: {
          value: num_titles,
          msg: "عدد العناوين",
        },
        // num_Of_points: {
        //   value: num_Of_points,
        //   msg: "عدد العناوين الفرعية",
        // },
        num_of_keywords: {
          value: num_of_keywords,
          msg: "عدد العناوين الفرعية",
        },
        subTitles: {
          value: Subtitles,
          msg: "العناوين الفرعية",
        },
      };

      if (phase === 0) {
        // Get Keywords
        const valid = validation([
          validateMsgs.topic,
          validateMsgs.num_of_keywords,
          validateMsgs.language,
        ]);
        if (!valid) return;
        const body = { topic, num_of_keywords, language };
        const data = await tryCatch(getData.bind(null, body));
        if (data) dispatch(replaceKeywords([]));
      } else if (phase === 1) {
        // Get Titles
        const valid = validation([
          validateMsgs.topic,
          validateMsgs.keywords,
          validateMsgs.num_titles,
          validateMsgs.tone_of_voice,
          validateMsgs.language,
        ]);
        if (!valid) return;
        const body = { topic, language, tone_of_voice, keywords, num_titles };
        const data = await tryCatch(getData.bind(null, body));
        if (data) dispatch(setTitle(""));
      } else if (phase === 2) {
        // Get Sub titles
        const valid = validation([
          validateMsgs.title,
          validateMsgs.keywords,
          validateMsgs.tone_of_voice,
          validateMsgs.language,
          // validateMsgs.num_Of_points,
        ]);
        if (!valid) return;
        const body = {
          title,
          keywords,
          tone_of_voice,
          language,
          // num_Of_points,
        };
        const data = await tryCatch(getData.bind(null, body));
        if (data) dispatch(setSubTitles([]));
      } else {
        // Get Article
        const valid = validation([
          validateMsgs.title,
          validateMsgs.keywords,
          validateMsgs.tone_of_voice,
          validateMsgs.language,
          validateMsgs.num_Article_words,
          validateMsgs.subTitles,
        ]);
        if (!valid) return;
        const body = {
          title,
          language,
          selected_SubTitles: subTitles,
          keywords,
          tone_of_voice,
          num_Article_words,
        };
        const data = await tryCatch(
          getData.bind(null, { id: newArticleId, body })
        );
        if (data?.content) dispatch(setArticle(data.content));
      }
    },
  });

  // useEffect(() => {
  //   const storedPhase = localStorage.getItem("phase");
  //   const articleId = localStorage.getItem("articleId");
  //   const lastStepDone = JSON.parse(localStorage.getItem("lastStepDone"));
  //   if (articleId && storedPhase) {
  //     const initialPhase =
  //       +storedPhase === 3 && lastStepDone
  //         ? +storedPhase
  //         : +storedPhase > 0
  //         ? storedPhase - 1
  //         : 0;
  //     dispatch(setArticleId(articleId));
  //     (async () => {
  //       const phaseData = await tryCatch(
  //         getPhase.bind(null, { id: articleId, phase: initialPhase })
  //       );
  //       if (phaseData && ("topic" in phaseData || "title" in phaseData)) {
  //         if (initialPhase === 0) {
  //           formik.setFieldValue("topic", phaseData.topic || "");
  //           formik.setFieldValue("language", phaseData.language || "");
  //           formik.setFieldValue(
  //             "num_of_keywords",
  //             phaseData.num_keywords || ""
  //           );
  //           dispatch(replaceKeywords(phaseData.selected_keywords || []));
  //         } else if (initialPhase === 1) {
  //           formik.setFieldValue("topic", phaseData.topic || "");
  //           formik.setFieldValue("language", phaseData.language || "");
  //           formik.setFieldValue("num_titles", phaseData.num_titles || "");
  //           formik.setFieldValue(
  //             "tone_of_voice",
  //             phaseData.tone_of_voice || ""
  //           );
  //           dispatch(replaceKeywords(phaseData.keywords || []));
  //           dispatch(setTitle(phaseData.selected_title || ""));
  //         } else if (initialPhase === 2) {
  //           formik.setFieldValue("topic", phaseData.topic || "");
  //           formik.setFieldValue("language", phaseData.language || "");
  //           formik.setFieldValue(
  //             "num_Of_points",
  //             phaseData.num_Of_points || ""
  //           );
  //           formik.setFieldValue(
  //             "tone_of_voice",
  //             phaseData.tone_of_voice || ""
  //           );
  //           dispatch(replaceKeywords(phaseData.keywords || []));
  //           dispatch(setTitle(phaseData.title || ""));
  //           dispatch(setSubTitles(phaseData.selected_SubTitles || []));
  //         } else {
  //           dispatch(setTitle(phaseData.title || ""));
  //           dispatch(setSubTitles(phaseData.selected_SubTitles || []));
  //           dispatch(replaceKeywords(phaseData.keywords));
  //           formik.setFieldValue(
  //             "num_Article_words",
  //             phaseData.num_Article_words || ""
  //           );
  //           formik.setFieldValue("language", phaseData.language || "");
  //           formik.setFieldValue(
  //             "tone_of_voice",
  //             phaseData.tone_of_voice || ""
  //           );
  //           dispatch(setArticle(phaseData.content || ""));
  //         }
  //         onPhaseChanched(initialPhase);
  //       }
  //     })();
  //   }
  // }, []);

  return (
    <form className={styles["main-form"]} onSubmit={formik.handleSubmit}>
      {phase > 1 ? (
        <Title />
      ) : (
        <Subject
          value={formik.values.topic}
          changeHandler={formik.handleChange}
        />
      )}
      {phase === 3 && <SubTitles />}
      {phase === 0 ? (
        <NumKeywords
          value={formik.values.num_of_keywords}
          changeHandler={formik.handleChange}
        />
      ) : (
        <>
          <Keywords
            className={`${phase !== 0 ? styles["input-container"] : ""}`}
          />
          {phase === 1 && (
            <NumTitles
              value={formik.values.num_titles}
              changeHandler={formik.handleChange}
            />
          )}
          <ContentStyle formik={formik} value={formik.values.tone_of_voice} />
        </>
      )}
      <Language />
      {phase === 3 && (
        <NumWords
          value={formik.values.num_Article_words}
          changeHandler={formik.handleChange}
        />
      )}
      <div
        className={`${
          phase === 1 ? "d-flex justify-content-between align-items-center" : ""
        }`}
      >
        <div
          className={`${phase !== 1 ? "col-12" : ""} ${
            phase === 2 ? "d-flex" : ""
          } ${phase === 3 ? "d-flex justify-content-between" : ""}`}
        >
          <button
            className={`${styles["submit-btn"]} btn d-flex align-items-center justify-content-center gap-2`}
            type="submit"
            disabled={loading || generatedIdLoading}
          >
            {loading || generatedIdLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">تحميل...</span>
              </>
            ) : phase === 0 ? (
              "اقتراح الكلمات المفتاحية"
            ) : phase === 1 ? (
              "اقتراح العناوين"
            ) : phase === 2 ? (
              "اقتراح العناوين الفرعية"
            ) : (
              "إنشاء المقال"
            )}
          </button>

          {/* {phase === 2 && (
            <input
              onChange={formik.handleChange}
              value={formik.values.num_Of_points}
              name="num_Of_points"
              type="number"
              placeholder="العدد"
              min={0}
              className={`${styles["input"]} form-control d-inline-block me-2`}
              id="num_Of_points"
            />
          )} */}
          {phase === 3 && article.length && (
            <button
              className={`${styles["to-editor-btn"]} btn `}
              type="button"
              onClick={async () => {
                // // Save Phase Three
                // const body = {
                //   content: article,
                //   title,
                //   language: formik.values.language,
                //   keywords,
                //   num_Article_words: formik.values.num_Article_words,
                //   tone_of_voice: formik.values.tone_of_voice,
                //   selected_SubTitles: subTitles,
                // };
                // await tryCatch(
                //   setPhase.bind(null, { id: newArticleId, phase, body })
                // );
                // dispatch(setContent(article));
                // dispatch(setTitle(title));
                navigate("/editor", {
                  state: {
                    article,
                    title,
                  },
                });
              }}
            >
              الإنتقال إلى المحرر
            </button>
          )}
        </div>
        {phase === 0 && (
          <>
            <Divider className={`${styles["skip"]}`}>أو</Divider>
            <p className={`${styles["skip"]} text-center`}>
              هل لديك كلمات مفتاحية بالفعل؟ أدخل الكلمات المفتاحية وتخطى هذه
              الخطوة
            </p>
            <Keywords
              className={`${phase !== 0 ? styles["input-container"] : ""}`}
            />
          </>
        )}
        <Arrows
          onPhaseChanched={onPhaseChanched}
          phase={phase}
          formik={formik}
        />
      </div>
    </form>
  );
}
