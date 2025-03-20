document.addEventListener("DOMContentLoaded", function () {
    const extractButton = document.getElementById("extract");
    const sendButton = document.getElementById("send");
    const promptInput = document.getElementById("prompt");
    const responseDiv = document.getElementById("response");

    // Extract content from the current tab
    extractButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "extract_text" }, (response) => {
                if (response && response.text) {
                    promptInput.value = response.text;
                } else {
                    promptInput.value = "Failed to extract content!";
                }
            });
        });
    });

    // Send extracted content to LM Studio AI
    sendButton.addEventListener("click", async function () {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            responseDiv.innerHTML = "<p style='color:red;'>No content to send!</p>";
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
                    model: "llama-3.2-1b-instruct",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 150
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