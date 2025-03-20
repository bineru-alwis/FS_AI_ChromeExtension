console.log("Content script loaded!");

// Function to extract claim details
function extractClaimDetails() {
    const claimContainer = document.querySelector(".col-md-12.nopadding.header-center");
    
    if (!claimContainer) {
        console.error("Claim details container not found!");
        return { error: "Claim details not found!" };
    }

    // Extract relevant details using querySelector inside the container
    const claimNumber = claimContainer.querySelector("#lblClaimNumber")?.innerText.trim() || "N/A";
    const claimant = claimContainer.querySelector(".normal-label.control-result-label.control-overflow")?.innerText.trim() || "N/A";
    const claimOwner = claimContainer.querySelector(".normal-label.control-result-label.control-overflow-label.ng-binding")?.innerText.trim() || "N/A";
    const claimType = claimContainer.querySelector(".fullwidth-low-res .ng-binding")?.innerText.trim() || "N/A";
    const claimStatus = claimContainer.querySelector(".progress-label label")?.innerText.trim() || "N/A";
    const claimAge = claimContainer.querySelector(".control-result-label-pullRight .ng-binding")?.innerText.trim() || "N/A";

    return {
        claimNumber,
        claimant,
        claimOwner,
        claimType,
        claimStatus,
        claimAge
    };
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message in content script:", request);
    if (request.action === "extract_claim_details") {
        const details = extractClaimDetails();
        console.log("Extracted claim details:", details);
        sendResponse(details);
    }
});
