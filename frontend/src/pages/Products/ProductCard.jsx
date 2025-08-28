import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCard } from "../../redux/features/cart/cartSlide";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const addToCardHandler = (product, qty) => {
    dispatch(addToCard({ ...product, qty }));
    toast.success("Item added successfully.");
  };
  return (
    <div>
      <section className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dar:bg-gray-800 w-[18rem]">
        <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
          {product?.brand}
        </span>
        <Link to={`/product/${product._id}`}>
          <img
            src={"http://localhost:5000/" + product.image}
            alt={product.name}
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={product} />
      </section>
      <div className="p-5 w-[18rem]">
        <div className="flex justify-between">
          <h5 className="mb-2 text-lg text-white dark:text-white">
            {product?.name}
          </h5>
          <p className="text-black font-semibold text-pink-500">
            $ {product?.price}
          </p>
        </div>
        <p className="mb-2 font-normal text-[#CFCFCF] text-wrap w-full">
          {product?.description?.substring(0, 60)}...
        </p>
        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white
                        bg-pink-700 rounded-lg"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <button
            className="p-2 rounded-full"
            onClick={() => addToCardHandler(product, 1)}
          >
            <AiOutlineShopping size={25} className="cursor-pointer" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
