import { SYSTEM_PROMPTS } from "../constants/systemPrompts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function sendChatMessage(messages, userMessage, systemPrompt, onUpdate) {
    const response = await fetch(`${API_URL}/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages: [
                { role: "system", content: SYSTEM_PROMPTS[systemPrompt] },
                ...messages.map((m) => ({ role: m.role, content: m.content })),
                { role: "user", content: userMessage },
            ],
            stream: true,
            temperature: 0.7,
            max_tokens: -1,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantResponse = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
            if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;

                try {
                    const parsed = JSON.parse(data);
                    const content = parsed.choices?.[0]?.delta?.content;

                    if (content) {
                        assistantResponse += content;
                        onUpdate(assistantResponse);
                    }
                } catch (e) {
                    // Skip invalid JSON
                    console.error("Failed to parse JSON:", e);
                }
            }
        }
    }

    return assistantResponse;
}
