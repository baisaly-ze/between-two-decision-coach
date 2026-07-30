export function parseJsonResponse(raw) {
  if (typeof raw !== 'string') return raw;
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = Math.min(...['{', '['].map((char) => {
      const index = cleaned.indexOf(char);
      return index === -1 ? Infinity : index;
    }));
    const end = Math.max(cleaned.lastIndexOf('}'), cleaned.lastIndexOf(']'));
    if (!Number.isFinite(start) || end <= start) throw new Error('AI returned invalid JSON.');
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}
