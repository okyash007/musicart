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
          <DropDown
            button={
              <button className={styles.button + " " + "button1"}>
                Headphone type
              </button>
            }
          >
            <div className={styles.content}>
              {getFilters !== null
                ? getFilters.types.map((type) => (
                    <p
                      key={type}
                      onClick={() => {
                        setFilters((prev) => ({ ...prev, type }));
                      }}
                    >
                      {type}
                    </p>
                  ))
                : " "}
            </div>
          </DropDown>
          <DropDown
            button={
              <button className={styles.button + " " + "button1"}>
                Company
              </button>
            }
          >
            <div className={styles.content}>
              {getFilters !== null
                ? getFilters.brands.map((brand) => (
                    <p
                      key={brand}
                      onClick={() => {
                        setFilters((prev) => ({ ...prev, brand }));
                      }}
                    >
                      {brand}
                    </p>
                  ))
                : " "}
            </div>
          </DropDown>
          <DropDown
            button={
              <button className={styles.button + " " + "button1"}>Color</button>
            }
          >
            <div className={styles.content}>
              {getFilters !== null
                ? getFilters.colors.map((color) => (
                    <p
                      key={color}
                      onClick={() => {
                        setFilters((prev) => ({ ...prev, color }));
                      }}
                    >
                      {color}
                    </p>
                  ))
                : " "}
            </div>
          </DropDown>
          <DropDown
            button={
              <button className={styles.button + " " + "button1"}>Price</button>
            }
          >
            <div className={styles.content}>
              <p
                onClick={() => {
                  setFilters((prev) => ({ ...prev, lte: 1000 }));
                }}
              >
                0 - 1000
              </p>
              <p
                onClick={() => {
                  setFilters((prev) => ({ ...prev, lte: 10000, gte: 1000 }));
                }}
              >
                1000 - 10000
              </p>
              <p
                onClick={() => {
                  setFilters((prev) => ({ ...prev, lte: 20000, gte: 10000 }));
                }}
              >
                10000 - 20000
              </p>
            </div>
          </DropDown>
        </div>
        <div className={styles.right}>
          <DropDown
            button={
              <button className={styles.sort + " " + "button1"}>Sort by</button>
            }
          >
            <div className={styles.content + " " + styles.sortcontent}>
              <p
                onClick={() => {
                  setFilters((prev) => ({ ...prev, sort: "price%2B1" }));
                }}
              >
                Price : Lowest
              </p>
              <p
                onClick={() => {
                  setFilters((prev) => ({ ...prev, sort: "price-1" }));
                }}
              >
                Price : Highest
              </p>
              <p
                onClick={() => {
                  setFilters((prev) => ({ ...prev, sort: "name%2b1" }));
                }}
              >
                name : (A-Z)
              </p>
              <p
                onClick={() => {
                  setFilters((prev) => ({ ...prev, sort: "name-1" }));
                }}
              >
                name : (Z-A)
              </p>
            </div>
          </DropDown>
        </div>
      </div>
    </div>
  );
};

export default Filters;
