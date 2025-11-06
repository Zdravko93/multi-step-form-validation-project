const formInputs = document.querySelectorAll(".step-1 form input");
const errorMessages = document.querySelectorAll(".input-control .error");

const nameRegEx = /^[A-Za-z]+( [A-Za-z]+)+$/;
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegEx = /^\d{10}$/;

export function initFormValidation() {
  formInputs.forEach((input, index) => {
    input.addEventListener("input", () => validateField(input, index));
  });
}

export function validateForm() {
  let isValid = true;

  formInputs.forEach((input, index) => {
    if (!validateField(input, index)) isValid = false;
  });

  return isValid;
}

function validateField(input, index) {
  const value = input.value.trim();
  let message = "";

  if (!value) {
    message = "This field is required";
  } else if (index === 0 && !nameRegEx.test(value)) {
    message = "Please add valid Lastname/Firstname";
  } else if (index === 1 && !emailRegEx.test(value)) {
    message = "Please enter a valid email address";
  } else if (index === 2 && !phoneRegEx.test(value)) {
    message = "Phone must be 10 digits";
  }

  errorMessages[index].textContent = message;
  errorMessages[index].classList.toggle("show-error", Boolean(message));

  return !message;
}
