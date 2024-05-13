import { configureStore } from "@reduxjs/toolkit";
import ticketsSlice, { TransfersType } from "./ticketsSlice";
import { TicketType } from "../components/Tiсkets/TicketCard";

export type StoreType = {
  ticketsList: {
    tickets: TicketType[];
    filteredTickets: TicketType[];
    lastIndex: number;
    transfers: TransfersType;
    activeFilters: (string | number)[];
  };
};

export const store = configureStore({
  reducer: {
    ticketsList: ticketsSlice,
  },
});
