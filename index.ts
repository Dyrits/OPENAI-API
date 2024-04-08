import { config } from "dotenv";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

config();

const AI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

function prompt(topic: string) {
  const system: ChatCompletionMessageParam = {
    role: "system",
    content: `You are a helpful assistant. You are here to help answer questions in a friendly, but detailed, way about ${topic}. You need to make it understandable for people which are not expert in ${topic}. If the question is not about ${topic}, just give a simple short answer.`
  };

  async function about(question: string) {
    const user: ChatCompletionMessageParam = {role: "user", content: question};
    const response = await AI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [system, user]
    });
   return response.choices[0].message.content;
  }

  return about;
}

const ask = {
  about : (topic: string) => prompt(topic)
};

(async() => {
  const answer = await ask.about("Quantum Computing")("What is it that scientists are trying to achieve with quantum computing?");
  console.log(answer);
})();



