import { v4 as uuid } from "uuid";
import { outfit, skincare } from "../../Assets/Images";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Fashion Film",
    imageUrl: "https://i.ytimg.com/vi/2VncgqDVk1E/maxresdefault.jpg",
    description:
      "Fashion films now shine the spotlight on costume designers, simultaneously illuminating the design process and advertising brands. In particular, fashion films are used in addition to runway shows to introduce new collections or fashion lines to people all over the world.",
  },
  {
    _id: uuid(),
    categoryName: "Outfit Inspo",
    imageUrl:
      "https://www.pinkvilla.com/files/styles/gallery-preview/public/samanthaakkineni_whiteoutfits_hd4.png?itok=yGjAPSz-",
    description:
      "If you're itching to scrounge up the hidden gems of your wardrobe and turn them into fashion looks to remember, the stories ahead, will have you on the right path in no time.",
  },
  {
    _id: uuid(),
    categoryName: "Skincare",
    imageUrl:
      "https://i.pinimg.com/originals/97/ca/86/97ca86401070e36491ceb792763482a1.jpg",
    description:
      "Skin care is the range of practices that support skin integrity, enhance its appearance and relieve skin conditions. They can include nutrition, avoidance of excessive sun exposure and appropriate use of emollients.",
  },
];
