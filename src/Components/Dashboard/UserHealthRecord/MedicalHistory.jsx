"use client";

import { useState } from "react";
// import { FaUserMd, FaHospital, FaPhone, FaIdCard } from "react-icons/fa";

export default function MedicalHistory() {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    insuranceCompany: "",
    memberId: "",
    groupNumber: "",
    doctorName: "",
    doctorPhone: "",
    address: "",
    injuries: "",
    Surgeries: "",
    outherIssue: "",
  });

  const healthConditions = [
    { id: "cataracts", label: "Cataracts" },
    { id: "colitis", label: "Colitis /Crohns" },
    { id: "chronicPain", label: "Chronic Pain" },
    { id: "depression", label: "Depression" },
    { id: "drugAddiction", label: "Drug Addiction" },
    { id: "heartDisease", label: "Heart Disease" },
    { id: "highCholesterol", label: "High Cholesterol" },
    { id: "irritableBowel", label: "Irritable Bowel" },
    { id: "liverDisease", label: "Liver Disease" },
    { id: "mentalIllness", label: "Mental Illness" },
    { id: "kidneyDisease", label: "Kidney Disease" },
    { id: "lungDisease", label: "Lung Disease" },
  ];



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#F7F8F8] rounded-lg shadow">
      <h1 className="text-2xl font-normal text-secondary-color mb-6">
        Medical History Log:
      </h1>

      {/* Basic Information */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="flex justify-start items-center">
          <label className="block text-sm font-medium text-gray-700 ">
            Name:
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="pl-10 outline-none bg-[#F7F8F8] block w-full sm:text-sm  border-b-2 border-black "
          />
        </div>

        <div className="flex justify-center items-center">
          <label className="block text-sm font-medium text-gray-70 whitespace-nowrap">
            Date of Birth:
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="pl-10 outline-none bg-[#F7F8F8]  block w-full sm:text-sm  border-b-2 border-black "
          />
        </div>
      </div>

      {/* Insurance Information */}
      <div className="mb-6">
        <h2 className="text-lg font-medium bg-[#FEEBEA] text-black lg:px-32 px-5 py-2 rounded-3xl mb-4 w-fit  place-self-center">
          INSURANCE INFORMATION
        </h2>

        <div className="space-y-3">
          <div className="flex justify-start items-center">
            <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">
              Name of Company:
            </label>
            <div className="mt-1 relative w-full">
              <input
                type="text"
                name="insuranceCompany"
                value={formData.insuranceCompany}
                onChange={handleInputChange}
                className="pl-10 outline-none bg-[#F7F8F8] block w-full sm:text-sm border-b-2 border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-start items-center">
              <label className="block text-sm font-medium text-gray-700">
                Member ID:
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <FaIdCard className="text-gray-400" /> */}
                </div>
                <input
                  type="text"
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleInputChange}
                  className="pl-10 outline-none bg-[#F7F8F8]  block w-full sm:text-sm  border-b-2 border-black "
                />
              </div>
            </div>
            <div className="flex justify-start items-center">
              <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">
                Group Number:
              </label>
              <input
                type="text"
                name="groupNumber"
                value={formData.groupNumber}
                onChange={handleInputChange}
                className="pl-10 outline-none bg-[#F7F8F8] block w-full sm:text-sm  border-b-2 border-black "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Health Care Provider */}
      <div className="mb-6">
        <h2 className="text-lg font-medium bg-[#FEEBEA] text-black  lg:px-32 px-5  py-2 rounded-3xl mb-4 w-fit  place-self-center">
          PRIMARY HEALTH CARE PROVIDER
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-start items-center">
            <label className="block text-sm font-medium text-gray-700">
              Name of Doctor:
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <FaUserMd className="text-gray-400" /> */}
              </div>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                className="pl-10 outline-none bg-[#F7F8F8] block w-full sm:text-sm  border-b-2 border-black "
              />
            </div>
          </div>
          <div className="flex justify-start items-center ">
            <label className="block text-sm font-medium text-gray-700 whitespace-nowrap ">
              Phone Number:
            </label>

            <input
              type="tel"
              name="doctorPhone"
              value={formData.doctorPhone}
              onChange={handleInputChange}
              className="pl-10 outline-none bg-[#F7F8F8] block w-full sm:text-sm  border-b-2 border-black "
            />
          </div>
        </div>

        <div className="flex justify-start items-center mt-3">
          <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">
            Address:
          </label>
          <div className="mt-1 relative w-full">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="pl-10 outline-none bg-[#F7F8F8] block w-full sm:text-sm border-b-2 border-black"
            />
          </div>
        </div>
      </div>

      {/* Personal Health History */}
      <div className="mb-6">
        <h2 className="text-lg font-medium bg-[#FEEBEA] text-black  lg:px-32 px-5  py-2 rounded-3xl mb-4 w-fit  place-self-center">
          PERSONAL HEALTH HISTORY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
          {healthConditions.map((condition) => (
            <div key={condition.id} className="flex items-center">
              <input
                type="checkbox"
                id={condition.id}
                className="h-4 w-4 bg-[#F7F8F8] border-gray-300 rounded"
              />
              <label
                htmlFor={condition.id}
                className="ml-2 block text-sm text-gray-900"
              >
                {condition.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-start items-center mt-3">
        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">
          Hospitalizations/ Significant Injuries:
        </label>
        <div className="mt-1 relative w-full">
          <input
            type="text"
            name="injuries"
            value={formData.injuries}
            onChange={handleInputChange}
            className="pl-10 bg-[#F7F8F8] outline-none block w-full sm:text-sm border-b-2 border-black"
          />
        </div>
      </div>
      <div className="flex justify-start items-center mt-3">
        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">
          Surgeries / Procedures:
        </label>
        <div className="mt-1 relative w-full">
          <input
            type="text"
            name="surgeries"
            value={formData.surgeries}
            onChange={handleInputChange}
            className="pl-10 bg-[#F7F8F8] outline-none block w-full sm:text-sm border-b-2 border-black"
          />
        </div>
      </div>

      <div className="flex justify-start items-center mt-3">
        <label className="block text-sm font-medium text-gray-700 whitespace-nowrap">
          Other Medical Issues:
        </label>
        <div className="mt-1 relative w-full">
          <input
            type="text"
            name="outherIssue"
            value={formData.outherIssue}
            onChange={handleInputChange}
            className="pl-10 bg-[#F7F8F8] outline-none block w-full sm:text-sm border-b-2 border-black"
          />
        </div>
      </div>

      {/* Progress Notes */}


      
    </div>
  );
}
