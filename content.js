// Define a mapping of keywords to their respective values
const fieldValues = {
    email: {
        keywords: ["email", "e-mail", "user email"],
        value: "guy55222@gmail.com",
    },
    name: {
        keywords: ["name", "full name", "your name"],
        value: "Rama Shankar Jha",
    },
    phone: {
        keywords: ["phone", "phone number", "mobile number"],
        value: "+918210601529",
    },
    telegram: {
        keywords: ["telegram", "telegram username", "tg"],
        value: "@iloveedgeware",
    },
    twitter: {
        keywords: ["twitter", "twitter handle", "x handle", "x username"],
        value: "https://x.com/rama_vats",
    },
    company: {
        keywords: ["company", "workplace", "company name", "project name"],
        value: "EdgewareDAO",
    },
    linkedin: {
        keywords: ["linkedin", "linkedin profile", "linkedin username"],
        value: "https://www.linkedin.com/in/rama-jha/",
    },
    designation: {
        keywords: ["role", "designation", "company role"],
        value: "JavaScript Developer",
    },
    ordinals_address: {
        keywords: ["ordinals", "ordinals address"],
        value: "bc1p99rj2a2es3pc87lsnkn3rcptn4sux4gzu49egawvhxpyv73qp7kqjscvnk",
    }
    // Add more fields as needed
};

// Function to fill the form based on keyword matching
function fillForm() {
    const inputs = document.querySelectorAll('input, textarea, select'); // Select all input and textarea fields

    inputs.forEach(inputField => {
        const name = inputField.getAttribute('name') || '';
        const id = inputField.getAttribute('id') || '';
        const placeholder = inputField.getAttribute('placeholder') || '';
        const label = document.querySelector(`label[for="${id}"]`)?.textContent || ''; // Get associated label text

        // Check if any of the keywords match
        for (const field in fieldValues) {
            const { keywords, value } = fieldValues[field];
            for (const keyword of keywords) {
                if (
                    name.toLowerCase().includes(keyword.toLowerCase()) ||
                    id.toLowerCase().includes(keyword.toLowerCase()) ||
                    placeholder.toLowerCase().includes(keyword.toLowerCase()) ||
                    label.toLowerCase().includes(keyword.toLowerCase())
                ) {
                    inputField.value = value; // Set the value of the input field
                    inputField.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
                    break; // Stop checking once a match is found
                }
            }
        }
    });
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
            inputField.value = fieldValues[fieldName].value;
            inputField.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
});