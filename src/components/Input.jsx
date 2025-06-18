export default function Input({
  inputType,
  inputPlaceHolder,
  inputName,
  inputId,
  isCheckBox = false,
  className,
  inputValue,
  userData,
  setUserData,
  setCheck,
  checked,
  label = "",
  validationErrors = [],
  inputErrorActive,
}) {
  const handleInputChange = (e) => {
    if (inputType == "checkbox") {
      setCheck(e.target.checked);
    } else {
      const tempObj = { ...userData };
      tempObj[inputName] = e.target.value;
      setUserData(tempObj);
    }
  };

  const inputError = Array.isArray(validationErrors)
    ? validationErrors.find((error) => error.path === inputId)
    : null;

  return (
    <div className={`flex flex-col gap-1  ${className}`}>
      <div>
        <label
          htmlFor={inputId}
          className="font-form-head text-lg"
        >
          {label}
        </label>
        {inputError && (
          <span className="text-red-400 float-right font-head">
            {inputError.msg}
          </span>
        )}
      </div>
      <input
        type={inputType}
        placeholder={inputPlaceHolder}
        name={inputName}
        id={inputId}
        value={inputType == "checkbox" ? undefined : inputValue}
        checked={inputType == "checkbox" ? checked : undefined}
        onChange={handleInputChange}
        className={`font-form-head border-1 px-4 py-1 rounded-sm shadow cursor-pointer hover:shadow-md hover:border-[#4070F4] focus:border-[#4070f4] focus:cursor-default transition duration-200
      ${
        isCheckBox
          ? `w-fit mb-[2px] hover:bg-[gray] ${checked ? "" : "animate-bounce"}`
          : "w-full"
      }
      ${inputError && inputErrorActive ? "border-red-400" : ""}
      `}
      />
    </div>
  );
}
