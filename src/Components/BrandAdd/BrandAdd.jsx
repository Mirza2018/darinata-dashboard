"use client";

import { useState } from "react";
import {
  useAllBrandQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useEditBrandMutation,
} from "../../redux/api/adminApi";
import { getImageUrl } from "../../redux/getBaseUrl";
import { toast } from "sonner";
import { Modal } from "antd";

export default function BrandAdd() {
  const [filters] = useState({ page: 1, limit: 8 });

  const [formData, setFormData] = useState({
    brandName: "",
    brandLogo: null,
  });

  // Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editFormData, setEditFormData] = useState({
    brandName: "",
    brandLogo: null,
  });

  const { data, isLoading: isFetching } = useAllBrandQuery(filters);
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();
  const [editBrand, { isLoading: isEditing }] = useEditBrandMutation();

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, brandLogo: file }));
    }
  };

  // Edit Handlers
  const handleEditClick = (brand) => {
    setEditingBrand(brand);
    setEditFormData({
      brandName: brand.name || "",
      brandLogo: null, // Only new file
    });
    setIsModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData((prev) => ({ ...prev, brandLogo: file }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Opdaterer bilmærke...");

    if (!editFormData.brandName.trim()) {
      toast.warning("Mærkenavn er påkrævet", { id: toastId });
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("name", editFormData.brandName);

      if (editFormData.brandLogo) {
        submitData.append("image", editFormData.brandLogo);
      }

      await editBrand({
        id: editingBrand._id,
        data: submitData,
      }).unwrap();

      toast.success("Mærket er blevet opdateret!", {
        id: toastId,
        duration: 2000,
      });

      setIsModalOpen(false);
      setEditingBrand(null);
      setEditFormData({ brandName: "", brandLogo: null });
    } catch (error) {
      toast.error("Opdatering mislykkedes. Prøv igen.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    // ... your existing add logic (unchanged)
    const toastId = toast.loading("Bilmærket tilføjes...");
    e.preventDefault();

    if (!formData.brandName.trim()) {
      toast.warning("Indtast et bilmærke", { id: toastId });
      return;
    }
    if (!formData.brandLogo) {
      toast.warning("Indtast venligst et mærkelogo", { id: toastId });
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("name", formData.brandName);
      submitData.append("image", formData.brandLogo);

      await createBrand(submitData).unwrap();

      toast.success("Mærket er tilføjet.", { id: toastId });
      setFormData({ brandName: "", brandLogo: null });
      setShowForm(false);

      const fileInput = document.getElementById("brandLogo");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error("Mærkeoprettelse mislykkedes.", { id: toastId });
    }
  };

  const handleDelete = (id) => {
    // ... your existing delete logic (unchanged)
    Modal.confirm({
      title: "Er du sikker?",
      content: "Vil du virkelig slette dette bilmærke?",
      okText: "Ja",
      cancelText: "Nej",
      onOk: async () => {
        const toastId = toast.loading("Bilmærket slettes...");
        try {
          await deleteBrand(id).unwrap();
          toast.success("Mærket er blevet slettet.", { id: toastId });
        } catch (error) {
          toast.error("Der opstod en fejl.", { id: toastId });
        }
      },
    });
  };

  const brands = data?.brands?.data || data?.data || data?.brands || [];

  return (
    <div className="min-h-[90vh] p-4 bg-gray-50">
      {/* ... Your existing header and Add Form (unchanged) ... */}

      <div
        className="bg-white p-6 rounded-lg mb-6"
        style={{ boxShadow: "0px 0px 2px 1px #00000040" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Bilmærker</h1>
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
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-3 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={getImageUrl() + brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                {brand.name}
              </h3>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => handleEditClick(brand)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded text-sm transition-colors"
                >
                  Rediger
                </button>
                <button
                  onClick={() => handleDelete(brand._id)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded text-sm transition-colors"
                >
                  Slet
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== EDIT MODAL ==================== */}
      <Modal
        title="Rediger bilmærke"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingBrand(null);
        }}
        footer={null}
        centered
      >
        {editingBrand && (
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mærkenavn *
              </label>
              <input
                type="text"
                name="brandName"
                value={editFormData.brandName}
                onChange={handleEditInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nuværende logo
              </label>
              <div className="flex justify-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <img
                  src={getImageUrl() + editingBrand.image}
                  alt="Current logo"
                  className="max-h-32 object-contain"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nyt logo (valgfrit)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleEditFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700"
              />
              {editFormData.brandLogo && (
                <p className="text-sm text-green-600 mt-1">
                  Ny fil valgt: {editFormData.brandLogo.name}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isEditing}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isEditing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opdaterer...
                  </>
                ) : (
                  "Opdater bilmærke"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingBrand(null);
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
              >
                Annuller
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
