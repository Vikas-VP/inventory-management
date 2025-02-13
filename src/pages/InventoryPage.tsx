"use client";

import type React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, CircularProgress } from "@mui/material";
import { fetchInventory } from "../store/inventorySlice";
import type { AppDispatch, RootState } from "../store";
import InventoryStats from "../components/InventoryStats";
import InventoryTable from "../components/InventoryTable";

const InventoryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <InventoryStats />
      <InventoryTable />
    </Container>
  );
};

export default InventoryPage;
