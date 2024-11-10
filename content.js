// Define a mapping of field names to their respective values
const fieldValues = {
    name: "Rama Jha",
    email: "guy55222@gmail.com",
    "phone_number": "+91 82106 01529",
    "registration_answers.0.answer": "EdgewareDAO",
    "registration_answers.1.answer": "https://x.com/rama_vats",
    "registration_answers.4.answer": "https://linkedin.com/in/rama-jha",

    // Add more fields as needed
};

// Function to fill the form
function fillForm() {
    for (const fieldName in fieldValues) {
        const inputField = document.querySelector(`[name="${fieldName}"]`);
        if (inputField) {
            inputField.value = fieldValues[fieldName]; // Set the value of the input field
            inputField.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
        }
    }
}

// Set up a Mutation Observer to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            // Check if the form is now visible
            const form = document.querySelector('form'); // Adjust the selector as needed
            if (form) {
                fillForm(); // Fill the form when it appears
                observer.disconnect(); // Stop observing after filling the form
            }
        }
    });
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Listen for messages from the popup (if you still want to keep the popup functionality)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { fieldName } = request;

    if (fieldValues[fieldName]) {
        const inputField = document.querySelector(`[name="${fieldName}"]`);
        if (inputField) {
            inputField.value = fieldValues[fieldName];
            inputField.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
});