import React, { useState, useEffect } from "react";

const useTypingAnimation = (text, delay, isNew) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isNew && currentText) {
      setCurrentIndex(0);
      setCurrentText("");
    }
    if (currentIndex < text.length && !isNew) {
      const timeout = setTimeout(() => {
        if (Array.isArray(text)) {
          setCurrentText((prevText) => prevText + `${text[currentIndex]} `);
        } else setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, isNew]);

  return currentText;
};

export default useTypingAnimation;
