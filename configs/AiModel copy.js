/*
 * Install the OpenAI SDK
 *
 * $ npm install openai
 */

const OpenAI = require('openai');

// Configuration with customizable options
const config = {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1', // Custom base URL
  model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview', // Custom model
};

const openai = new OpenAI({
  apiKey: config.apiKey,
  baseURL: config.baseURL,
});

const generationConfig = {
  temperature: 1,
  top_p: 0.95,
  max_tokens: 8192,
  response_format: { type: "json_object" },
};

export const chatSession = {
  async sendMessage(message) {
    try {
      const response = await openai.chat.completions.create({
        model: config.model,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates creative content in JSON format."
          },
          {
            role: "user",
            content: message
          }
        ],
        ...generationConfig
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error in OpenAI API call:', error);
      throw error;
    }
  }
};

