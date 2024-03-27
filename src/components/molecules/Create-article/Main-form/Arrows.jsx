import { useSelector } from "react-redux";
import styles from "./main.module.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { tryCatch } from "@/Util/Create-article/helpers";
// import { useLazySetPhaseQuery } from "@/redux/slices/createArticle/createArticleEndpoints";
import toast from "react-hot-toast";

export default function Arrows({ phase, onPhaseChanched }) {
  const { keywords, title, subTitles, newArticleId } = useSelector(
    (s) => s.article
  );
  // const [setPhase] = useLazySetPhaseQuery();

  return (
    <div
      className={`${styles["arrows"]} d-flex 
				gap-3 justify-content-end ${phase !== 1 ? "" : ""}`}
    >
      <button
        type="button"
        disabled={phase < 1}
        className={`${phase < 1 ? styles["disabled"] : ""}`}
        onClick={() => onPhaseChanched(phase - 1)}
      >
        <NavigateNextIcon />
      </button>
      <button
        type="button"
        disabled={phase > 2}
        className={`${phase > 2 ? styles["disabled"] : ""}`}
        onClick={() => {
          if (phase === 0) {
            if (keywords.filter((k) => k).length) {
              onPhaseChanched(phase + 1);
              // const body = {
              //   topic: formik.values.topic,
              //   language: formik.values.language,
              //   num_keywords: formik.values.num_of_keywords,
              //   selected_keywords: keywords,
              // };
              // tryCatch(setPhase.bind(null, { id: newArticleId, phase, body }));
            } else
              toast.error(
                "برجاء إدخال الكلمات المفتاحية من المُقترحات أو يدويًا",
                {
                  style: { direction: "rtl" },
                }
              );
          }
          if (phase === 1) {
            if (title) {
              // const body = {
              //   topic: formik.values.topic,
              //   selected_title: title,
              //   language: formik.values.language,
              //   num_titles: formik.values.num_titles,
              //   tone_of_voice: formik.values.tone_of_voice,
              //   keywords,
              // };
              // tryCatch(setPhase.bind(null, { id: newArticleId, phase, body }));
              onPhaseChanched(phase + 1);
            } else
              toast.error("برجاء إختيار العنوان من المُقترحات", {
                style: { direction: "rtl" },
              });
          }
          if (phase === 2) {
            if (!subTitles.length)
              toast.error(`برجاء إختيار العناوين الفرعية من المُقترحات`, {
                style: { direction: "rtl" },
              });
            else {
              // const body = {
              //   topic: formik.values.topic,
              //   keywords,
              //   language: formik.values.language,
              //   num_Of_points: formik.values.num_Of_points,
              //   tone_of_voice: formik.values.tone_of_voice,
              //   selected_SubTitles: subTitles,
              //   title: title,
              // };
              // tryCatch(setPhase.bind(null, { id: newArticleId, phase, body }));
              onPhaseChanched(phase + 1);
            }
          }
        }}
      >
        <NavigateBeforeIcon />
      </button>
    </div>
  );
}
