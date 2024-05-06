import OpenAI from "openai";
// @ts-ignore
import { ChatCompletionMessageParam } from "openai/resources";

const {VITE_OPENAI_API_KEY} = import.meta.env;

const AI = new OpenAI({
  apiKey: VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

function prompt(topic: string) {
  const system: ChatCompletionMessageParam = {
    role: "system",
    content: `You are a ${topic} guru. You are here to help people about ${topic}. You need to make it friendly and understandable for people who are not experts in ${topic}.  Use the provided examples (between ###), if provided, to write on a similar tone.`
  };

  async function interrogate(question: string, { data, examples = [] }: { data: string, examples: string[] }) {
    const $examples = examples.map((example) => `###${example}###`).join(" ");
    const user: ChatCompletionMessageParam = {
      role: "user",
      content: `${question}${data ? `Use the following data: ${data}  ${$examples} ` : String()}`.trim()
    };
    const response = await AI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [system, user],
      temperature: 1.1
    });
    return response.choices[0].message.content;
  }

  return interrogate;
}

const ask = {
  about: (topic: string) => prompt(topic)
};

export { ask };


