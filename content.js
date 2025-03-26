console.log("Content script loaded!");

    //Listen for messages from popup.js
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Received message in content script:", request);
        if (request.action === "extract_claim_details") {
            
            setTimeout(() => {
                //const details = extractClaimDetails();

                //Open the claim summary
                    const claimSummaryBtn = document.querySelector("button[ng-click='viewClaimSummary()']");
                    if (claimSummaryBtn) {
                        console.log("Clicking 'Claim Summary' button...");
                        claimSummaryBtn.click();
                    } else {
                        console.warn("Claim Summary button not found!");
                        sendResponse({ status: 'error', message: "Claim Summary button not found!" });
                    }
                
                    setTimeout(() => {
                        // Wait a bit to allow the modal to fully load
                        const details = extractClaimSummary();
                        console.log("Extracted claim details:", details);
                        sendResponse(details);
                        return false;
                    }, 4000);
                    

                //sendResponse(details);
                //return false;
                

            }, 1000); // Wait 1 second before clicking
            return true;
        }
    });


    function extractClaimSummary(){
        const claimContainer = document.querySelector(".col-md-12.nopadding.header-center");
        
        if (!claimContainer) {
            console.error("Claim details container not found!");
            return { error: "Claim details not found!" };
        }

        // Extract relevant details using querySelector inside the container
        const claimNumber = claimContainer.querySelector("#lblClaimNumber")?.innerText.trim() || "N/A";
        const claimOwner = claimContainer.querySelector(".normal-label.control-result-label.control-overflow-label.ng-binding")?.innerText.trim() || "N/A";
        const claimAge = claimContainer.querySelector(".control-result-label-pullRight .ng-binding")?.innerText.trim() || "N/A";

        let modal = document.querySelector(".modal-content");
                
                        if (modal) {
                            // Get claim status
                                        const claimStatusElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Claim Status'));
                                        const claimStatus = claimStatusElement ? claimStatusElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get claim phase
                                        const claimPhaseElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Claim Phase'));
                                        const claimPhase = claimPhaseElement ? claimPhaseElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get consignment note number
                                        const consignmentNoteElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Consignment Note/Label Number'));
                                        const consignmentNote = consignmentNoteElement ? consignmentNoteElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get claim nature
                                        const claimNatureElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Claim Nature'));
                                        const claimNature = claimNatureElement ? claimNatureElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get claimant name
                                        const claimantNameElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Claimant Name'));
                                        const claimantName = claimantNameElement ? claimantNameElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get claimant contact
                                        const claimantContactElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Claimant Contact'));
                                        const claimantContact = claimantContactElement ? claimantContactElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get claimant email
                                        const claimantEmailElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Claimant Email Address'));
                                        const claimantEmail = claimantEmailElement ? claimantEmailElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get claimant phone number
                                        const claimantPhoneElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Claimant Telephone Number'));
                                        const claimantPhone = claimantPhoneElement ? claimantPhoneElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get claim value
                                        const claimValueElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Claim Value'));
                                        const claimValue = claimValueElement ? claimValueElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get GST Included
                                        const gstIncludedElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('GST Included'));
                                        const gstIncluded = gstIncludedElement ? gstIncludedElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        // Get receiver name
                                        const receiverNameElement = Array.from(modal.querySelectorAll('label')).find(label => label.textContent.includes('Receiver Name'));
                                        const receiverName = receiverNameElement ? receiverNameElement.querySelector('span').textContent.trim() : 'N/A';
            
                                        const claimNumber = document.querySelector("#lblClaimNumber")?.textContent.trim();

        
                                        console.log(claimAge);

            
                                            if (claimNumber && consignmentNote) {
                                                return {
                                                    claimNumber,
                                                    consignmentNote,
                                                    claimantName,
                                                    claimantContact,
                                                    claimantEmail,
                                                    claimantPhone,
                                                    claimValue,
                                                    gstIncluded,
                                                    receiverName,
                                                    claimNature,
                                                    claimPhase,
                                                    claimStatus,
                                                    claimOwner,
                                                    claimAge
                                                };
            
                                            } else {
                                                return({ error: "Failed to extract some claim details." });
                                            }
                        } else {
                            alert("Claim summary popup not found!");
                        }
    }