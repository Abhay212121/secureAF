import { useState } from "react";
import Form from "./Form";

export default function Login({ signup = false }) {
  const [loginData, setLoginData] = useState({
    userName: "",
    userPassword: "",
  });

  const [signupData, setSignupData] = useState({
    userName: "",
    userMail: "",
    userPassword: "",
    confirmUserPassword: "",
  });

  return (
    <div className="flex items-center justify-center h-screen bg-[#499ef393]">
      {/* <Form
        formHeading={"Log-in Form"}
        userData={loginData}
        setUserData={setLoginData}
      /> */}
      <Form
        formHeading={signup ? "Sign-up Form" : "Log-in Form"}
        userData={signup ? signupData : loginData}
        setUserData={signup ? setSignupData : setLoginData}
      />
    </div>
  );
}
