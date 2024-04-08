import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const { VITE_OPENAI_API_KEY } = import.meta.env;

const AI = new OpenAI({
  apiKey: VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

function prompt(topic: string) {
  const system: ChatCompletionMessageParam = {
    role: "system",
    content: `You are a helpful assistant. You are here to write a report, answering the question about ${topic}. You need to make it friendly and understandable for people who are not experts in ${topic}. Just answer the question without giving any other information. Make it very simple and short.`
  };

  async function about(question: string, data?: string) {
    const user: ChatCompletionMessageParam = {role: "user", content: `${question} ${data ? `Use the following data: ${data}` : String()}`};
    const response = await AI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [system, user]
    });
    return response.choices[0].message.content;
  }

  return about;
}

const ask = {
  about: (topic: string) => prompt(topic)
};

export { ask };


