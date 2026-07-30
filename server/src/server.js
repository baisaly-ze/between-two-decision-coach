import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server.js is inside server/src, while .env is inside server
const envPath = path.resolve(__dirname, "../.env");

const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
  console.error("Could not load .env file:", envResult.error.message);
} else {
  console.log("Environment file loaded");
}

// Import app only after environment variables have loaded
const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Decision Coach API running on port ${PORT}`);
  console.log(
    process.env.GROQ_API_KEY
      ? "Groq API key detected"
      : "Groq API key not detected"
  );
});