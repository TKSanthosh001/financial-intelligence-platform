// AI Provider Manager & Adapters

export class ProviderManager {
  constructor(env) {
    this.env = env;
  }

  // Adapter for Google Gemini API
  async callGemini(prompt, systemMsg, modelName = 'gemini-1.5-flash', temp = 0.2) {
    const apiKey = this.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Gemini API key not configured");

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `${systemMsg}\n\n${prompt}` }] }],
        generationConfig: { temperature: temp }
      })
    });

    if (!res.ok) throw new Error(`Gemini Error: ${res.statusText}`);
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  // Adapter for Groq API
  async callGroq(prompt, systemMsg, modelName = 'llama-3.1-70b-versatile', temp = 0.2) {
    const apiKey = this.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Groq API key not configured");

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemMsg },
          { role: 'user', content: prompt }
        ],
        temperature: temp
      })
    });

    if (!res.ok) throw new Error(`Groq Error: ${res.statusText}`);
    const data = await res.json();
    return data.choices[0].message.content;
  }

  // Adapter for NVIDIA NIM API
  async callNvidia(prompt, systemMsg, modelName = 'meta/llama3-70b-instruct', temp = 0.2) {
    const apiKey = this.env.NVIDIA_NIM_API_KEY;
    if (!apiKey) throw new Error("NVIDIA NIM API key not configured");

    const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemMsg },
          { role: 'user', content: prompt }
        ],
        temperature: temp
      })
    });

    if (!res.ok) throw new Error(`NVIDIA Error: ${res.statusText}`);
    const data = await res.json();
    return data.choices[0].message.content;
  }

  // Adapter for OpenRouter API
  async callOpenRouter(prompt, systemMsg, modelName = 'meta-llama/llama-3.1-70b-instruct', temp = 0.2) {
    const apiKey = this.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("OpenRouter API key not configured");

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://tksanthosh001.github.io/',
        'X-Title': 'Aegis Financial Platform'
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemMsg },
          { role: 'user', content: prompt }
        ],
        temperature: temp
      })
    });

    if (!res.ok) throw new Error(`OpenRouter Error: ${res.statusText}`);
    const data = await res.json();
    return data.choices[0].message.content;
  }
}
