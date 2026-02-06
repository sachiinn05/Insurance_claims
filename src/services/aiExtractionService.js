const axios = require("axios");

async function extractWithAI(text) {
  try {

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
Extract structured insurance claim data.

Return ONLY JSON:

{
"policyNumber": "",
"policyHolder": "",
"dateOfLoss": "",
"location": "",
"description": "",
"claimType": "",
"estimatedDamage": 0,
"claimant": ""
}

If missing put null.

TEXT:
${text}
`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let result = response.data.choices[0].message.content;

    console.log("AI RAW:", result);

    result = result.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(result);

  } catch (err) {
    console.log("OPENROUTER ERROR:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = extractWithAI;
