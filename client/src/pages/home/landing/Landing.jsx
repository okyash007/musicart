import React from "react";
import Banner from "./banner/Banner";
import Filters from "./filters/Filters";
import Products from "./products/Products";

const Landing = () => {
  return (
    <>
      <Banner />
      <Filters />
      <Products />
    </>
  );
};

export default Landing;
