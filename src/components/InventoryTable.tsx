"use client";

import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import type { RootState } from "../store";
import {
  updateProduct,
  deleteProduct,
  toggleProductDisabled,
} from "../store/inventorySlice";

const InventoryTable: React.FC = () => {
  const dispatch = useDispatch();
  const { products, isAdmin } = useSelector(
    (state: RootState) => state.inventory
  );
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (product: any) => {
    setEditingProduct({
      ...product,
    });
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      dispatch(
        updateProduct({ ...editingProduct, price: `$${editingProduct?.price}` })
      );
    }
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleToggleDisabled = (id: number) => {
    dispatch(toggleProductDisabled(id));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ opacity: product.disabled ? 0.5 : 1 }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  {isAdmin && (
                    <>
                      <IconButton
                        onClick={() => handleEdit(product)}
                        disabled={product.disabled}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product.id)}>
                        <Delete />
                      </IconButton>
                      <IconButton
                        onClick={() => handleToggleDisabled(product.id)}
                      >
                        <Visibility />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {editingProduct && (
            <>
              <TextField
                label="Name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Category"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                type="number"
                value={
                  typeof editingProduct.price === "string"
                    ? editingProduct.price?.slice(1)
                    : editingProduct.price
                }
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value),
                  })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantity"
                type="number"
                value={editingProduct.quantity}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    quantity: Number.parseInt(e.target.value, 10),
                  })
                }
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InventoryTable;
