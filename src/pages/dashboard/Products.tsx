import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiGridAlt } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoListOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AllProducts from "./components/products";

const Products = () => {
  // const [products, setProducts] = useState<ProductProps>();
  const navigateTo = useNavigate();

  return (
    <div className="w-full flex flex-col px-[12px] pt-[8px]">
      {/* Top Nav */}
      <div className="w-full flex justify-between">
        <div className="relative">
          <IoIosSearch className="absolute top-[50%] translate-y-[-50%] left-[8px] text-slate-800" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[220px] pl-[32px]"
          />
        </div>
        {/* Filteration */}
        <div className="flex gap-x-[8px]">
          <Button className="flex items-center gap-x-[4px]">
            <span>Best Seller</span>
            <MdOutlineKeyboardArrowDown />
          </Button>
          <Button className="flex items-center gap-x-[6px]">
            <div className="flex gap-x-[2px]">
              <span>Filter:</span>
              <span className="text-gray-400">No ID</span>
            </div>
            <MdOutlineKeyboardArrowDown />
          </Button>
          <Button
            onClick={() => navigateTo("/dashboard/product/add")}
            className="flex items-center gap-x-[4px]"
          >
            <span>Add Item</span>
            <BsPlus />
          </Button>
          <div className="p-[1px] flex gap-x-[4px]  bg-black rounded-[8px]">
            <Button className="bg-white px-[12px]">
              <IoListOutline className="text-black " />
            </Button>
            <Button>
              <BiGridAlt />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-[32px]">
        <AllProducts />
      </div>
    </div>
  );
};

export default Products;
