import Link from "next/link";
import { useState } from "react";
import ExpandedOptions from "./ExpandedOptions";
import { optionLinksDashboard } from "./listNav";

function ContainerNavLinksDashboard() {
  const [expandedOption, setExpandedOption] = useState(null);
  const handleOptionClick = (index) => {
    if (expandedOption === index) {
      setExpandedOption(null); 
    } else {
      setExpandedOption(index);
    }
  };
  return (
    <>
      {optionLinksDashboard.map((option, index) => (
        <div key={index} className="my-6">
          <Link
            href={`${option.url}`}
            className="flex gap-x-2 cursor-pointer"
            onClick={() => handleOptionClick(index)}
          >
            {option.icon}
            <p className="text-base font-semibold">{option.text}</p>
          </Link>
          {expandedOption === index && (
            <ExpandedOptions options={option.additionalOptions} />
          )}
        </div>
      ))}
    </>
  );
}

export default ContainerNavLinksDashboard;
