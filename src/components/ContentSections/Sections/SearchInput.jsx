import styles from "../main.module.css";
import { IoSearchSharp } from "react-icons/io5";
export default function SearchInput(props) {
  return (
    <div
      className="row w-100 h-100 justify-content-between m-0 align-items-center"
      style={{ position: "relative" }}
      {...props}
    >
      <div style={{ position: "absolute" }}>
        <input
          id="searchInp"
          type="text"
          placeholder="بحث"
          className={`${styles["myCustomSearchInput"]} col-9 border-0`}
          style={{
            textAlign: "center",
            color: "#001A78",
            height: "100%",
            outline: "none",
          }}
        />
        <label htmlFor="searchInp" className="col-3" style={{ cursor: "text" }}>
          <IoSearchSharp fontSize={27} color="#001A78" opacity={0.5} />
        </label>
      </div>
    </div>
  );
}
