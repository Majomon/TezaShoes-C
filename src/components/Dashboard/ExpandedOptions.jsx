import Link from "next/link";

function ExpandedOptions({ options }) {
  
  return (
    <div className="flex flex-col ml-6">
      {options.map((option, index) => (
        <Link href={option.url} key={index}>
          <button className="text-xs cursor-pointer">{option.text}</button>
        </Link>
      ))}
    </div>
  );
}

export default ExpandedOptions;
