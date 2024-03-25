import React from "react";
import Header from "../../components/header/Header";
import Navbar from "./navbar/Navbar";
import styles from "./home.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Home;
