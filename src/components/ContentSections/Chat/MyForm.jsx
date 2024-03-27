import { Box, Button, Stack, Typography, Select } from "@mui/material";
import SelectOption from "./SelectOption";
import styles from "../main.module.css";

export default function MyForm({ card }) {
  const CustomizedSelectForFormik = ({ children, form, field }) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    return (
      <Select
        name={name}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };

  return (
    <Box
      className="rounded-4 mt-4"
      sx={{
        border: "1px solid rgba(82, 37, 206, 0.2)",
        minWidth: 450,
        flex: 1,
        px: 5,
        py: 7,
      }}
    >
      <Stack style={{ height: "100%" }} gap={5}>
        <Stack
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"start"}
          gap={2}
        >
          <img src={card.image_path}></img>
          <Box>
            <Typography
              variant="h6"
              color={"#692BEF"}
              fontSize={16}
              fontWeight={500}
              textAlign={"start"}
            >
              {card.title}
            </Typography>
            <Typography
              variant="body1"
              color={"#001A78"}
              fontSize={14}
              fontWeight={300}
              maxWidth="70%"
              textAlign={"start"}
            >
              {card.body}
            </Typography>
          </Box>
        </Stack>
        <form className={styles["myCustomForm"]}>
          <Stack justifyContent={"space-between"} height={"100%"} gap={2}>
            <Box>
              <label htmlFor="lang" style={{ color: "#001B79" }}>
                {"اختيار اللغة"}
              </label>
              <SelectOption
                name="lang"
                id="lang"
                options={[
                  { value: "ar", body: "العربيه" },
                  { value: "en", body: "الأنجليزية" },
                ]}
              />
            </Box>
            <Box>
              <label htmlFor="product" style={{ color: "#001B79" }}>
                {"اسم المنتج"}
              </label>
              <input
                type="text"
                id={"product"}
                placeholder="مثال: ساعة يد"
                className={styles["myCustomInput"]}
                style={{
                  marginTop: "0.3rem",
                  width: "100%",
                  padding: "9px",
                  borderRadius: "10px",
                  outline: "none",
                  border: "1px solid #001A7880",
                  color: "#001A7880",
                }}
              />
            </Box>
            <Box>
              <label htmlFor="people" style={{ color: "#001B79" }}>
                {"الجمهور المستهدف"}
              </label>
              <input
                className={styles["myCustomInput"]}
                type="text"
                id={"people"}
                placeholder="مثال: الرجال"
                style={{
                  marginTop: "0.3rem",
                  width: "100%",
                  padding: "9px",
                  borderRadius: "10px",
                  outline: "none",
                  border: "1px solid #001A7880",
                  color: "#001A7880",
                }}
              />
            </Box>
            <Box>
              <label htmlFor="breef" style={{ color: "#001B79" }}>
                {"نبذه عن المنتج"}
              </label>
              <textarea
                className={styles["myCustomInput"]}
                rows={5}
                id={"breef"}
                placeholder="مثال:  تأتي بتصاميم متنوعة تتناسب مع مختلف الأذواق والاحتياجات، مثل..."
                style={{
                  resize: "none",
                  marginTop: "0.3rem",
                  width: "100%",
                  padding: "9px",
                  borderRadius: "10px",
                  outline: "none",
                  border: "1px solid #001A7880",
                  color: "#001A7880",
                }}
              />
            </Box>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              gap={2}
            >
              <Box sx={{ flex: 1 }}>
                <label htmlFor="style" style={{ color: "#001B79" }}>
                  {"اسلوب المحتوى"}
                </label>
                <SelectOption
                  name="style"
                  id="style"
                  options={[
                    { value: "friendly", body: "ودود" },
                    { value: "serious", body: "جاد" },
                  ]}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <label htmlFor="num" style={{ color: "#001B79" }}>
                  {"عدد النتائج"}
                </label>
                <SelectOption
                  name="num"
                  id="num"
                  options={[
                    { value: "four", body: "4" },
                    { value: "three", body: "3" },
                    { value: "two", body: "2" },
                    { value: "one", body: "1" },
                  ]}
                />
              </Box>
            </Stack>
            <Button
              sx={{
                alignSelf: "center",
                background: "#5225CE",
                borderRadius: "10px",
                color: "#fff",
                px: "5rem",
                py: "0.7rem",
                maxWidth: "200px",
                mt: "1.5rem",
                mb: "-0.5rem",
                "&:hover": { background: "#5225CEF0" },
              }}
            >
              {"إنشاء"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
