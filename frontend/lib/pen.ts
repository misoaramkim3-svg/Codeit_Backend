const PENS = [
  { text: "text-pen-blue", bg: "bg-pen-blue" },
  { text: "text-pen-burgundy", bg: "bg-pen-burgundy" },
  { text: "text-pen-green", bg: "bg-pen-green" },
  { text: "text-pen-brown", bg: "bg-pen-brown" },
  { text: "text-pen-violet", bg: "bg-pen-violet" },
];

export const penOf = (userId: string) => {
  const sum = [...userId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return PENS[sum % PENS.length];
};
