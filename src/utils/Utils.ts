export function generateRandomId(): string {
  // slice(2) will remove the first 2 characters: '0.'
  return Math.random().toString(36).slice(2);
}
