import styles from "./main.module.css";

export default function Subject({ changeHandler, value }) {
  return (
    <div className={`${styles["input-container"]}`}>
      <label htmlFor="topic" className="form-label mb-1">
        الموضوع
      </label>
      <input
        name="topic"
        type="text"
        className={`${styles["input"]} form-control`}
        id="topic"
        placeholder="اكتب الموضوع"
        onChange={changeHandler}
        value={value}
      />
    </div>
  );
}
