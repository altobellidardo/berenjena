export function generateHash() {
  return crypto.randomUUID().split('-')[0];
}
