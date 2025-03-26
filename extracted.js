// extracted.js

// Ensure script runs only when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);

    console.log("Received URL parameters:", params.toString()); // Debugging
    
    const claimDetails = `
    Claim Number: ${params.get("claimNumber") || "N/A"}
    Consignment Number: ${params.get("consignmentNote") || "N/A"}
    Claimant Name: ${params.get("claimantName") || "N/A"}
    Claimant Contact: ${params.get("claimantContact") || "N/A"}
    Claimant Email: ${params.get("claimantEmail") || "N/A"}
    Claimant Phone: ${params.get("claimantPhone") || "N/A"}
    Claim Value: ${params.get("claimValue") || "N/A"}
    GST Included: ${params.get("gstIncluded") || "N/A"}
    Receiver Name: ${params.get("receiverName") || "N/A"}
    Claim Nature: ${params.get("claimNature") || "N/A"}
    Claim Phase: ${params.get("claimPhase") || "N/A"}
    Claim Status: ${params.get("claimStatus") || "N/A"}
    Claim Owner: ${params.get("claimOwner") || "N/A"}
    claim Age: ${params.get("claimAge") || "N/A"}
    `;

    console.log("Parsed Claim Details:", claimDetails); // Debugging

    document.getElementById("claimDetails").textContent = claimDetails;
});