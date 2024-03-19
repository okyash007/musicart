import React from "react";
import Header from "../../components/header/Header";
import Navbar from "./navbar/Navbar";
import styles from "./home.module.css";
import Banner from "./banner/Banner";
import Filters from "./filters/Filters";

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Navbar />
        <Banner />
        <Filters />
      </div>
    </>
  );
};

export default Home;
