import React, { useEffect, useState } from "react";
import Search from "./search/Search";
import DropDown from "../../../../components/dropdown/DropDown";
import styles from "./filters.module.css";
import { makeGetRequest } from "../../../../api/makeGetRequest";
import { useDispatch, useSelector } from "react-redux";
import { setCard, setProducts } from "../../../../store/productSlice";
import { IoGrid } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import { FaRectangleList } from "react-icons/fa6";
import { FaRegRectangleList } from "react-icons/fa6";
import { backendUrl } from "../../../../utils/constants";

const Filters = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.product);
  const [filters, setFilters] = useState({});
  const [getFilters, setGetFilters] = useState(null);

  // function changeFilters(key, value) {
  //   setFilters((prev) => ({ ...prev, [key]: value }));
  // }

  async function getProducts(url) {
    const data = await makeGetRequest(url);
    dispatch(setProducts(data.data));
  }

  async function getFilter(url) {
    const data = await makeGetRequest(url);
    setGetFilters(data.data);
  }

  useEffect(() => {
    getProducts(
      `${backendUrl}/api/v1/product?name=&color=${
        filters.color ? filters.color : ""
      }&brand=${filters.brand ? filters.brand : ""}&type=${
        filters.type ? filters.type : ""
      }&lte=${filters.lte ? filters.lte : ""}&gte=${
        filters.gte ? filters.gte : ""
      }&sort=${filters.sort ? filters.sort : ""}`
    );
  }, [filters]);

  useEffect(() => {
    getFilter(`${backendUrl}/api/v1/product/filters`);
  }, []);

  return (
    <div className={styles.bg}>
      <div className={styles.search}>
        <Search />
      </div>
      <div className={styles.dropdown}>
        <div className={styles.left}>
          <div className={styles.icons}>
            {products.card === "grid" ? (
              <IoGrid size={"1.5rem"} />
            ) : (
              <IoGridOutline
                size={"1.5rem"}
                onClick={() => {
                  dispatch(setCard("grid"));
                }}
              />
            )}
            {products.card === "list" ? (
              <FaRectangleList size={"1.75rem"} />
            ) : (
              <FaRegRectangleList
                size={"1.75rem"}
                onClick={() => {
                  dispatch(setCard("list"));
                }}
              />
            )}
          </div>

          <select
            value={"Headphone type"}
            id="myDropdown"
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, type: e.target.value }));
            }}
            className={styles.select}
          >
            <option value="Headphone type" style={{ display: "none" }}>
              Headphone type
            </option>
            {getFilters !== null
              ? getFilters.types.map((type) => (
                  <option key={type} className={styles.option} value={type}>
                    {type}
                  </option>
                ))
              : " "}
          </select>
          <select
            value={"price"}
            onChange={(e) => {
              const [gte, lte] = e.target.value.split("-");
              if (gte == "0 ") {
                setFilters((prev) => ({ ...prev, gte: +gte }));
              }
              setFilters((prev) => ({ ...prev, lte: +lte, gte: +gte }));
            }}
            className={styles.select}
          >
            <option value="price" style={{ display: "none" }}>
              price
            </option>
            <option className={styles.option} value={"0-1000"}>
              0-1000
            </option>
            <option className={styles.option} value={"1000-5000"}>
              1000-5000
            </option>
            <option className={styles.option} value={"5000-10000"}>
              5000-10000
            </option>
          </select>
          <select
            value={"company"}
            id="myDropdown"
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, brand: e.target.value }));
            }}
            className={styles.select}
          >
            <option value="Company" style={{ display: "none" }}>
              Company
            </option>
            {getFilters !== null
              ? getFilters.brands.map((brand) => (
                  <option key={brand} className={styles.option} value={brand}>
                    {brand}
                  </option>
                ))
              : " "}
          </select>
          <select
            value={"Color"}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, color: e.target.value }));
            }}
            className={styles.select}
          >
            <option value="Color" style={{ display: "none" }}>
              Color
            </option>
            {getFilters !== null
              ? getFilters.colors.map((color) => (
                  <option key={color} className={styles.option} value={color}>
                    {color}
                  </option>
                ))
              : " "}
          </select>
        </div>
        <div className={styles.right}>
          <select
            value={"Sort"}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, sort: e.target.value }));
            }}
            className={styles.select}
          >
            <option value="Sort" style={{ display: "none" }}>
              Sort
            </option>
            <option className={styles.option} value={"price%2B1"}>
              Price : Lowest
            </option>
            <option className={styles.option} value={"price-1"}>
              Price : Highest
            </option>
            <option className={styles.option} value={"name%2b1"}>
              name : (A-Z)
            </option>
            <option className={styles.option} value={"name-1"}>
              name : (Z-A)
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
