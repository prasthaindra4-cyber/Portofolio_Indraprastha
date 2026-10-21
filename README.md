# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Gemini portfolio chat

The AI Lab's **Tanya AI** feature uses Gemini on the server. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` locally:

```sh
GEMINI_API_KEY=your_gemini_api_key
```

Keep the key private: `.env` is ignored by Git, and the key must never go in client-side code. For deployment, add `GEMINI_API_KEY` as a server-side secret/environment variable in your hosting platform, then redeploy. The existing project summarizer continues to use its current AI provider.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
