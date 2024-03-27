import { useDispatch, useSelector } from "react-redux";
import styles from "./main.module.css";
import {
  addSubTitleInPlace,
  changeSubTitle,
  delSubTitle,
} from "../../../../redux/slices/createArticle/articleSlice";
import toast from "react-hot-toast";

export default function SubTitles() {
  const { subTitles } = useSelector((s) => s.article);
  const dispatch = useDispatch();

  return (
    <div className={`${styles["input-container"]}`}>
      <p htmlFor={"sub-title"} className={`${styles["label"]} form-label mb-1`}>
        العناوين الفرعية
      </p>
      {subTitles.length ? (
        subTitles.map((sub, i) => (
          <div
            key={i}
            className="mb-3 d-flex align-items-center position-relative gap-2"
          >
            <span
              className={`${styles["hash"]} ms-1 position-absolute bottom-0 end-0 m-0`}
            >
              #
            </span>
            <input
              name={"subTitle" + i + 1}
              type="text"
              className={`${styles["input"]} form-control flex-grow-1 w-auto`}
              id={"sub-title" + i + 1}
              value={sub}
              onChange={(e) =>
                dispatch(changeSubTitle({ newSub: e.target.value, place: i }))
              }
            />
            <button
              onClick={() => dispatch(addSubTitleInPlace(i + 1))}
              type="button"
              className={`${styles["sub-title_btn"]} ${styles["sub-title_btn__add"]} btn p-0`}
            >
              +
            </button>
            <button
              type="button"
              className={`${styles["sub-title_btn"]} ${styles["sub-title_btn__del"]} btn p-0`}
              onClick={() => {
                if (subTitles.length > 1) dispatch(delSubTitle(sub));
                else
                  toast.error("لا يمكن مسح جميع العناوين الفرعية", {
                    style: { direction: "rtl" },
                  });
              }}
            >
              -
            </button>
          </div>
        ))
      ) : (
        <p className="text-danger bg-warning-subtle">لا يوجد عناوين فرعية</p>
      )}
    </div>
  );
}
