import React, { useState } from "react";
import styles from "./login-signup.module.css";
import * as Yup from "yup";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    name: "",
    password: "",
  });

  const validationSchema = Yup.object({
    email: Yup.string().required("Email or phone number is required").email(),
    phone: Yup.string()
      .required("Phone number is required")
      .test("validate-phone", "Invalid phone number", (value) => {
        const result = /^[6-9]{1}[0-9]{9}$/.test(value.trim());
        return result;
      }),
    name: Yup.string().trim().required("Name is requered"),
    password: Yup.string()
      .required("Password is required")
      .test("validate-password", "Invalid password", (value) => {
        const result =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
            value
          );
        return result;
      }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors({
          email: "",
          phone: "",
          name: "",
          password: "",
        });
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.bg}>
        <h1 className={styles.heading}>Create account</h1>
        <div className={styles.input}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.emailOrPhone}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.input}>
          <label htmlFor="phone">Mobile number</label>
          <input
            type="number"
            id="phone"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
        <div className={styles.input}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <p>
          By enrolling your mobile phone number, you consent to receive
          automated security notifications via text message from Musicart.
          Message and data rates may apply.
        </p>
        <button type="submit">Sign up</button>
        <p>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </form>
      <p>Already have an account? Sign in</p>
    </>
  );
};

export default Signup;
