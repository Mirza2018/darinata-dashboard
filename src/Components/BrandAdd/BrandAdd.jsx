"use client";

import { useState } from "react";
import {
  useAllBrandQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
} from "../../redux/api/adminApi";
import { formToJSON } from "axios";
import { getImageUrl } from "../../redux/getBaseUrl";
import { toast } from "sonner";

export default function BrandAdd() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  });

  const [formData, setFormData] = useState({
    brandName: "",
    brandLogo: null,
  });

  const { data, isLoading: isFetching } = useAllBrandQuery(filters);
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const [showForm, setShowForm] = useState(false);

  const onPageChange = (page, limit) => {
    setFilters((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        brandLogo: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Bilmærket tilføjes...");
    e.preventDefault();

    if (!formData.brandName.trim()) {
      toast.warning("Indtast et bilmærke", {
        id: toastId,
        duration: 2000,
      });
      return;
    }
    if (!formData.brandLogo) {
      toast.warning("Indtast venligst et mærkelogo", {
        id: toastId,
        duration: 2000,
      });
      return;
    }
    // console.log(formData);

    //     return
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.brandName);
      if (formData.brandLogo) {
        submitData.append("image", formData.brandLogo);
      }

      const res = await createBrand(submitData).unwrap();
      console.log(res);
      toast.success("Mærket er tilføjet.", {
        id: toastId,
        duration: 2000,
      });

      // Reset form on success
      setFormData({ brandName: "", brandLogo: null });
      setShowForm(false);

      // Reset file input
      const fileInput = document.getElementById("brandLogo");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error("Mærkeoprettelse mislykkedes. Prøv venligst igen.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Bilmærket slettes...");
    try {
      const res = await deleteBrand(id).unwrap();
      console.log(res);
      toast.success("Mærket er blevet slettet.", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Der er et problem. Prøv venligst igen.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const brands = data?.brands || data || [];

  return (
    <div className="min-h-[90vh] p-4 bg-gray-50">
      <div
        className="bg-white p-6 rounded-lg mb-6"
        style={{ boxShadow: "0px 0px 2px 1px #00000040" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Opgavetitel</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span>
            Tilføj et nyt bilmærke
          </button>
        </div>

        {/* Add Brand Form */}
        {showForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-dashed border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Tilføj et nyt bilmærke
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="brandName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mærkenavn *
                  </label>
                  <input
                    type="text"
                    id="brandName"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    placeholder="Indtast venligst et mærkenavn (f.eks. Tesla, Ford)."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="brandLogo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mærkelogo
                  </label>
                  <input
                    type="file"
                    id="brandLogo"
                    name="brandLogo"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Tilføjer...
                    </>
                  ) : (
                    <>
                      <span>✓</span>
                      Tilføj bilmærke
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ brandName: "", brandLogo: null });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Annuller
                </button>
              </div>
            </form>
          </div>
        )}

        {isFetching ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Indlæser bilmærker...</span>
          </div>
        ) : (
          /* Brands Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brands?.data?.map((brand) => (
              <div
                key={brand.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={getImageUrl() + brand?.image}
                      alt={`${brand?.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-4">
                    {brand?.name}
                  </h3>
                  <div className="flex gap-2 w-full">
                    {/* <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded text-sm transition-colors duration-200">
                      Edit
                    </button> */}
                    <button
                      onClick={() => handleDelete(brand?._id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded text-sm transition-colors duration-200"
                    >
                      Slet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {/* <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() =>
              onPageChange(Math.max(1, filters.page - 1), filters.limit)
            }
            disabled={filters.page === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors duration-200"
          >
            Previous
          </button>
          <span className="text-gray-600">Page {filters.page}</span>
          <button
            onClick={() => onPageChange(filters.page + 1, filters.limit)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
}
