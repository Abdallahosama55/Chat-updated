import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";
import axios from "axios";
import { baseURL } from "../../../redux/api/url";

// Download Editor Content
export const downloadPdf = (editor) => {
  // Check if editor has content
  if (!editor.getText()) {
    toast.error("العنصر غير معرف");
    return;
  }
  try {
    const opt = {
      margin: 1,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(editor.getText()).set(opt).save();
    toast.success("تم تحميل الملف");
  } catch (error) {
    console.log(error);
  }
};

export const handleDownloadHTML = (editor) => {
  // Check if editor has content
  if (editor.getText().length === 0)
    return toast.error("لا يوجد محتوي لتحميله");
  try {
    const blob = new Blob([editor.getHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "editor_content.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};

export const handleDownload = (editor) => {
  // Check if editor has content
  if (editor.getText().length === 0)
    return toast.error("لا يوجد محتوي لتحميله");
  try {
    const element = document.createElement("a");
    const file = new Blob([editor.getText()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "editor_content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("تم تحميل الملف ");
  } catch (error) {
    console.log(error);
  }
};
export const downloadAsDocx = (editor) => {};

export async function insertImg(editor, id) {
  const token = localStorage.getItem("token");
  const maxWidth = 40;
  const maxHeight = 40;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        // Post the FormData object to the API endpoint
        const response = await axios.post(
          `${baseURL}v1/text-rephrase/texts/${id}/images/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure proper content type
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const uploadedImage = response.data.image;

        // Create an image element
        const img = new Image();
        img.crossOrigin = "anonymous"; // Set crossOrigin property
        img.src = `https://srv475086.hstgr.cloud${uploadedImage}`;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = maxWidth;
          canvas.height = maxHeight;

          // Draw the image onto the canvas with the desired dimensions
          ctx.drawImage(img, 0, 0, maxWidth, maxHeight);

          // Convert the canvas content to a data URL
          const resizedImageDataUrl = canvas.toDataURL("image/jpeg");

          // Set the resized image into the editor
          editor.chain().focus().setImage({ src: resizedImageDataUrl }).run();
        };
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  input.click();
}
