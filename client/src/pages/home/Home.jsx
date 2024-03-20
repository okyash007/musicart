import React from "react";
import Header from "../../components/header/Header";
import Navbar from "./navbar/Navbar";
import styles from "./home.module.css";
import { Outlet } from "react-router-dom";

const Home = () => {

  return (
    <>
      <Header />
      <div className={styles.content}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Home;
