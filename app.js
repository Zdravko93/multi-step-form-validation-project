const steps = document.querySelectorAll(".step");
const circles = document.querySelectorAll(".circle");
const formInputs = document.querySelectorAll(".step-1 form input");
const billingOptions = document.querySelectorAll(".billing-options .option");
const toggleSwitch = document.querySelector("#toggle");
const addOns = document.querySelectorAll(".services-option");
const allPreviousStepButtons = document.querySelectorAll(
  ".step .previous-step-button"
);
const allNextStepButtons = document.querySelectorAll(".next-step-button");
const confirmButton = document.querySelector(".confirm-button");
const selectedPlanElement = document.querySelector(
  ".options-final__payment__plan"
);
const selectedAddOnsElement = document.querySelector(".options-final__list");
const totalPriceElement = document.querySelector(".pricing-total");
const errorMessages = document.querySelectorAll(".input-control .error");
const billingErrorMessage = document.querySelector(".billing-error");

let currentStep = 0;
let currentCircle = 0;
let selectedPlan = {};
let selectedAddOns = [];

// Regular expression(s) for name, email and phone number input validation
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegEx = /^\d{10}$/;
const nameRegEx = /^[A-Za-z]+( [A-Za-z]+)+$/;

// separate function to set error message(s) to avoid repetition
function setErrorMessage(index, message) {
  errorMessages[index].textContent = message;
  if (message) {
    errorMessages[index].classList.add("show-error");
  } else {
    errorMessages[index].classList.remove("show-error");
  }
}

function validateForm() {
  let isValid = true;

  formInputs.forEach((formInput, index) => {
    const value = formInput.value.trim();
    let errorMessage = "";

    if (value === "") {
      errorMessage = "This field is required";
      isValid = false;
    } else if (index === 0 && !nameRegEx.test(value)) {
      // if 'index === 0 ' - user is typing inside name input field
      errorMessage = "Please add valid name";
      isValid = false;
    } else if (index === 1 && !emailRegEx.test(value)) {
      // if 'index === 1' - user is typing inside email input field
      errorMessage = "Please enter a valid email";
      isValid = false;
    } else if (index === 2 && !phoneRegEx.test(value)) {
      // if 'index === 2' - user is typing inside phone number input field
      errorMessage = "Must be in 10-digit format";
      isValid = false;
    }
    setErrorMessage(index, errorMessage);
  });
  return isValid;
}

// Real-time input validation-update input(s) validity as the user types
// For better/smoother User Experience
formInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    const value = input.value.trim();
    let errorMessage = "";

    if (value === "") {
      errorMessage = "This field is required";
    } else if (index === 0 && !nameRegEx.test(value)) {
      errorMessage = "Please enter valid name";
    } else if (index === 1 && !emailRegEx.test(value)) {
      errorMessage = "Please enter a valid email";
    } else if (index === 2 && !phoneRegEx.test(value)) {
      errorMessage = "Must be 10-digit format";
    }

    setErrorMessage(index, errorMessage);
  });
});

// Reset input field values function
function resetForm() {
  formInputs.forEach((formInput, index) => {
    // reset individual input value
    formInput.value = "";
    // remove .show-error class from the corresponding error message element index
    errorMessages[index].classList.remove("show-error");
    // reset text of the error message element to an empty string/hide error
    errorMessages[index].textContent = "";
  });
}

function updateStep(button) {
  // Prevent function from executing if the form is not valid
  //(when errors need to be displayed)
  if (button === "next" && !validateForm()) {
    return;
  }

  //Check if the current step is step 2 and validate the selection
  if (button === "next" && currentStep === 1) {
    const selectedOption = document.querySelector(
      ".billing-options .option.active"
    );
    if (!selectedOption) {
      billingErrorMessage.classList.add("show-error");
      return;
    } else {
      storeSelectedPlan(selectedOption);
    }
  }

  if (button === "next" && currentStep === 2) {
    storeSelectedAddOns();
  }

  steps[currentStep].style.display = "none";
  circles[currentCircle].classList.remove("active");

  // update current step index
  if (button === "previous") {
    currentStep--;
    currentCircle--;
  } else if (button === "next") {
    currentStep++;
    currentCircle++;
  }

  // show updated form step
  steps[currentStep].style.display = "flex";
  circles[currentCircle].classList.add("active");

  if (currentStep === steps.length - 2) {
    outputSummary();
  }

  if (currentStep === steps.length - 1) {
    console.log("Thank you modal");
    resetForm();
  }
}

function previousStep() {
  if (currentStep > 0) {
    updateStep("previous");
  }
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    updateStep("next");
  }
}

allPreviousStepButtons.forEach((button) => {
  button.addEventListener("click", previousStep);
});

allNextStepButtons.forEach((button) => {
  button.addEventListener("click", nextStep);
});

// Prices for monthly/yearly subscriptions
const monthlyPrices = ["$9/mo", "$12/mo", "$15/mo"];
const yearlyPrices = ["$90/yr", "$120/yr", "$150/yr"];

