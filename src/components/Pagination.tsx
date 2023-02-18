import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
type Props = {
  currentPage: number;
  itemPerPage: number;
  totalPage: number;
  setCurrentPage: any;
  setItemPerPage: any;
};
const options = [10, 25, 50, 100];
import styles from "./Pagination.module.scss";

export const Pagination = (props: Props) => {
  const { currentPage, itemPerPage, totalPage, setCurrentPage, setItemPerPage } = props;
  const getCurrentPages = () => {
    if (currentPage + 3 > totalPage) {
      return [totalPage - 6, totalPage];
    } else if (currentPage - 3 > 0) {
      return [currentPage - 3, currentPage + 3];
    } else {
      return [0, 6];
    }
  };

  const getPages = () => {
    const array = [];
    for (let i = 1; i <= totalPage; i++) array.push(i);
    return array;
  };

  const handlePerPage = (e: any) => {
    console.log(e.target.value);
    setItemPerPage(e.target.value);
    setCurrentPage(1);
  };

  const gotoPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const gotoNext = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <div>
        <button onClick={gotoPrev}>
          <BsArrowLeft size={24} />
        </button>
        {getPages()
          .slice(...getCurrentPages())
          .map((page) => (
            <span
              className={currentPage === page ? styles.active : undefined}
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page}
            </span>
          ))}
        {currentPage + 3 < totalPage ? "..." : null}
        <button onClick={gotoNext}>
          <BsArrowRight size={24} />
        </button>
        <select name="" onChange={handlePerPage} id="" defaultValue={itemPerPage}>
          {options.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
