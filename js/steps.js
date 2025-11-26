import { steps, circles, billingErrorMessage } from "./dom.js";

import { validateForm } from "./validation.js";
import { storeSelectedPlan } from "./subscription.js";
import { storeSelectedAddOns } from "./addons.js";
import { outputSummary } from "./summary.js";

let currentStep = 0;

export function nextStep() {
  if (currentStep === 0 && !validateForm()) return;

  // step 2 requires plan selected
  if (currentStep === 1) {
    const selected = document.querySelector(".billing-options .option.active");
    if (!selected) {
      billingErrorMessage.classList.add("show-error");
      return;
    }
    storeSelectedPlan(selected);
  }

  if (currentStep === 2) storeSelectedAddOns();

  changeStep(1);
}

export function prevStep() {
  changeStep(-1);
}

function changeStep(direction) {
  steps[currentStep].style.display = "none";
  circles[currentStep].classList.remove("active");

  currentStep += direction;

  steps[currentStep].style.display = "flex";
  circles[currentStep].classList.add("active");

  if (currentStep === steps.length - 2) outputSummary();
}
