// Hooks
import { useProducts } from "@/context/useProducts";
import { useState } from "react";

// Components
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import AppDialog from "./dialog"
import { Button } from "@/components/ui/button";

const AddProduct = () => {
  const { addProduct } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <div className="ms-auto">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={handleOpenDialog}
          >
            Add Product
          </Button>
        </DialogTrigger>
        <AppDialog
          product={null}
          onSubmit={addProduct}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </div>
  )
}

export default AddProduct