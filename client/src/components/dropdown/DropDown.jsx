import React, { Children, useState } from "react";
import styles from "./dropdown.module.css";
import { useClickOutSide } from "../../utils/hooks/useClickOutside";

const DropDown = ({ children, button }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useClickOutSide(() => {
    setIsOpen(false);
  });

  return (
    <div className={styles.bg} ref={dropDownRef}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {button}
      </div>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen && children}
      </div>
    </div>
  );
};

export default DropDown;
