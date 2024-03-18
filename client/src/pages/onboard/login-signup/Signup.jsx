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
        console.log(formData);
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={formData.emailOrPhone}
        />
        {errors.name && <div>{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="phone">phone:</label>
        <input
          type="number"
          id="phone"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
        />
        {errors.phone && <div>{errors.phone}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default Signup;
