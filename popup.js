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
            const res = await fetch("http://localhost:1234/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 100 // Adjust response length
                })
            });

            const data = await res.json();
            responseDiv.innerHTML = `<p><strong>AI Response:</strong> ${data.response}</p>`;
        } catch (error) {
            responseDiv.innerHTML = `<p style='color:red;'>Error: ${error.message}</p>`;
        }
    });
});
