import React from 'react';

const TextWithSansSerifNumbers = ({ text }) => {
  // Function to check if a character is a number
  const isNumber = char => /\d/.test(char);

  // Function to convert numbers to sans-serif font
  const convertNumbersToSansSerif = str => {
    return str.split('').map((char, index) => {
      if (isNumber(char)) {
        return <span key={index} style={{ fontFamily: 'sans-serif' }}>{char}</span>;
      }
      return char;
    });
  };

  return (
    <div>
      {convertNumbersToSansSerif(text)}
    </div>
  );
};

export default TextWithSansSerifNumbers;
