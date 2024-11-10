document.getElementById('formFiller').addEventListener('submit', function (e) {
    e.preventDefault();
    const fieldName = document.getElementById('fieldName').value;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { fieldName });
    });
});