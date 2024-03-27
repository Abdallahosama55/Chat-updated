const PlusCircleIcon = ({ width = 32, height = 32 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="15.5"
        stroke="#5225CE"
      />
      <path
        d="M20.5 14.5H17.5V11.5C17.5 11.1022 17.342 10.7206 17.0607 10.4393C16.7794 10.158 16.3978 10 16 10C15.6022 10 15.2206 10.158 14.9393 10.4393C14.658 10.7206 14.5 11.1022 14.5 11.5L14.5533 14.5H11.5C11.1022 14.5 10.7206 14.658 10.4393 14.9393C10.158 15.2206 10 15.6022 10 16C10 16.3978 10.158 16.7794 10.4393 17.0607C10.7206 17.342 11.1022 17.5 11.5 17.5L14.5533 17.4467L14.5 20.5C14.5 20.8978 14.658 21.2794 14.9393 21.5607C15.2206 21.842 15.6022 22 16 22C16.3978 22 16.7794 21.842 17.0607 21.5607C17.342 21.2794 17.5 20.8978 17.5 20.5V17.4467L20.5 17.5C20.8978 17.5 21.2794 17.342 21.5607 17.0607C21.842 16.7794 22 16.3978 22 16C22 15.6022 21.842 15.2206 21.5607 14.9393C21.2794 14.658 20.8978 14.5 20.5 14.5Z"
        fill="#5225CE"
      />
    </svg>
  );
};

export default PlusCircleIcon;
