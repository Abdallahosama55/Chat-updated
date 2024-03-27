export default function SelectOption({ name, id, options }) {
  return (
    <>
      <select
        name={name}
        id={id}
        style={{
          marginTop: "0.3rem",
          width: "100%",
          padding: "9px",
          borderRadius: "10px",
          outline: "none",
          border: "1px solid #001A7880",
          color: "#001A7880",
          appearance: "none",
          background:
            "rgba(0, 0, 0, 0) url(https://cdn-icons-png.flaticon.com/512/32/32195.png) no-repeat scroll calc(3% + 3px) center / 8px auto",
        }}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index} style={{ padding: "5px" }}>
            {option.body}
          </option>
        ))}
      </select>
    </>
  );
}
