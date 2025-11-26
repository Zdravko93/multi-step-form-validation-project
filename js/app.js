import {
  prevButtons,
  nextButtons,
  confirmButton,
  billingOptions,
  toggleSwitch,
} from "./dom.js";

import {
  highlightSubscription,
  updateSubscriptionText,
  enableKeyboardSelection,
} from "./subscription.js";
import { enableAddOnSelection } from "./addons.js";
import { nextStep, prevStep } from "./steps.js";
import { enableLiveValidation } from "./validation.js";

// enable live form validation
enableLiveValidation();

// plan selection
billingOptions.forEach((option) =>
  option.addEventListener("click", highlightSubscription)
);

// Enable plan selection via keyboard
enableKeyboardSelection();

// subscription toggle
toggleSwitch.addEventListener("change", updateSubscriptionText);

// next/previous buttons
nextButtons.forEach((btn) => btn.addEventListener("click", nextStep));
prevButtons.forEach((btn) => btn.addEventListener("click", prevStep));

// add-ons
enableAddOnSelection();

// confirmation button (go to "thank you" screen)
confirmButton.addEventListener("click", nextStep);
