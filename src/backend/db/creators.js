import { v4 as uuid } from "uuid";
import { creator1, creator2 } from "../../Assets/Images";
export const creators = [
  {
    id: uuid(),
    name: "Vivi & Tamas",
    imageUrl: creator1,
    subscribers: "27K",
  },
  {
    id: uuid(),
    name: "Chanel",
    imageUrl: creator2,
  },
];
