import { dates } from "./utilities/dates";
import { ask } from "./assistant";

const { VITE_POLYGON_API_KEY } = import.meta.env;

const inputs: { tickers: string[] } = {
  tickers: []
}

const button: HTMLButtonElement = document.querySelector(".generate-report-btn")!;
const form: HTMLFormElement = document.querySelector(" #ticker-input-form")!;

button.addEventListener("click", generateReport);
form.addEventListener("submit", submit);

function submit($event: Event) {
  $event.preventDefault();
  const input: HTMLInputElement = document.querySelector("#ticker-input")!;
  const value = input.value.trim();
  if (value.length > 2) {
    inputs.tickers.push(value.toUpperCase());
    renderTickers(inputs.tickers);
  } else {
    displayError();
  }
}

function displayError() {
  const label: HTMLLabelElement = document.querySelector("label")!;
  label.style.color = "red";
  label.textContent = "You must add at least one ticker. A ticker is a 3 letter or more code for a stock.";
}

function renderTickers(tickers: string[]) {
  const division: Element = document.querySelector(".ticker-choice-display")!;
  division.innerHTML = String();
  button.disabled = !tickers.length;
  tickers.forEach((ticker) => {
    const span: HTMLSpanElement = document.createElement("span");
    span.textContent = ticker;
    span.classList.add("ticker");
    division.appendChild(span);
  });
}

console.log(import.meta.env);

const panels: { [key: string]: HTMLElement } = {
  loading: document.querySelector(".loading-panel")!,
  action: document.querySelector(".action-panel")!,
  output: document.querySelector(".output-panel")!
};

const message: HTMLElement = document.getElementById("api-message")!;

async function generateReport() {
  console.log("Generating report...")
  const data: string[] = await fetchData();
  const report: string = await fetchReport(data.join(String())) as string;
  renderReport(report)
}

async function fetchData() {
  panels.action.style.display = "none";
  panels.loading.style.display = "flex";
  try {
    return await Promise.all(inputs.tickers.map(async (ticker) => {
      const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${VITE_POLYGON_API_KEY}`;
      const response = await fetch(url);
      if (response.ok) {
        message.innerText = "Creating report...";
        return await response.text();
      } else {
        throw new Error("An error occurred while fetching stock data.");
      }
    }));
  } catch (error: any) {
    console.error(error);
    panels.loading.innerText = error.message;
    return [];
  }
}

async function fetchReport(data: string) {
  return await ask.about("Stock Market")("Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.", data);
}

function renderReport(report: string) {
  panels.loading.style.display = "none";
  const paragraph: HTMLParagraphElement = document.createElement("p");
  panels.output.appendChild(paragraph);
  paragraph.textContent = report;
  panels.output.style.display = "flex";
}