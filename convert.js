// pages/api/convert.js (API route)
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Convert the following text into emojis only. Use no regular text. Be creative but relevant."
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.8,
      max_tokens: 256
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to convert text' });
  }
}