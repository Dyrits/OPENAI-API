# OPENAI-API

## About The Project

"Dodgy Dave's Stock Predictions" (per the page title): a stock prediction chatbot front end using the OpenAI API, built with TypeScript and Vite.

### Built With

- TypeScript
- Vite
- OpenAI API (openai package)

## Getting Started

### Prerequisites

- Node.js 26 LTS (`nvm use`) and npm
- An OpenAI API key

### Installation

```sh
npm ci
```

Copy `.env.example` to `.env` and fill in the values only for a private local exercise.

**Do not deploy this frontend with real API keys.** All `VITE_` values are bundled into client-side JavaScript and can be read by anyone who opens it. This learning project calls OpenAI from the browser with `dangerouslyAllowBrowser`; a public version needs a backend that holds the keys and enforces access and spending limits. No backend, credential rotation or deployment is included here.

### Running

```sh
npm run dev
```

`npm run build` type-checks and builds into `dist/`; `npm run preview` previews that build locally. `npm run typecheck` runs TypeScript separately. Vite 8 targets modern browsers.

The stock-report demo and its model choice are unchanged. Build/browser fixture checks do not prove real OpenAI or Polygon access, model availability, or useful financial predictions. No paid API calls are needed for those checks.

## License

No license file is present in this repository.

## Contact

Dyrits - https://github.com/Dyrits
