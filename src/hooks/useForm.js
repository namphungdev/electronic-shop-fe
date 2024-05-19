import { validate } from "@/utils";
import { useEffect, useRef, useState } from "react";

export const useForm = (
  rules = {},
  { initialValue = {}, dependencies = {} } = {}
) => {
  //   dependencies: {
  // password: ["confirmPassword"],
  // },
  const [form, setForm] = useState(initialValue);

  useEffect(() => {
    setForm(initialValue);
  }, [JSON.stringify(initialValue)]);

  const [errors, setErrors] = useState({});

  const formRef = useRef();
  const register = (name) => {
    return {
      error: errors?.[name] || "",
      value: form?.[name] || "",
      id: name,
      name,
      onChange: (value) => {
        let _form = { ...form, [name]: value }; //cập nhật giá trị mới nhất
        if (Array.isArray(rules[name]) && rules[name].length > 0) {
          const errObj = {};

          //tạo error mới
          errObj[name] = validate({ [name]: rules[name] }, _form)[name];
          // 1)setErrors((errors) => ({ ...errors, [name]: errObj[name] })); //validate trong lúc nhập data
          // if (!_form[name]?.trim()) {
          //   setErrors((error) => ({ ...error, [name]: "" }));
          // } // khi xóa thì tắt validate
          setErrors((error) => ({ ...error, [name]: "" })); //2)mất error khi nhập
          //validate field phụ thuộc
          if (
            Array.isArray(dependencies[name]) &&
            dependencies[name].length > 0
          ) {
            for (const dependency of dependencies[name]) {
              // ===== validate lúc đang nhập data =====
              if (
                typeof _form[dependency] === "string" &&
                _form[dependency]?.trim()
              ) {
                //===chỉ validate khi có dữ liệu===
                errObj[dependency] = validate(
                  { [dependency]: rules[dependency] },
                  _form
                )[dependency];
                setErrors((error) => ({
                  ...error,
                  [dependency]: errObj[dependency],
                }));
              }
            }
          }
        }
        setForm((form) => ({ ...form, [name]: value }));
      },
    };
  };

  const _validate = () => {
    const errorObject = validate(rules, form);
    if (errorObject) {
      setErrors(errorObject);
      if (formRef.current && Object.keys(errorObject).length > 0) {
        const fieldName = Object.keys(errorObject);
        formRef.current.querySelector(`input[name=${fieldName[0]}]`)?.focus();
      }

      return Object.keys(errorObject).length === 0;
    }
  };

  const reset = () => {
    setForm({});
  };

  return {
    form,
    errors,
    register,
    validate: _validate,
    reset,
    formRef,
    setForm,
  };
};
