const PenIcon = ({ width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="5.19795"
        fill="white"
      />
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="5.19795"
        stroke="#5225CE"
      />
      <g clipPath="url(#clip0_691_1101)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.0984 5.36971C17.6765 4.9479 17.1043 4.71094 16.5076 4.71094C15.911 4.71094 15.3388 4.9479 14.9169 5.36971L14.3866 5.90071L18.0991 9.61321L18.6286 9.08296C18.8376 8.87402 19.0034 8.62597 19.1165 8.35296C19.2296 8.07995 19.2878 7.78734 19.2878 7.49183C19.2878 7.19633 19.2296 6.90371 19.1165 6.63071C19.0034 6.3577 18.8376 6.10964 18.6286 5.90071L18.0984 5.36971ZM17.0379 10.6737L13.3254 6.96121L6.50789 13.7795C6.3587 13.9287 6.25449 14.1168 6.20714 14.3225L5.43539 17.6637C5.40664 17.7877 5.40993 17.9171 5.44498 18.0395C5.48002 18.1619 5.54565 18.2734 5.63569 18.3634C5.72572 18.4534 5.8372 18.5191 5.95961 18.5541C6.08203 18.5892 6.21135 18.5925 6.33539 18.5637L9.67739 17.7927C9.88275 17.7452 10.0706 17.641 10.2196 17.492L17.0379 10.6737Z"
          fill="#5225CE"
        />
      </g>
      <defs>
        <clipPath id="clip0_691_1101">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(3 3)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PenIcon;
