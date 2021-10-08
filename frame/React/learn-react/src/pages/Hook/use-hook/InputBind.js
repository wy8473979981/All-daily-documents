import React, { useState } from "react";
// initialValue默认输入
function useBind(initialValue) {
  const [value, setValue] = useState(initialValue || "");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return { value, onChange };
}
// 用法
function InputBind() {
  const inputProps = useBind("init");
  return (
    <p>
      <p>useBind实现 value:{inputProps.value}</p>
      <input {...inputProps} />
    </p>
  );
}

export default InputBind;
