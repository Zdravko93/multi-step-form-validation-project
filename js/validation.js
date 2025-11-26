import { formInputs, errorMessages } from "./dom.js";

const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegEx = /^\d{10}$/;
const nameRegEx = /^[A-Za-z]+( [A-Za-z]+)+$/;

export function setErrorMessage(index, msg) {
  errorMessages[index].textContent = msg;
  errorMessages[index].classList.toggle("show-error", !!msg);
}

export function validateForm() {
  let valid = true;

  formInputs.forEach((input, index) => {
    let value = input.value.trim();
    let error = "";

    if (!value) error = "This field is required";
    else if (index === 0 && !nameRegEx.test(value))
      error = "Please add valid name";
    else if (index === 1 && !emailRegEx.test(value))
      error = "Please enter a valid email";
    else if (index === 2 && !phoneRegEx.test(value))
      error = "Must be in 10-digit format";

    if (error) valid = false;

    setErrorMessage(index, error);
  });

  return valid;
}

export function enableLiveValidation() {
  formInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      let value = input.value.trim();
      let error = "";

      if (!value) error = "This field is required";
      else if (index === 0 && !nameRegEx.test(value))
        error = "Please enter valid name";
      else if (index === 1 && !emailRegEx.test(value))
        error = "Please enter a valid email";
      else if (index === 2 && !phoneRegEx.test(value))
        error = "Must be 10-digit format";

      setErrorMessage(index, error);
    });
  });
}

export function resetForm() {
  formInputs.forEach((input, index) => {
    input.value = "";
    setErrorMessage(index, "");
  });
}
