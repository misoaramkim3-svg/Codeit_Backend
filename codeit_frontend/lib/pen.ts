const PENS = [
  { text: "text-pen-blue", bg: "bg-pen-blue" },
  { text: "text-pen-burgundy", bg: "bg-pen-burgundy" },
  { text: "text-pen-green", bg: "bg-pen-green" },
  { text: "text-pen-brown", bg: "bg-pen-brown" },
  { text: "text-pen-violet", bg: "bg-pen-violet" },
];

export function penOf(userId: string) {
  let index = 0;
  for (const character of userId) {
    index = (index * 31 + character.charCodeAt(0)) % PENS.length;
  }
  return PENS[index];
}
