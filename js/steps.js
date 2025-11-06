let currentStep = 0;

const steps = document.querySelectorAll(".step");
const circles = document.querySelectorAll(".circle");
const prevButtons = document.querySelectorAll(".previous-step-button");
const nextButtons = document.querySelectorAll(".next-step-button");

export function initStepNavigation() {
  showStep(currentStep);

  prevButtons.forEach((btn) =>
    btn.addEventListener("click", () => updateStep("previous"))
  );

  nextButtons.forEach((btn) =>
    btn.addEventListener("click", () => updateStep("next"))
  );
}

function showStep(index) {
  steps.forEach((step, i) => {
    step.style.display = i === index ? "flex" : "none";
    circles[i].classList.toggle("active", i === index);
  });
}

function updateStep(direction) {
  if (direction === "next" && currentStep < steps.length - 1) {
    currentStep++;
  } else if (direction === "previous" && currentStep > 0) {
    currentStep--;
  }
  showStep(currentStep);
}
