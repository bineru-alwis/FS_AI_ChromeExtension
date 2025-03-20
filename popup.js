document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("send");
    const promptInput = document.getElementById("prompt");
    const responseDiv = document.getElementById("response");

    sendButton.addEventListener("click", async function () {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            responseDiv.innerHTML = "<p style='color:red;'>Please enter a prompt!</p>";
            return;
        }

        responseDiv.innerHTML = "<p>Loading...</p>";

        try {
            const res = await fetch("http://localhost:1234/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.2-1b-instruct",  // Replace with your active model name in LM Studio
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 100
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
