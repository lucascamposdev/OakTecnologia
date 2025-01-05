// Type
import { Product } from "@/types/Product";

// Components
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  value: number;
  description: string;
  forSale: "yes" | "no";
};

interface DialogProps {
  product: Product | null;
  onSubmit: (product: Product) => void;
  onClose: () => void;
}

const Dialog = ({ product, onSubmit, onClose }: DialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: product?.name || "",
      value: product?.value || 0,
      description: product?.description || "",
      forSale: product?.forSale || "yes",
    },
  });

  const forSale = watch("forSale");

  const onSubmitForm: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    reset({
      name: "",
      value: 0,
      description: "",
      forSale: "yes",
    });
    onClose();
  };

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader className="pt-3 pb-1">
        <DialogTitle>
          Add Product
        </DialogTitle>
        <hr />
      </DialogHeader>
      <form
        className="gap-5 flex flex-col"
        onSubmit={handleSubmit(onSubmitForm)}
        noValidate
      >
        <Label>
          Name
          <Input
            defaultValue={product?.name}
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </Label>
        <div className="flex justify-between">
          <Label>
            Value
            <Input
              defaultValue={product?.value}
              id="value"
              type="number"
              {...register("value", {
                required: "Value is required",
                min: {
                  value: 0.01,
                  message: "Value must be greater than 0",
                },
                validate: {
                  noLeadingZeros: (value) =>
                    !/^0\d/.test(value.toString()) || "Value cannot have leading zeros",
                },
              })}
            />
            {errors.value && (
              <p className="text-red-500">{errors.value.message}</p>
            )}
          </Label>
          <Label>
            For Sale
            <Select value={forSale} 
              onValueChange={(value) => setValue("forSale", value as "yes" | "no")} >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Yes" />
              </SelectTrigger>
              <SelectContent {...register("forSale")}>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </Label>
        </div>
        <Label>
          Description
          <Input
            defaultValue={product?.description}
            id="description"
            {...register("description")}
          />
        </Label>
        <Button type="submit">Add</Button>
      </form>
    </DialogContent>
  );
};

export default Dialog;
