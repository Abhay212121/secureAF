import Input from "./input";

export default function Form({ formHeading }) {
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
      />
      <Input
        inputType={"email"}
        inputPlaceHolder={"Enter your email"}
        inputName={"userMail"}
        inputId={"userMail"}
      />
      <Input
        inputType={"password"}
        inputPlaceHolder={"Enter your password"}
        inputName={"userPassword"}
        inputId={"userPassword"}
      />
      <Input
        inputType={"password"}
        inputPlaceHolder={"Confirm your password"}
        inputName={"confirmUserPassword"}
        inputId={"confirmUserPassword"}
      />
      <div className="flex gap-1 items-center">
        <Input
          inputType={"checkbox"}
          inputName={"termsAndConditionBox"}
          inputId={"termsAndConditionBox"}
          checkBoxFlag={true}
        />
        <label
          htmlFor="termsAndConditionBox"
          className="font-form-text"
        >
          I accept all terms & condition.
        </label>
      </div>
      <button className="font-x py-2 bg-[#4070F4] rounded-lg text-white">
        Register Now
      </button>
      <p className="font-form-text mx-auto">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-[#4070F4] font-form-text"
        >
          {" "}
          Login Now
        </a>
      </p>
    </div>
  );
}
