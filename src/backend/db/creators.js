import { v4 as uuid } from "uuid";
import {
  creator1,
  creator2,
  creator3,
  creator4,
  creator5,
} from "../../Assets/Images";
const creators = [
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
    subscribers: "22K",
  },
  {
    id: uuid(),
    name: "Kevin Reyes",
    imageUrl: creator3,
    subscribers: "52K",
  },
  {
    id: uuid(),
    name: "House of Creation",
    imageUrl: creator4,
    subscribers: "1.2K",
  },
  {
    id: uuid(),
    name: "Vogue",
    imageUrl: creator5,
    subscribers: "3.6M",
  },
];

export default creators;
