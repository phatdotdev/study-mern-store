import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useAllProductsQuery } from "../../redux/api/productSlice";
import Navigation from "../Auth/Navigation";
import AdminMenu from "../Admin/AdminMenu";
import moment from "moment";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <>Error loading products.</>;
  }

  const handleProductClick = (productId) => {
    navigate(`/admin/product/update/${productId}`);
  };
  return (
    <>
      <Navigation />
      <AdminMenu />
      <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className="ml-[2rem] text-xl font-bold h-12">
              All Products ({products.length})
            </div>
            <div className="flex flex-wrap justify-around items-center">
              {products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="block mb-4 overflow-hidden"
                >
                  <div className="flex">
                    <img
                      src={
                        product.image
                          ? "http://localhost:5000/" + product.image
                          : "https://a.storyblok.com/f/165154/1280x720/a9c3cc90ed/01_what-merchandise-marketing-guide.jpg"
                      }
                      alt={product.name}
                      className="w-[10rem] h-[8rem] object-cover"
                    />
                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product.name}
                        </h5>
                        <p className="text-gray-400 text-sm">
                          {moment(product.createAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                      <p className="text-gray-400 xl:w-[20rem] md:w-[10rem] sm:w-[5rem] text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                      </p>
                      <div className="flex justify-between">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 foucs:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                        </Link>
                        <p>${product?.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
