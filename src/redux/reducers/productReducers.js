import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServices from "../services/productServices";

const initialState = {
  products: [],
  product: null,
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data, thunkAPI) => {
    try {
      return await productServices.addProduct(data);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data, thunkAPI) => {
    try {
      return await productServices.updateProduct(data);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allProducts = createAsyncThunk(
  "product/allProducts",
  async (thunkAPI) => {
    try {
      return await productServices.allProducts();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const singleProduct = createAsyncThunk(
  "product/singleProduct",
  async (productId, thunkAPI) => {
    try {
      return await productServices.singleProduct(productId);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      return await productServices.deleteProduct(productId);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(singleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = productSlice.actions;

export default productSlice.reducer;
