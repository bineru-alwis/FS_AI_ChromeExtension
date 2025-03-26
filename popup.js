document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("send");
    const promptInput = document.getElementById("prompt");
    const responseDiv = document.getElementById("response");
    const extractButton = document.getElementById("extract");

        /*const extractButton = document.getElementById("extract");*/
        const resultArea = document.getElementById("prompt");
    
        extractButton.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                console.log("Requesting claim details extraction...");
                chrome.tabs.sendMessage(tabs[0].id, { action: "extract_claim_details" }, (response) => {
                    console.log("Extracted Claim Details:", response);
                    
                    if (chrome.runtime.lastError) {
                        console.error("Error:", chrome.runtime.lastError.message);
                        alert("Error: " + chrome.runtime.lastError.message);
                    } else if (response && !response.error) {
                        if (!response.claimNumber) {
                            console.error("Response does not contain valid claim details!", response);
                            alert("Failed to extract valid claim details!");
                            return;
                        }

                        // Convert extracted details into a query string
                        const queryParams = new URLSearchParams({
                            claimNumber: response.claimNumber || "N/A",
                            consignmentNote: response.consignmentNote || "N/A",
                            claimantName: response.claimantName || "N/A",
                            claimantContact: response.claimantContact || "N/A",
                            claimantEmail: response.claimantEmail || "N/A",
                            claimantPhone: response.claimantPhone || "N/A",
                            claimValue: response.claimValue || "N/A",
                            gstIncluded: response.gstIncluded || "N/A",
                            receiverName: response.receiverName || "N/A",
                            claimNature: response.claimNature || "N/A",
                            claimPhase: response.claimPhase || "N/A",
                            claimStatus: response.claimStatus || "N/A",
                            claimOwner : response.claimOwner || "N/A",
                            claimAge: response.claimAge || "N/A"
                        }).toString();
        
                        console.log("Opening extracted.html with:", queryParams);
        
                        // Open a new window with extracted details
                        chrome.windows.create({
                            url: chrome.runtime.getURL(`extracted.html?${queryParams}`),
                            type: "popup",
                            width: 500,
                            height: 400
                        });
                        window.close();
                    } else {
                        alert("Failed to extract claim details!");
                    }
                });
            });
        });

    sendButton.addEventListener("click", async function () {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            responseDiv.innerHTML = "<p style='color:red;'>Please enter a prompt!</p>";
            return;
        }

        responseDiv.innerHTML = "<p>Loading...</p>";

        try {
            const res = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.2-1b-instruct",  // Replace with your active model name in LM Studio
                    messages: [
                        { "role": "system", "content": "You are a Freight claims assessor. All replies should like a Freight claims assessor." },
                        { role: "user", content: prompt }],
                    max_tokens: 1000
                })
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            responseDiv.innerHTML = `<p><strong>AI Response:</strong> ${data.choices[0].message.content}</p>`;
        } catch (error) {
            responseDiv.innerHTML = `<p style='color:red;'>Error: ${error.message}</p>`;
        }
    });
});

/*
//llama-3.2-1b-instruct curl

curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-1b-instruct",
    "messages": [
      { "role": "system", "content": "Always answer in rhymes. Today is Thursday" },
      { "role": "user", "content": "What day is it today?" }
    ],
    "temperature": 0.7,
    "max_tokens": -1,
    "stream": false
}'
*/