import { Input } from "@/components/ui/input";
import { PiPencilSimple } from "react-icons/pi";
import watch from "../../../assets/watch-small.png";
import { RiMoreLine } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";
import { ProductProps } from "../add-product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AllProducts = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`${apiUrl}/products`),
  });
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="border-b text- ">
          <tr className="">
            <th className="-[12px] flex gap-x-[8px] items-baseline">
              <Input type="checkbox" className="size-[18px]" />
              <span>No ID</span>
            </th>
            <th className=""> </th>
            <th className=" text-start"> Product</th>
            <th className=" text-start"> SKU</th>
            <th className="  text-start"> Location</th>
            <th className=" text-start"> Price</th>
            <th className="  text-start"> Stock</th>
            <th className=" text-start  "> Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.data.map((product: ProductProps) => (
            <tr
              key={product.noID}
              className="-b w-full  text-cente hover:font-bold border-b "
            >
              <td className="flex gap-x-[8px] py-[14px] ">
                <Input type="checkbox" className="size-[18px]" />
                <span>{product.noID}</span>
              </td>
              <td className="-[18px]">
                <img src={watch} className="size-[36px] object-cover" />
              </td>
              <td className="-[18px] ">
                <div className="flex flex-col">
                  <span>{product.name}</span>
                </div>
              </td>
              <td className=" flex gap-x-[4px] items-center -[18px]">
                <span>{product.sku}</span>
              </td>
              <td className="">{product.location}</td>
              <td className="">$ {product.costPrice}</td>
              <td className=" ">{product.quantity}</td>
              <td className="flex gap-x-[6px] ">
                <PiPencilSimple />
                <MdOutlineContentCopy className="" />
                <RiMoreLine />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
