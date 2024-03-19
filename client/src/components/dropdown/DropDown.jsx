import React, { Children, useState } from "react";
import styles from "./dropdown.module.css";
import { useClickOutSide } from "../../utils/hooks/useClickOutside";

const DropDown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useClickOutSide(() => {
    setIsOpen(false);
  });

  return (
    <div className={styles.bg} ref={dropDownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        open
      </button>
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
