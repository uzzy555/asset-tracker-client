import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllManufacturersApi } from "./apis";

export const getAllManufacturers = createAsyncThunk(
  "manufacturers/getAllManufacturers",
  async () => {
    const { data } = await getAllManufacturersApi();
    return data;
  }
);
