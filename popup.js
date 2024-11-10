// Sample fieldValues object
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
    },
    customFields: [] // Array to hold custom fields
};

// Function to populate input fields with existing values
function populateFields() {
    for (const field in fieldValues) {
        if (field !== 'customFields') { // Skip customFields
            const input = document.getElementById(field);
            if (input) {
                input.value = fieldValues[field].value; // Set the value of the input field
            }
        }
    }
}

// Function to save the values from the input fields back to fieldValues
function saveValues() {
    let allSaved = true; // Flag to check if all fields are saved successfully
    const customFieldsContainer = document.getElementById('customFieldsContainer');

    // Clear previous custom fields
    fieldValues.customFields = [];

    // Save predefined fields
    for (const field in fieldValues) {
        if (field !== 'customFields') { // Skip customFields
            const input = document.getElementById(field);
            if (input) {
                fieldValues[field].value = input.value; // Update the value in fieldValues
            }
        }
    }

    // Save custom fields
    const customFields = customFieldsContainer.getElementsByClassName('customField');
    for (let i = 0; i < customFields.length; i++) {
        const labelInput = customFields[i].querySelector('.customFieldLabel');
        const keywordInput = customFields[i].querySelector('.customFieldKeywords');
        const valueInput = customFields[i].querySelector('.customFieldValue');

        const label = labelInput.value.trim();
        const keywords = keywordInput.value.trim().split(',').map(k => k.trim());
        const value = valueInput.value.trim();

        if (label && value) {
            fieldValues.customFields.push({ label, keywords, value }); // Add non-empty custom fields to the array
        }
    }

    // Display save status message
    const saveMessage = document.getElementById('saveMessage');
    if (allSaved) {
        saveMessage.textContent = 'All fields saved successfully!';
        saveMessage.style.color = 'green';
    } else {
        saveMessage.textContent = 'Some fields were not saved. Please check your inputs.';
        saveMessage.style.color = 'red';
    }
    
    console.log('Values saved:', fieldValues); // You can replace this with actual saving logic
}

// Function to add a custom field
function addCustomField() {
    const customFieldsContainer = document.getElementById('customFieldsContainer');
    const customFieldDiv = document.createElement('div');
    customFieldDiv.className = 'customField';
    
    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.className = 'customFieldLabel';
    labelInput.placeholder = 'Custom Field Label';

    const keywordInput = document.createElement('input');
    keywordInput.type = 'text';
    keywordInput.className = 'customFieldKeywords';
    keywordInput.placeholder = 'Keywords (comma separated)';

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.className = 'customFieldValue';
    valueInput.placeholder = 'Custom Field Value';
    
    customFieldDiv.appendChild(labelInput);
    customFieldDiv.appendChild(keywordInput);
    customFieldDiv.appendChild(valueInput);
    customFieldsContainer.appendChild(customFieldDiv);
}

// Event listener for the save button
document.getElementById('save').addEventListener('click', saveValues);

// Event listener for the add custom field button
document.getElementById('addCustomField').addEventListener('click', addCustomField);

// Populate fields when the popup is opened
populateFields();