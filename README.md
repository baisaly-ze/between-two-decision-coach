# Between Two — AI Decision Coach

A full-stack AI decision assistant that asks five personalised questions, separates logic from emotion, and returns one clear recommendation with decision clarity, reasoning, trade-offs, and overlooked considerations.

## Stack

- React + Vite
- Plain responsive CSS
- Framer Motion
- Node.js + Express
- Groq API
- Zod validation
- Helmet, CORS, and API rate limiting

## Features

- Two-option decision flow
- AI-generated follow-up questions
- Logic and heart scores
- One final recommendation
- Decision clarity percentage
- Honest trade-off and considerations
- High-stakes decision safety classification
- Demo fallback when no Groq key is configured
- Responsive, animated interface

## Local setup

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure the backend

Copy `server/.env.example` to `server/.env` and add your Groq key:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
GROQ_API_KEY=your_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

### 3. Configure the frontend

Copy `client/.env.example` to `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run both terminals

```bash
npm run dev:server
```

```bash
npm run dev:client
```

Open `http://localhost:5173`.

## Deployment

### Vercel frontend

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://YOUR-RENDER-URL/api`

### Render backend

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Add `GROQ_API_KEY`, `GROQ_MODEL`, and `CLIENT_URL` environment variables.

## API endpoints

- `GET /api/health`
- `POST /api/questions`
- `POST /api/decide`

## Next version

MongoDB decision history, Firebase authentication, feedback/outcome tracking, and saved decision sharing can be added after the MVP is deployed.
