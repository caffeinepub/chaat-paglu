import type { MenuItem } from "@/types";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "paani-puri",
    name: "Paani Puri",
    emoji: "🫧",
    description:
      "Crispy hollow puris filled with tangy tamarind water, spiced chickpeas & fresh coriander",
    variants: [{ label: "Plate (6 pcs)", price: 30 }],
  },
  {
    id: "aloo-tikki-chaat",
    name: "Aloo Tikki Chaat",
    emoji: "🥔",
    description:
      "Golden potato patties topped with yogurt, sweet chutney, sev & pomegranate",
    variants: [
      { label: "Half", price: 40 },
      { label: "Full", price: 60 },
    ],
  },
  {
    id: "papdi-chaat",
    name: "Papdi Chaat",
    emoji: "🥗",
    description:
      "Crunchy papdis layered with boiled potatoes, chickpeas, tangy chutneys & creamy yogurt",
    variants: [{ label: "Plate", price: 30 }],
  },
  {
    id: "chole-chaat",
    name: "Chole Chaat",
    emoji: "🫘",
    description:
      "Spiced white chickpeas tossed with onions, tomatoes, green chilli & zesty masala",
    variants: [
      { label: "Half", price: 50 },
      { label: "Full", price: 80 },
    ],
  },
  {
    id: "dahi-puri",
    name: "Dahi Puri",
    emoji: "🫙",
    description:
      "Soft puris loaded with smooth chilled dahi, sweet tamarind, sev & fresh mint",
    variants: [{ label: "Plate (6 pcs)", price: 50 }],
  },
  {
    id: "fresh-lime-soda",
    name: "Fresh Lime Soda",
    emoji: "🍋",
    description:
      "Chilled fizzy soda with freshly squeezed lime, black salt & choice of sweet or salted",
    variants: [{ label: "Glass", price: 25 }],
  },
];
