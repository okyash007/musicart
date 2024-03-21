import React, { useEffect } from "react";
import Search from "./search/Search";
import DropDown from "../../../../components/dropdown/DropDown";
import styles from "./filters.module.css";
import { makeGetRequest } from "../../../../api/makeGetRequest";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../../store/productSlice";

const Filters = () => {
  const dispatch = useDispatch();

  async function getProducts(url) {
    const data = await makeGetRequest(url);
    dispatch(setProducts(data.data));
  }

  useEffect(() => {
    getProducts("http://localhost:5000/api/v1/product");
  }, []);

  return (
    <div className={styles.bg}>
      <Search />
      <div className={styles.dropdown}>
        <DropDown button={<p>open</p>}>
          <p
            className={styles.content}
            onClick={() => {
              console.log("hiiii");
            }}
          >
            Filtersssssssssssssss
          </p>
        </DropDown>
        <DropDown button={<p>open</p>}>
          <p
            onClick={() => {
              console.log("hiiii");
            }}
          >
            Filterssssssssssssssssssssssssssssssssssss
          </p>
        </DropDown>
      </div>
    </div>
  );
};

export default Filters;
