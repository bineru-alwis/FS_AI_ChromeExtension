console.log("Content script loaded!");

function extractPageText() {
    let textContent = "";
    /*document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, span, div").forEach(el => {
        if (el.innerText.trim().length > 0) {
            textContent += el.innerText + "\n";
        }
    });*/

    document.querySelectorAll("span").forEach(el => {
        if (el.innerText.trim().length > 0) {
            textContent += el.innerText + "\n";
        }
    });

    if (textContent.trim().length === 0) {
        console.error("No text content found on page!");
    }

    return textContent || "No text content found!";
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message in content script:", request);
    if (request.action === "extract_text") {
        const text = extractPageText();
        sendResponse({ text });
    }
});
