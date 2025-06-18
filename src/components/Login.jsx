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
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-900 to-purple-800 min-h-screen">
      <Form
        formHeading={signup ? "Sign-up Form" : "Log-in Form"}
        userData={signup ? signupData : loginData}
        setUserData={signup ? setSignupData : setLoginData}
      />
    </div>
  );
}
