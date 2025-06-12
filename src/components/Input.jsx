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

  return (
    <input
      type={inputType}
      placeholder={inputPlaceHolder}
      name={inputName}
      id={inputId}
      value={inputType == "checkbox" ? undefined : inputValue}
      checked={inputType == "checkbox" ? checked : undefined}
      onChange={handleInputChange}
      className={`font-form-text border-1 px-4 py-1 rounded-sm shadow cursor-pointer hover:shadow-md hover:border-[#4070F4] focus:border-[#4070f4] transition duration-200
      ${isCheckBox ? "w-fit mb-[2px] hover:bg-[gray]" : "w-full"} ${className}
      `}
    />
  );
}
