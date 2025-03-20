// extracted.js

// Ensure script runs only when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);

    console.log("Received URL parameters:", params.toString()); // Debugging

    const claimDetails = `
    Claim Number: ${params.get("claimNumber") || "N/A"}
    consignmentNote: ${params.get("consignmentNote") || "N/A"}
    claimantName: ${params.get("claimantName") || "N/A"}
    claimantContact: ${params.get("claimantContact") || "N/A"}
    claimantEmail: ${params.get("claimantEmail") || "N/A"}
    claimantPhone: ${params.get("claimantPhone") || "N/A"}
    claimantEmail: ${params.get("claimValue") || "N/A"}
    claimantPhone: ${params.get("gstIncluded") || "N/A"}
    claimValue: ${params.get("receiverName") || "N/A"}
    gstIncluded: ${params.get("claimNature") || "N/A"}
    claimantPhone: ${params.get("claimPhase") || "N/A"}
    claimValue: ${params.get("claimStatus") || "N/A"}
    `;

    console.log("Parsed Claim Details:", claimDetails); // Debugging

    document.getElementById("claimDetails").textContent = claimDetails;
});



/*
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
                        claimStatus 
*/