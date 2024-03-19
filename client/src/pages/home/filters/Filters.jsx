import React from "react";
import Search from "./search/Search";
import DropDown from "../../../components/dropdown/DropDown";
import styles from "./filters.module.css";

const Filters = () => {
  return (
    <div>
      <Search />
      <div className={styles.dropdown}>
        <DropDown>
          <p
            className={styles.content}
            onClick={() => {
              console.log("hiiii");
            }}
          >
            Filtersssssssssssssss
          </p>
        </DropDown>
        <DropDown>
          <p
            onClick={() => {
              console.log("hiiii");
            }}
          >
            Filterssssssssssssssssssssssssssssssssssss
          </p>
        </DropDown>
      </div>
      <h1>hiiii</h1>
    </div>
  );
};

export default Filters;
