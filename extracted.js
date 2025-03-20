// extracted.js

// Ensure script runs only when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);

    console.log("Received URL parameters:", params.toString()); // Debugging

    const claimDetails = `
    Claim Number: ${params.get("claimNumber") || "N/A"}
    Claimant: ${params.get("claimant") || "N/A"}
    Claim Owner: ${params.get("claimOwner") || "N/A"}
    Claim Type: ${params.get("claimType") || "N/A"}
    Status: ${params.get("claimStatus") || "N/A"}
    Claim Age: ${params.get("claimAge") || "N/A"}
    `;

    console.log("Parsed Claim Details:", claimDetails); // Debugging

    document.getElementById("claimDetails").textContent = claimDetails;
});
