import React, { useState } from "react";
import styles from "./login-signup.module.css";
import { validateEmailOrPhone } from "../../../utils/helper";
import * as Yup from "yup";
import { makePostRequest } from "../../../api/makePostRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store/userSlice";
import { setItems } from "../../../store/cartSlice";
import { backendUrl } from "../../../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailOrPhone: "",
    password: "",
  });

  const validationSchema = Yup.object({
    emailOrPhone: Yup.string()
      .required("Email or phone number is required")
      .test("validate-email-or-phone", "Invalid email or phone", (value) => {
        const result = validateEmailOrPhone(value);
        return result !== "unknown";
      }),
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
          emailOrPhone: "",
          password: "",
        });
        userLogin(formData);
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  async function userLogin(body) {
    const data = await makePostRequest(
      `${backendUrl}/api/v1/user/login`,
      body
    );

    if (data.success === true) {
      const { name, email, phone, ...rest } = data.data.user;
      localStorage.setItem("acess-token", data.data.acessToken);
      dispatch(setUser({ name, email, phone }));
      dispatch(setItems({ items: [], id: null }));
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.bg}>
      <h1 className={styles.heading}>Sign In</h1>
      <div className={styles.input}>
        <label htmlFor="emailOrPhone">Enter your email or mobile number</label>
        <input
          type="text"
          id="emailOrPhone"
          name="emailOrPhone"
          onChange={handleChange}
          value={formData.emailOrPhone}
        />
        {errors.emailOrPhone && (
          <p className={styles.error}>{errors.emailOrPhone}</p>
        )}
      </div>
      <div className={styles.input}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
      <p>
        By continuing, you agree to Musicart privacy notice and conditions of
        use.
      </p>
    </form>
  );
};

export default Login;
