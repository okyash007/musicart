import React from "react";
import styles from "./search.module.css";
import { CgSearch } from "react-icons/cg";

const Search = () => {
  return (
    <div className={styles.bg}>
      <CgSearch size={20} color="#0000006a" />
      <input type="text" placeholder="Search by product name" />
    </div>
  );
};

export default Search;
