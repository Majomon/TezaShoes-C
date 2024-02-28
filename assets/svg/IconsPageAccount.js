export const IconUser = ({ active }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
    >
      <path
        fill={active ? "#EAB308" : "none"}
        stroke={active ? "#EAB308" : "#000000"}
        d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
      />
    </svg>
  );
};

export const IconDataBase = ({active}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
    >
      <path
        fill={active ? "#EAB308" : "none"}
        stroke={active ? "#EAB308" : "#000000"}
        d="m3 17l9 5l9-5v-3l-9 5l-9-5v-3l9 5l9-5V8l-9 5l-9-5l9-5l5.418 3.01"
      />
    </svg>
  );
};

export const IconShop = ({active}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
    >
      <g
        fill={active ? "#EAB308" : "#FFFFFF"}
        stroke={active ? "#FFFFFF" : "#000000"}
      >
        <path d="M6.331 8H17.67a2 2 0 0 1 1.977 2.304l-1.255 8.152A3 3 0 0 1 15.426 21H8.574a3 3 0 0 1-2.965-2.544l-1.255-8.152A2 2 0 0 1 6.331 8" />
        <path d="M9 11V6a3 3 0 0 1 6 0v5" />
      </g>
    </svg>
  );
};
