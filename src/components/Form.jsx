import { useEffect, useState } from "react";
import Input from "./input";
import axios from "axios";

export default function Form({ formHeading, userData, setUserData }) {
  const [checked, setChecked] = useState(false);

  const handleBtnClick = () => {
    if (formHeading == "Sign-up Form") {
      if (
        userData.userPassword != "" &&
        userData.confirmUserPassword != "" &&
        userData.userPassword == userData.confirmUserPassword &&
        checked
      ) {
        console.log("Form sent!");
        axios
          .post("http://localhost:3000/signup", userData)
          .then((res) => {
            console.log("response received", res.data);
          })
          .catch((err) => console.log("ERR:", err));
      }
    } else if (formHeading == "Log-in Form") {
      setUserData((prev) => ({ ...prev, rememberMe: checked }));
      if (userData.userPassword != "") {
        console.log("Form Sent!");
        axios
          .post("http://localhost:3000/login", userData)
          .then((res) => console.log("Response Received", res.data))
          .catch((err) => console.log("ERROR:", err));
      }
    }
  };

  return (
    <div className="w-100 flex flex-col gap-4 px-8 py-4 bg-white rounded-md">
      <p className="group relative font-form-head text-2xl cursor-default w-fit">
        {formHeading}
        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#4070F4] transition-all duration-300 group-hover:w-full"></span>
      </p>
      <Input
        inputType={"text"}
        inputPlaceHolder={"Enter Your Name"}
        inputName={"userName"}
        inputId={"userId"}
        inputValue={userData.userName}
        userData={userData}
        setUserData={setUserData}
      />
      <Input
        inputType={"email"}
        inputPlaceHolder={"Enter your email"}
        inputName={"userMail"}
        inputId={"userMail"}
        inputValue={userData.userMail}
        className={formHeading == "Sign-up Form" ? "" : "hidden"}
        userData={userData}
        setUserData={setUserData}
      />
      <Input
        inputType={"password"}
        inputPlaceHolder={"Enter your password"}
        inputName={"userPassword"}
        inputId={"userPassword"}
        inputValue={userData.userPassword}
        userData={userData}
        setUserData={setUserData}
      />
      <Input
        inputType={"password"}
        inputPlaceHolder={"Confirm your password"}
        inputName={"confirmUserPassword"}
        inputId={"confirmUserPassword"}
        inputValue={userData.confirmUserPassword}
        className={formHeading == "Sign-up Form" ? "" : "hidden"}
        userData={userData}
        setUserData={setUserData}
      />
      <div className="flex gap-1 items-center">
        <Input
          inputType={"checkbox"}
          inputName={"termsAndConditionBox"}
          inputId={"termsAndConditionBox"}
          isCheckBox={true}
          checked={checked}
          setCheck={setChecked}
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
      <button
        onClick={handleBtnClick}
        className="font-x py-2 bg-[#4070F4] rounded-lg text-white cursor-pointer hover:scale-102 duration-200"
      >
        {formHeading == "Sign-up Form" ? "Register Now" : "Log in"}
      </button>
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
