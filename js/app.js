import { initStepNavigation } from "./steps.js";
import { initFormValidation } from "./validation.js";
import { initPlanSelection } from "./plan.js";
import { initAddOns } from "./addons.js";
import { initSummary } from "./summary.js";

document.addEventListener("DOMContentLoaded", () => {
  initFormValidation();
  initStepNavigation();
  initPlanSelection();
  initAddOns();
  initSummary();
});
