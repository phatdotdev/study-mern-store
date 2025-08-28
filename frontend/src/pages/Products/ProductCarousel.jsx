import { useGetTopProductQuery } from "../../redux/api/productSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autopalySpeed: 3000,
  };
  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[40rem] lg:w-[40rem] md:w-[45rem] sm:w-[35rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={"http://localhost:5000/" + image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[25rem]"
                />
                <div className="flex justify-between w-[15rem]">
                  <div className="one">
                    <h2>{name}</h2>
                    <p>$ {price}</p> <br /> <br />
                    <p className="w-[15rem] mr-2">
                      {description.substring(0, 170)}...
                    </p>
                  </div>
                  <div className="flex flex-col justify-between w-[12rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6 w-[12rem]">
                        <FaStore className="mr-2 text-white" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[12rem]">
                        <FaClock className="mr-2 text-white" /> Added:
                        {moment(createAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[12rem]">
                        <FaStar className="mr-2 text-white" /> Reviews:{" "}
                        {numReviews}
                      </h1>
                    </div>
                  </div>
                  <div className="two">
                    <h1 className="flex items-center mb-6 w-[8rem]">
                      <FaStar className="mr-2 text-white" />
                      Ratings: {Math.round(rating)}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[8rem]">
                      <FaShoppingCart className="mr-2 text-white" />
                      Quantity: {quantity}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[8rem]">
                      <FaBox className="mr-2 text-white" />
                      Ratings: {countInStock}
                    </h1>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
