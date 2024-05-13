import { createSlice } from "@reduxjs/toolkit";
import { TicketType } from "../components/Tiсkets/TicketCard";
import transfersJson from "../data/transfers.json";
import ticketsJson from "../data/tickets.json";

export type TicketsType = TicketType[];
export type TransfersType = typeof transfersJson;

const initialTickets: TicketsType = [];
const initialTransfers: TransfersType = transfersJson;
const activeFilters: (string | number)[] = ["all"];

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: initialTickets,
    filteredTickets: initialTickets,
    lastIndex: 5,
    transfers: initialTransfers,
    activeFilters,
  },
  reducers: {
    replaceTickets: (state, action) => {
      state.filteredTickets = action.payload;
    },
    changeLastIndex: (state) => {
      state.lastIndex += 5;
    },
    changeTransfers: (state, action) => {
      const newState = state.transfers.map((item) =>
        item.id === action.payload
          ? { ...item, isChecked: !item.isChecked }
          : item
      );

      state.transfers = [...newState];
    },
    clearTransfers: (state, action) => {
      if (action.payload === "all") {
        state.transfers = state.transfers.map((item) =>
          item.value !== "all"
            ? { ...item, isChecked: !state.transfers[0].isChecked }
            : item
        );
      } else {
        state.transfers = state.transfers.map((item) =>
          item.value === "all" ? { ...item, isChecked: false } : item
        );
      }
    },
    filterTransfers: (state) => {
      //clear pagination
      state.lastIndex = 5;

      const activeFilters = state.transfers
        .filter((item) => item.isChecked)
        .map((item) => item.value);

      //turn on "all" checkbox
      if (activeFilters.length === 4 && !activeFilters.includes("all")) {
        state.transfers = state.transfers.map((item) =>
          item.value === "all" ? { ...item, isChecked: true } : item
        );
      }

      state.activeFilters = [...activeFilters];

      const filteredTickets = ticketsJson.filter((item: TicketType) =>
        activeFilters.includes(item.directions[0].transplants.length)
      );
      state.filteredTickets = [...filteredTickets];
    },
  },
});

export const {
  replaceTickets,
  changeLastIndex,
  changeTransfers,
  filterTransfers,
  clearTransfers,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
