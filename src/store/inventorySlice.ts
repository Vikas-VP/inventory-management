import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  disabled: boolean;
}

interface InventoryState {
  products: Product[];
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}

const initialState: InventoryState = {
  products: [],
  loading: false,
  error: null,
  isAdmin: true,
};

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const response = await fetch(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }
    return response.json();
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    toggleAdminMode: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    toggleProductDisabled: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.disabled = !product.disabled;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.map((item: Product, index: number) => {
          return {
            ...item,
            id: index + 1,
            price: item?.price?.toString().slice(1),
          };
        });
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const {
  toggleAdminMode,
  updateProduct,
  deleteProduct,
  toggleProductDisabled,
} = inventorySlice.actions;

export default inventorySlice.reducer;
