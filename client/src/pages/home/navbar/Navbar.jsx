import React from "react";
import styles from "./navbar.module.css";
import Logo from "../../../components/logo/Logo";
import { Link, NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoHome } from "react-icons/go";
import { BiCartAdd } from "react-icons/bi";
import { TbUserExclamation } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user.data);

  const location = useLocation();
  const currentPath = location.pathname;

  const totalQuantity = user ? cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  ) : 0

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.left}>
          <Logo />
          <p>Home{currentPath}</p>
          <Link to={"/invoice"}>
            <p>Invoices</p>
          </Link>
        </div>
        <div>
          <Link to={"/cart"}>
            <button className={styles.cart + " " + "button1"}>
              <BsCart3 />
              <p>View Cart</p>
              <p>{totalQuantity}</p>
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.bottomnav}>
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? styles.select : ""
          }
        >
          <GoHome size={"2rem"} />
          <p>Home</p>
        </NavLink>
        <NavLink
          to={"/cart"}
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? styles.select : ""
          }
        >
          <BiCartAdd size={"2rem"} />
          <p>Cart</p>
        </NavLink>
        <div>
          <TbUser size={"2rem"} />
          <p>Login</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
