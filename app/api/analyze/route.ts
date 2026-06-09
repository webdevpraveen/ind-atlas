import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { apiKey, state, news } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 401 });
    }

    const systemPrompt = `You are a highly analytical and objective OSINT Intelligence Analyst. You will receive a list of recent news headlines for the Indian state of ${state}.
    Your task is to analyze these exact headlines and generate a JSON response with the following strict structure (no markdown, just raw JSON):
    {
      "instabilityIndex": <number 0-100 based strictly on negative/violent/disruptive news>,
      "resilienceScore": <number 0-100 based on positive economic/infra/governance news>,
      "breakdown": {
        "unrest": <number 0-100>,
        "conflict": <number 0-100>,
        "military": <number 0-100>,
        "info": <number 0-100>
      },
      "brief": {
        "situation": "<3-sentence highly factual situation report based ONLY on the provided news>",
        "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
        "outlook24h": "<1 sentence factual outlook>"
      }
    }
    CRITICAL INSTRUCTIONS:
    1. DO NOT invent facts, incidents, or risks. You must be 100% authentic and factual based ONLY on the provided headlines.
    2. If the provided headlines do not mention unrest, conflict, or military issues, the respective scores MUST be 0.
    3. If there are no relevant headlines, output a baseline stable assessment (0 threat, high resilience) stating "No significant incidents reported."
    4. Maintain a professional, military-grade tone without exaggerating threats.`;

    const userMessage = `Recent Headlines for ${state}:\n${news.length > 0 ? news.join("\n") : "No recent news available."}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Using an extremely fast Groq model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: "Failed to fetch from Groq", details: err }, { status: response.status });
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
