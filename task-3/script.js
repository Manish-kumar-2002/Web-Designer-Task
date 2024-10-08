const form = document.getElementById("dynamic-form");
const addFieldBtn = document.getElementById("add-field-btn");
const submitBtn = document.getElementById("submit-btn");
const formFieldsContainer = document.getElementById("form-fields");
const customAlert = document.getElementById("custom-alert");
const closeAlert = document.getElementById("close-alert");

let fieldCount = 0;
const fields = [];

const createField = () => {
  fieldCount++;
  const field = document.createElement("input");
  field.classList.add("input-field");
  field.setAttribute("type", "text");
  field.setAttribute("placeholder", `Field ${fieldCount}`);
  field.setAttribute("data-id", fieldCount);

  formFieldsContainer.appendChild(field);

  const fieldObj = {
    element: field,
    timer: setTimeout(() => {
      if (field.value.trim() === "") {
        removeField(field);
      }
    }, 10000),
  };
  fields.push(fieldObj);

  handleInputValidation(fieldObj);
  validateFields();
};

const handleInputValidation = (fieldObj) => {
  fieldObj.element.addEventListener("input", () => {
    if (fieldObj.element.value.trim() !== "") {
      clearTimeout(fieldObj.timer);
    } else {
      fieldObj.timer = setTimeout(() => {
        removeField(fieldObj.element);
      }, 10000);
    }
    validateFields();
  });
};

const removeField = (field) => {
  formFieldsContainer.removeChild(field);

  const index = fields.findIndex((f) => f.element === field);
  if (index !== -1) {
    fields.splice(index, 1);
  }

  validateFields();
};

const validateFields = () => {
  const allValid = fields.every(
    (fieldObj) => fieldObj.element.value.trim() !== ""
  );
  submitBtn.disabled = !allValid; // Enable submit if all fields are valid
};

const showAlert = () => {
  customAlert.classList.remove("hidden");
};

const hideAlert = () => {
  customAlert.classList.add("hidden");
  location.reload();
};

addFieldBtn.addEventListener("click", () => {
  createField();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!submitBtn.disabled) {
    showAlert();
  }
});

closeAlert.addEventListener("click", hideAlert);
