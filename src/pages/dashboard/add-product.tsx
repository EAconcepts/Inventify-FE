import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { ChangeEvent, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TbTrash } from "react-icons/tb";
import iphoneBig from "../../assets/iphone-big.png";
import iphoneSmall from "../../assets/iphone-small.png";
import { MdImage } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export interface ProductProps {
  name: string;
  noID: string;
  sellingPrice: string;
  quantity: string;
  location?: string;
  images?: [];
  sku?: string;
  category: string;
  size?: string;
  costPrice: string;
  description: string;
}
const Addproduct = () => {
  const [product, setProduct] = useState<ProductProps>({
    name: "",
    noID: Date.now().toString(),
    sellingPrice: "",
    quantity: "",
    location: "",
    images: [],
    sku: "",
    category: "",
    size: "",
    costPrice: "",
    description: "",
  });
  const [errors, setErrors] = useState<ProductProps>();

  const apiUrl = import.meta.env.VITE_API_URL;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevVals) => ({ ...prevVals, [name]: value }));
  };

  const handleSavePublish = () => {
    const validate = validateInputs();
    if (Object.keys(validate).length > 0) {
      toast.warning("Please fill all required fields");
      setErrors(validate);
      return;
    }
    saveMutation.mutate();
  };

  const saveMutation = useMutation({
    mutationFn: () => axios.post(`${apiUrl}/products/create`, { product }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message)
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const validateInputs = () => {
    const errors: ProductProps = {};
    if (!product.name) {
      errors.name = "Product name cannot be empty";
    }
    if (!product.category) {
      errors.category = "Product category cannot be empty";
    }
    if (!product.costPrice)
      errors.costPrice = "Product cost price cannot be empty";
    if (!product.quantity) errors.quantity = "Product quantity cannot be empty";
    if (!product.noID) errors.noID = "Product noID cannot be empty";
    if (!product.description)
      errors.description = "Product description cannot be empty";
    if (!product.sellingPrice)
      errors.sellingPrice = "Product sellingPrice cannot be empty";
    return errors;
  };
  return (
    <div className="flex flex-col p-[24px]">
      <div className="flex">
        {/* Add Products */}
        <div className="flex flex-col px-[8px] grow shrink-0">
          <h2>New Product Item</h2>
          <h5>Product Name</h5>
          <form className="flex gap-x-[24px] w-full rounded-full p-[8px]">
            <div className="flex flex-col w-full w-[300px gap-y-[16px]">
              <Input
                placeholder="iPhone 14 Pro"
                className="px-[12px] w-full "
                name="name"
                onChange={handleChange}
                value={product.name}
              />
              <Input
                placeholder="Select Product Category"
                className="px-[12px] w-full"
                name="category"
                onChange={handleChange}
                value={product.category}
              />
              <div className="flex gap-x-[24px] justify-between">
                <Input
                  placeholder="Selling Price"
                  className="px-[12px] w-full"
                  name="sellingPrice"
                  onChange={handleChange}
                  value={product.sellingPrice}
                />
                <Input
                  placeholder="Cost Price"
                  className="px-[12px] w-full"
                  name="costPrice"
                  onChange={handleChange}
                  value={product.costPrice}
                />
              </div>
              <Input
                placeholder="Quantity in Stock"
                className="px-[12px] w-full"
                name="quantity"
                onChange={handleChange}
                value={product.quantity}
              />
              <div className="flex w-full justify-between">
                <p className="">Discount</p>
                <div className="flex gap-x-[8px]">
                  <span>Add Discount</span>
                  <Switch />
                </div>
              </div>
              <div className="flex w-full gap-x-[12px]">
                <Input placeholder="Type" className="px-[12px] w-full" />
                <Input placeholder="Value" className="px-[12px] w-full" />
              </div>
            </div>
            {/* Description */}
            <div className="w-full flex flex-col gap-y-[14px]">
              <Textarea
                placeholder="Short Description"
                className="w-[270px h-[40px]"
                name="description"
                onChange={(e) =>
                  setProduct((prevVals) => ({
                    ...prevVals,
                    ["description"]: e.target.value,
                  }))
                }
                value={product.description}
              />
              <h5>Product Detail Description</h5>
              <Textarea
                placeholder="Add a detailed description for your product"
                className="w-[270px h-[40px]"
              />
              <h5>Return Policy</h5>
              <p className="">Date Added</p>
              <div className="flex justify-between gap-x-[12px]">
                <Input type="date" />
                <Input type="time" />
              </div>
            </div>
          </form>
        </div>
        {/* Images */}
        <div className="flex w-[30%] flex-col shrink p-[12px] ">
          <div className="w-full flex justify-between gap-x-[24px] py-[8px]">
            <Button>Save as Draft</Button>
            <Button onClick={handleSavePublish}>Save & Publish</Button>
          </div>
          {/* Images */}
          <div className="rounded-[8px] w-full mt-[10px]">
            <div className=" relative border flex items-center justify-center rounded-[8px] p-[16px]">
              {/* Icons */}
              <div className="absolute top-[10px] flex gap-x-[8px] right-[10px]">
                <IoCloudUploadOutline />
                <TbTrash />
              </div>
              <img src={iphoneBig} />
            </div>
            <h4 className="mt-[10px]">Addidtional Images</h4>
            <div className="flex mt-[10px] gap-x-[12px] justify-between">
              <div className="w-[120px] relative border rounded-[8px] flex items-center justify-center py-[16px]">
                {/* Icons */}
                <div className="absolute top-0 flex gap-x-[8px] right-[6px] text-blue-500">
                  <IoCloudUploadOutline />
                  <TbTrash />
                </div>
                <img src={iphoneSmall} className="size-[72px] object-contain" />
              </div>
              <div className="w-[120px] flex flex-col items-center justify-center border rounded-[8px] border-blue-500 ">
                <MdImage className="text-[44px]" />
                <div className="flex gap-x-[4px] items-center">
                  <TbTrash className="" />
                  <span className="text-[12px]">Upload Image</span>
                </div>
              </div>
            </div>
            <div className="mt-[14px] border border-dotted rounded-[8px] size-[100px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
