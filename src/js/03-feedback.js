import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";
const storage = {
    addData: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getData: (key, defaultValue) => {
        try {
            const storageData = JSON.parse(localStorage.getItem(key));
            return storageData ? storageData : defaultValue;
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
        };
    },
    removeData: (key) => {
        localStorage.removeItem(key);
    },
};

let savedData;

addEventListener('DOMContentLoaded', populateForm)
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
    savedData[e.target.name] = e.target.value;
    storage.addData(STORAGE_KEY, savedData);
};

function onFormSubmit(e) {
    e.preventDefault();

    const formElements = e.currentTarget.elements;
    const email = formElements.email.value;
    const message = formElements.message.value;

    if (email === '' || message === '') {
       return alert(`All fields are required!`);
    };

    const formData = { email, message, };
    console.log(formData);

    form.reset();
    storage.removeData(STORAGE_KEY);
};

function populateForm() {
    savedData = storage.getData(STORAGE_KEY, {});
    form.email.value = savedData.email || "";
    form.message.value = savedData.message || "";
};

