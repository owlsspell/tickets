import { createSlice, current } from "@reduxjs/toolkit";
import transfersJson from "../data/transfers.json";
import tickets from "../data/tickets.json";
import { TicketType } from "../components/Tiсkets/TicketCard";

export type transfersSliceType = typeof transfersJson;

const initialState: transfersSliceType = transfersJson;
const activeFilters: any = [];

const transfersSlice = createSlice({
  name: "transfers",
  initialState: { transfers: initialState, activeFilters },
  reducers: {
    changeTransfers: (state, action) => {
      const newState = state.transfers.map((item) =>
        item.id === action.payload
          ? { ...item, isChecked: !item.isChecked }
          : item
      );
      state.transfers = [...newState];
    },
    filterTransfers: (state, action) => {
      const activeFilters = state.transfers
        .filter((item) => (item.isChecked ? item.id : ""))
        .map((item) => item.id);
      state.activeFilters = [...activeFilters];
    },
  },
});

export const { changeTransfers, filterTransfers } = transfersSlice.actions;

export default transfersSlice.reducer;
