import Link from "next/link";

function ButtonLink({ text, size, url }) {
  return (
    <Link href={`/${url}`}>
      <button
        type="button"
        className={`w-[${size}] text-gray-50  bg-gray-950 py-1 px-1 rounded-sm`}
      >
        {text}
      </button>
    </Link>
  );
}

export default ButtonLink;
