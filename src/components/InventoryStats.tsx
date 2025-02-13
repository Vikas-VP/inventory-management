import type React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography } from "@mui/material";
import type { RootState } from "../store";

const InventoryStats: React.FC = () => {
  const products = useSelector((state: RootState) => state.inventory.products);
  const actualProductsPresent = products?.filter((item) => !item?.disabled);
  const totalProducts = actualProductsPresent?.length;
  const totalStoreValue = actualProductsPresent.reduce(
    (sum, product: any) => sum + product.price.slice(1) * product.quantity,
    0
  );
  const outOfStock = actualProductsPresent.filter(
    (product) => product.quantity === 0
  ).length;
  const categories = new Set(
    actualProductsPresent.map((product) => product.category)
  ).size;

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="h4">{totalProducts}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Store Value</Typography>
          <Typography variant="h4">${totalStoreValue}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Out of Stock</Typography>
          <Typography variant="h4">{outOfStock}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Categories</Typography>
          <Typography variant="h4">{categories}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default InventoryStats;
