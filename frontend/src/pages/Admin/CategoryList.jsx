import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categorySlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/modal";
import AdminMenu from "./AdminMenu";
import Navigation from "../Auth/Navigation";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required.");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is created successfully.`);
        setName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatedName) {
      toast.error("Category name is required.");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        data: { name: updatedName },
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.data.name} is updated.`);
        setModalVisible(false);
      }
    } catch (error) {
      toast.error();
    }
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteCategory(selectedCategory._id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${updatedName} delete successfully.`);
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Category deletion failed. Try agiain.");
    }
  };
  return (
    <>
      <Navigation />
      <div className="ml-[10rem] flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Manage Categories</div>
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
          <br></br>
          <hr></hr>
          <div className="flex flex-wrap">
            {categories?.map((category) => (
              <div key={category._id}>
                <button
                  className="bg-transparent border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => {
                    {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatedName(category.name);
                      console.log(category.name);
                    }
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdateCategory}
              buttonText="Update"
              handleDelete={handleDeleteCategory}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
