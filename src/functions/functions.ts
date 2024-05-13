import { DirectionsType } from "../components/Tiсkets/TicketCard";

export const convertPriceToNumber = (val: string) => +val.replace(/\s+/g, "");
export const convertTravelTime = (directions: DirectionsType[]) => {
  let arr = directions[0].travelTime.split(" ");
  let arr2 = directions[1].travelTime.split(" ");
  let hours = arr[0].slice(0, -1);
  let minutes = arr[1].slice(0, -2);
  let hours2 = arr2[0].slice(0, -1);
  let minutes2 = arr2[1].slice(0, -2);
  return [+hours + +hours2, +minutes + +minutes2];
};
