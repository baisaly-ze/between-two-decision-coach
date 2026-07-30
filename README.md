# Between Two

An AI-powered decision coach that helps you choose between two options through five guided questions — separating what's practical from what's emotional, then giving you one clear recommendation.

---

## What it does

Stuck between two choices? Answer five short questions and Between Two breaks down:

- **Logic score** — how each option holds up practically
- **Heart score** — how each option feels emotionally
- **A clear recommendation** — with reasoning, an honest trade-off, and what to keep in mind

Built to feel like a conversation with a thoughtful friend, not a form.

## Tech stack

**Frontend:** React, Vite, Framer Motion
**Backend:** Node.js, Express, Zod
**AI:** Groq (Llama 3.3 70B)
**Deployment:** Vercel (frontend), Render (backend)

## Running it locally

```bash
# Backend
cd server
npm install
cp .env.example .env   # add your Groq API key
npm run dev

# Frontend
cd client
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

---

Built as a personal project to explore combining structured decision-making with conversational AI.
