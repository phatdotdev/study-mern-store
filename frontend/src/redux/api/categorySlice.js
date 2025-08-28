import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../features/constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ data, categoryId }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice;
