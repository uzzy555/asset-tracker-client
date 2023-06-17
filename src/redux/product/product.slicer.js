import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  getAllProductsForDistributors,
  getAllProductsForManufacturer,
  getSingleProduct,
} from "./product.actions";

const initialState = {
  isProductUploading: false,
  isProductAdded: false,
  isProductUploadingFailed: false,
  addProductData: {},
  ////////////////////////////
  areAllProductsLoading: false,
  areAllProductsLoaded: false,
  areAllProductsLoadingFailed: false,
  allProducts: [],
  ////////////////////////////
  isSingleProductLoading: false,
  isSingleProductLoadingFailed: false,
  isSingleProductLoaded: false,
  singleProduct: {},
};

const Product = createSlice({
  name: "Product",
  initialState,
  extraReducers: {
    [addProduct.pending]: (state, action) => {
      state.isProductUploading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.isProductUploading = false;
      state.isProductAdded = true;
      state.addProductData = action.payload;
    },
    [addProduct.rejected]: (state, action) => {
      state.isProductUploading = false;
      state.isProductUploadingFailed = true;
    },
    ////////////////////////////////
    [getAllProductsForDistributors.pending]: (state) => {
      state.areAllProductsLoading = true;
    },
    [getAllProductsForDistributors.fulfilled]: (state, action) => {
      state.areAllProductsLoading = false;
      state.areAllProductsLoaded = true;
      state.allProducts = action.payload.products;
    },
    [getAllProductsForDistributors.rejected]: (state, action) => {
      state.areAllProductsLoading = false;
      state.areAllProductsLoadingFailed = true;
    },
    ////////////////////////////////
    [getAllProductsForManufacturer.pending]: (state) => {
      state.areAllProductsLoading = true;
    },
    [getAllProductsForManufacturer.fulfilled]: (state, action) => {
      state.areAllProductsLoading = false;
      state.areAllProductsLoaded = true;
      state.allProducts = action.payload.products;
    },
    [getAllProductsForManufacturer.rejected]: (state, action) => {
      state.areAllProductsLoading = false;
      state.areAllProductsLoadingFailed = true;
    },
    ///////////////////////////////
    [getSingleProduct.pending]: (state, action) => {
      state.isSingleProductLoading = true;
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.isSingleProductLoading = false;
      state.isSingleProductLoadingFailed = true;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.isSingleProductLoading = false;
      state.isSingleProductLoaded = true;
      state.singleProduct = action.payload.product;
    },
  },
});

export default Product.reducer;
