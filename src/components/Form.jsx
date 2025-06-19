import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message, Button } from "antd";

export default function Form({ formHeading, userData, setUserData }) {
  const [checked, setChecked] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [inputErrorActive, setInputErrorActive] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (
      userData.userPassword &&
      userData.confirmUserPassword &&
      userData.userPassword !== userData.confirmUserPassword
    ) {
      setPasswordMatchError("password not matching!");
    } else {
      setPasswordMatchError("");
    }
  }, [userData.userPassword, userData.confirmUserPassword]);

  const resetForm = () => {
    setUserData({
      userName: "",
      userMail: "",
      userPassword: "",
      confirmUserPassword: "",
    });
    setChecked(false);
    setValidationErrors([]);
  };

  const handleBtnClick = async () => {
    setLoading(true);

    if (formHeading == "Sign-up Form") {
      const { confirmUserPassword, ...rest } = userData;
      console.log("Form sent!");

      try {
        // const res = await axios.post("http://localhost:3000/api/signup", rest);
        const res = await axios.post(
          `${import.meta.env.BACKEND_URL}/api/signup`,
          rest
        );
        console.log("response received", res.data);
        resetForm();
        message.success("Successfull");
        navigate("/login");
      } catch (error) {
        setInputErrorActive(true);
        setValidationErrors(error.response.data);
      } finally {
        setLoading(false);
      }
    } else if (formHeading == "Log-in Form") {
      const finalPayLoad = { ...userData, rememberMe: checked };
      console.log("Form Sent!");

      try {
        const res = await axios.post(
          // "http://localhost:3000/api/login",
          `${import.meta.env.BACKEND_URL}/api/login`,
          finalPayLoad,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.status == 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("rememberMe", res.data.rememberMe);
          localStorage.setItem("username", res.data.userName);
          message.success(`Welcome ${res.data.userName}`);
          navigate("/");
        } else {
          console.log(res.data);
          setInputErrorActive(true);
          setValidationErrors([res.data]);
          message.error("login error!");
        }
      } catch (error) {
        console.log("ERR:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-100 flex flex-col gap-4 px-8 py-4 bg-white rounded-md ">
      <p className="group relative font-form-head text-2xl cursor-default w-fit !mb-0">
        {formHeading}
        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#4070F4] transition-all duration-300 group-hover:w-full"></span>
      </p>
      <Input
        inputType={"text"}
        inputPlaceHolder={"Enter Your Name"}
        inputName={"userName"}
        inputId={"userName"}
        label={"Username:"}
        inputValue={userData.userName}
        userData={userData}
        setUserData={setUserData}
        validationErrors={validationErrors}
        inputErrorActive={inputErrorActive}
      />
      <Input
        inputType={"email"}
        inputPlaceHolder={"Enter your email"}
        inputName={"userMail"}
        inputId={"userMail"}
        inputValue={userData.userMail}
        label={"Email:"}
        className={formHeading == "Sign-up Form" ? "" : "hidden"}
        userData={userData}
        setUserData={setUserData}
        validationErrors={validationErrors}
        inputErrorActive={inputErrorActive}
      />
      <Input
        inputType={"password"}
        inputPlaceHolder={"Enter your password"}
        inputName={"userPassword"}
        inputId={"userPassword"}
        inputValue={userData.userPassword}
        label={"Password:"}
        userData={userData}
        setUserData={setUserData}
        validationErrors={validationErrors}
        inputErrorActive={inputErrorActive}
        setValidationErrors={setValidationErrors}
      />
      <Input
        inputType={"password"}
        inputPlaceHolder={"Confirm your password"}
        inputName={"confirmUserPassword"}
        inputId={"confirmUserPassword"}
        label={"Confirm password:"}
        inputValue={userData.confirmUserPassword}
        className={formHeading == "Sign-up Form" ? "" : "hidden"}
        userData={userData}
        setUserData={setUserData}
        validationErrors={[
          { msg: passwordMatchError, path: "confirmUserPassword" },
        ]}
        inputErrorActive={inputErrorActive}
      />
      <div className="flex gap-1 items-center">
        <Input
          inputType={"checkbox"}
          inputName={"termsAndConditionBox"}
          inputId={"termsAndConditionBox"}
          isCheckBox={true}
          checked={checked}
          setCheck={setChecked}
          inputErrorActive={inputErrorActive}
        />
        <label
          htmlFor="termsAndConditionBox"
          className="font-form-text"
        >
          {formHeading == "Sign-up Form"
            ? "I accept all terms & condition"
            : "Remember me"}
        </label>
      </div>
      <Button
        onClick={handleBtnClick}
        disabled={
          isLoading ||
          (formHeading === "Sign-up Form" && !checked) ||
          !userData.userPassword ||
          (formHeading === "Log-in Form" && !userData.userName)
        }
        loading={isLoading}
        style={{
          backgroundColor: "#4070F4",
          borderColor: "#4070F4",
          color: "white",
        }}
      >
        {formHeading == "Sign-up Form" ? "Register Now" : "Log in"}
      </Button>
      <p className="cursor-default font-form-text mx-auto">
        {formHeading == "Sign-up Form"
          ? "Already have an account?"
          : "New User?"}{" "}
        <a
          href={formHeading == "Sign-up Form" ? "/login" : "/signup"}
          className="text-[#4070F4] group relative font-form-text"
        >
          {" "}
          {formHeading == "Sign-up Form" ? "Login Now" : "Sign up"}
          <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#4070F4] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </p>
    </div>
  );
}
