export async function getCards() {
  return (await import("../../cards/cards.json")).default;
}
