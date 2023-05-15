import "./Pagination.css";
import { useState } from "react";

// Props interface
interface Props {
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages: number | undefined;
  handleChangePage: (page: number) => void;
}

// Pagination component
const Pagination = ({
  currentPage,
  numberOfPages = 1,
  setPage,
  handleChangePage,
}: Props) => {
  const [firstPageToShow, setFirstPageToShow] = useState<number>(1);

  const pages: number[] = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  //   Handle click hook
  const handleClick = (
    page: number,
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    setPage(page);
    e.preventDefault();
    handleChangePage(page);
  };

  //   handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="list-of-pages">
      <button
        disabled={currentPage === 1}
        onClick={(e) => handleClick(currentPage - 1, e)}
      >
        Prev
      </button>
      <button disabled={currentPage <= 10}>{"<<"}</button>
      {pages.slice(firstPageToShow - 1, 10).map((page) => (
        <a
          className={page !== currentPage ? "page" : "page current-page"}
          href=""
          key={page}
          onClick={(e) => {
            handleClick(page, e);
            handleScrollToTop();
          }}
        >
          {page}
        </a>
      ))}
      <button disabled={numberOfPages < 10 && currentPage > numberOfPages - 10}>
        {">>"}
      </button>
      <button
        disabled={currentPage === numberOfPages}
        onClick={(e) => handleClick(currentPage + 1, e)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
