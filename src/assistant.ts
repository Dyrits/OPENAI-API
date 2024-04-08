import OpenAI from "openai";
// @ts-ignore
import { ChatCompletionMessageParam } from "openai/resources";

const { VITE_OPENAI_API_KEY } = import.meta.env;

const AI = new OpenAI({
  apiKey: VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

function prompt(topic: string) {
  const system: ChatCompletionMessageParam = {
    role: "system",
    content: `You are a ${topic} guru. You are here to help people about ${topic}. You need to make it friendly and understandable for people who are not experts in ${topic}. Just answer the question in a very simple and short way.`
  };

  async function about(question: string, data?: string) {
    const user: ChatCompletionMessageParam = {role: "user", content: `${question} ${data ? `Use the following data: ${data}` : String()}`.trim()};
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


