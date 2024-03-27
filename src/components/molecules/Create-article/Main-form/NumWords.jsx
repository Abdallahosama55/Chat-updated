import styles from "./main.module.css";

export default function NumWords({ changeHandler, blurHandler, value }) {
  return (
    <div className={`${styles["input-container"]}`}>
      <label htmlFor="num_Article_words" className="form-label mb-1">
        عدد كلمات المقال
      </label>
      <input
        name="num_Article_words"
        type="number"
        min={0}
        className={`${styles["input"]} form-control`}
        id="num_Article_words"
        placeholder="اكتب عدد كلمات المقال التي تريد إنشائه"
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    </div>
  );
}