function updateSubscriptionText() {
  const isYearly = toggleSwitch.checked;

  billingOptions.forEach((option, index) => {
    const priceElement = option.querySelector(".option__price span");
    const yearlyPriceElement = option.querySelector(".yearly-price");

    if (isYearly) {
      priceElement.textContent = yearlyPriceElement[index];
      yearlyPriceElement.classList.remove("hidden");
    } else {
      priceElement.textContent = monthlyPrices[index];
      yearlyPriceElement.classList.add("hidden");
    }
  });
}

// add classes depending on the user subscription choice
function highlightSelectedSubscription(event) {
  billingOptions.forEach((option) => option.classList.remove("active"));

  event.currentTarget.classList.add("active");

  billingErrorMessage.classList.remove("show-error");
}

// update add-on prices depending on a user selection
// in step - monthly/yearly subscription
function updatePrices(isYearly) {
  const monthlyPrices = document.querySelectorAll(
    ".services-option .service-price"
  );
  const yearlyPrices = document.querySelectorAll(
    ".services-option .price-toggle"
  );

  if (isYearly) {
    monthlyPrices.forEach((priceElement, index) => {
      priceElement.textContent = yearlyPrices[index].textContent;
    });
  } else {
    yearlyPrices.forEach((priceElement, index) => {
      monthlyPrices[index].textContent = priceElement.textContent;
    });
  }
}

// store/save user's chosen subscription plan
function storeSelectedPlan(plan) {
  const planName = plan.querySelector("b").textContent;
  const planPriceElement = plan.querySelector(".option__price span");
  const monthlyPrice = planPriceElement.textContent;
  const yearlyPriceElement = plan.querySelector(".yearly-price");
  const yearlyPrice = yearlyPriceElement.textContent;
  // create a new object with user selected data
  selectedPlan = {
    name: planName,
    price: toggleSwitch.checked ? yearlyPrice : monthlyPrice,
    billing: toggleSwitch.checked ? "yearly" : "monthly",
  };
}

// Separate function to store user selected add-ons
function storeSelectedAddOns() {
  selectedAddOns = []; // clear previously selected add-ons
  addOns.forEach((addOn) => {
    if (addOn.classList.contains("selected")) {
      const addOnName = addOn.querySelector("b").textContent;
      const addOnPrice = addOn.querySelector(".service-price").textContent;
      selectedAddOns.push({ name: addOnName, price: addOnPrice });
    }
  });
}

// Output final prices and subscription
function outputSummary() {
  selectedPlanElement.innerHTML = `
    <div class="underline">
      <p class="charge">${selectedPlan.name} (${selectedPlan.billing})</p>
      <p class="charge-price">${selectedPlan.price}</p>
    </div>
  `;

  selectedAddOnsElement.innerHTML = selectedAddOns
    .map(
      (addOn) => `
      <div class="options-final__item">
        <p class="item">${addOn.name}</p>
        <p class="price">${addOn.price}</p>
      </div> 
    `
    )
    .join("");
  // return value of .map() is an array. Without using join() method here specifically,
  // the output would look like this:
  //  [
  //   "<div class='options-final__item'>...</div>",
  //   "<div class='options-final__item'>...</div>",
  //   "<div class='options-final__item'>...</div>"
  //  ]

  // With join() method these array members(each addOn element) are concatenated
  // into a single string and will look like this:
  // "<div class='options-final__item'>...</div><div class='options-final__item'>...</div><div class='options-final__item'>...</div>"

  const total = calculateTotalPrice();
  totalPriceElement.innerHTML = `
    <div>
      <p>Total</p>
      <b>${total}</b>
    </div>
  `;
}

function calculateTotalPrice() {
  // remove any non-digit character/replace with an empty string
  // parseFloat(...) - convert string into a number and prepares it for
  // numerical operations

  let total = parseFloat(selectedPlan.price.replace(/[^0-9.-]+/g, ""));

  selectedAddOns.forEach((addOn) => {
    total += parseFloat(addOn.price.replace(/[^0-9.-]+/g, ""));
  });

  return toggleSwitch.checked ? `$${total}/yr` : `$${total}/mo`;
}

billingOptions.forEach((option) => {
  option.addEventListener("click", highlightSelectedSubscription);

  option.addEventListener("keydown", (event) => {
    // Select with Enter or Space key
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // prevent scrolling when pressing Space
      option.click(); // trigger the same behavior as a mouse click
    }
  });
});

toggleSwitch.addEventListener("change", updateSubscriptionText);
toggleSwitch.addEventListener("change", function () {
  updatePrices(this.checked);
});

addOns.forEach((addOn) => {
  const input = addOn.querySelector("input");
  addOn.addEventListener("click", () => {
    if (addOn.classList.contains("selected")) {
      addOn.classList.remove("selected");
      input.checked = false;
    } else {
      addOn.classList.add("selected");
      input.checked = true;
    }
  });
});

confirmButton.addEventListener("click", () => {
  steps[currentStep].style.display = "none";

  currentStep++;

  if (currentStep >= steps.length) {
    currentStep = steps.length - 1;
  }

  steps.forEach((step) => {
    step.style.display = "none";
  });

  steps[currentStep].style.display = "flex";
});
