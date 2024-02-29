import {
  IconArrowNext,
  IconArrowPrev,
} from "../../../assets/Detail/IconDetails";

export default function PaginationDashboard({
  totalPagination,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  const lastPage = Math.ceil(totalPagination / productsPerPage);

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  const handleClicPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClicNext = () => {
    if (lastPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onEspecificPage = (numb) => {
    setCurrentPage(numb);
  };

  return (
    <div className="w-fit h-fit">
      <nav className="w-fit h-fit flex gap-1">
        <button
          onClick={handleClicPrev}
          className="border-1 rounded-full py-1 px-2.5"
        >
          <IconArrowPrev />
        </button>
        <ul className=" flex gap-1 h-fit">
          {pageNumbers.map((item) => (
            <li key={item}>
              <button
                className={`${
                  item === currentPage ? " bg-colorGoldSecundary-500" : ""
                } border-1 py-1 px-2.5 rounded-full`}
                onClick={() => onEspecificPage(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleClicNext}
          className="border-1 rounded-full py-1 px-2.5"
        >
          <IconArrowNext />
        </button>
      </nav>
    </div>
  );
}
