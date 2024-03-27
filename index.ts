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
    content: `You are a helpful assistant. You are here to help answer questions in a friendly way about ${topic}.`
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
  const lifespan = await ask.about("dogs")("What is the average lifespan of a dog?");
  console.log(lifespan);
})();



