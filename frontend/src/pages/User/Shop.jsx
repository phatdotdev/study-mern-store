import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../../redux/api/productSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../../redux/features/shop/shopSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import Loader from "../../components/Loader";
import ProductCard from "../Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();

  const categoriesQuery = useFetchCategoriesQuery();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductQuery.isLoading) {
        const filteredProducts = filteredProductQuery.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          );
        });
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, priceFilter, radio, filteredProductQuery.data]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductQuery?.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleChecked = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductQuery?.data
          ?.map((product) => product.brand)
          ?.filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 px-4 bg-black rounded-full">
              Filter by Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4 mb-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleChecked(e.target.checked, c._id)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {/* Brand */}
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Brands
            </h2>
            <div className="p-5 w-[15rem]">
              {uniqueBrands?.map((brand) => (
                <div key={brand} className="flex items-center mr-4 mb-4">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={(e) => handleBrandClick(brand)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor={brand}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
            {/* Price */}
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="px-4 py-2 rounded border border-pink-400"
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="p-3">
            <h2 className="h4 text-center mb-2">{products.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard product={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
