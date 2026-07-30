const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'The request failed.');
  return data;
}

export const getQuestions = (optionA, optionB) => request('/questions', {
  method: 'POST',
  body: JSON.stringify({ optionA, optionB }),
});

export const getDecision = (payload) => request('/decide', {
  method: 'POST',
  body: JSON.stringify(payload),
});
