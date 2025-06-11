export default function Input({
  inputType,
  inputPlaceHolder,
  inputName,
  inputId,
  checkBoxFlag = false,
}) {
  return (
    <input
      type={inputType}
      placeholder={inputPlaceHolder}
      name={inputName}
      id={inputId}
      className={`font-form-text border-1 px-4 py-1 rounded-sm shadow cursor-pointer hover:border-2
      ${checkBoxFlag ? "w-fit mb-[2px] hover:bg-[gray]" : "w-full"}
      `}
    />
  );
}
