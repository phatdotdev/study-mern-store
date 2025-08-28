import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import Navigation from "../Auth/Navigation";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductsByIdQuery(params._id);
  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [quantity, setQuantity] = useState(productData?.quantity || 0);
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);
  const [uploadImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const { data: categories = [] } = useFetchCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success("Item add successfully.");
      setImage(res.image);
    } catch (error) {
      toast.error("Product update failure.");
    }
  };

  const handleSubmit = async (e) => {
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await updateProduct({
        productId: params._id,
        productData,
      });
      if (data.error) {
        toast.error("Product update failed. Try again.");
      } else {
        toast.success(`${data.name} is updated.`);
        navigate("/admin/allproducts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try again.");
    }
  };
  const handleDelete = async (e) => {
    try {
      let answer = window.confirm(
        "Are you sure to want to delete this product?"
      );
      if (answer) {
        const { data } = await deleteProduct(params._id);
        toast.success(`${data.name} is deleted.`);
        navigate("/admin/allproducts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product delete failed. Try again.");
    }
  };

  return (
    <>
      <Navigation />
      <AdminMenu />
      <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
            <div className="h-12">Update Product</div>
            {image && (
              <div className="text-center">
                <img
                  src={"http://localhost:5000/" + image}
                  alt="product"
                  className="block mx-auto max-h-[200px]"
                />
              </div>
            )}
            <div className="mb-3">
              <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : "text-white"}
                />
              </label>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap gap-4">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="two">
                  <label htmlFor="name block">Price</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="one">
                  <label htmlFor="name">Quantity</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="two">
                  <label htmlFor="name block">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="" className="my-5">
                  Description
                </label>
                <textarea
                  className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-between flex-wrap">
                <div>
                  <label htmlFor="name block">Count In Stock</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Category</label> <br />
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex justify-center items-center p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 mr-5 rounded-lg text-lg font-bold bg-pink-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;
