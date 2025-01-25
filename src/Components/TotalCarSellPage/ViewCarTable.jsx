/* eslint-disable react/prop-types */
import { Divider, Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";
import React from "react";

const ViewCarTable = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
}) =>
{
  console.log("currentRecord", currentRecord);
  return (
    <Modal
      title={
        <div className="pt-7">
          {/* <h2 className="text-secondary-color text-4xl ">Users Details</h2> */}
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[1200px] !bg-[#FFF9FD]"
    >
      <div className="p-10 grid grid-cols-3 gap-4 bg-[#FFF9FD]">
        {/* Avatar */}
        <div className="col-span-2">
          <img
            src={AllImages.carimg}
            alt={currentRecord?.userName}
            className="h-full aspect-square object-cover"
          />{" "}
        </div>
        <div>
          <div className="flex flex-col gap-2 bg-secondary-color p-5 rounded-lg border border-[#ADD8E6]">
            <h1 className="text-sm font-bold flex">Total Car Sell</h1>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Car Owner Name</h2>
              <p className="text-sm font-semibold">
                {currentRecord?.ownerName}
              </p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Dealer Name</h2>
              <p className="text-sm font-semibold">
                {currentRecord?.dealerName}
              </p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Brand Name</h2>
              <p className="text-sm font-semibold">
                {currentRecord?.brandName}
              </p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Car Model</h2>
              <p className="text-sm font-semibold">{currentRecord?.carModel}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Location</h2>
              <p className="text-sm font-semibold">{currentRecord?.location}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Color</h2>
              <p className="text-sm font-semibold">{currentRecord?.color}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Price</h2>
              <p className="text-sm font-semibold">{currentRecord?.price}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-secondary-color p-5 rounded-lg border border-[#ADD8E6] mt-6">
            <h1 className="text-sm font-bold flex">Total Car Sell</h1>
            <div className="flex justify-between">
              <h2 className="text-xs font-medium">Car Price</h2>
              <p className="text-xs font-medium">{currentRecord?.price}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-xs font-medium">Application service fee</h2>
              <p className="text-xs font-medium">1000</p>
            </div>
            <Divider style={{ borderColor: "#004AAD" }}></Divider>

            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Total</h2>
              <p className="text-sm font-bold">6000</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Payment By</h2>
              <p className="text-sm font-bold">Card</p>
            </div>
          </div>

          <button
            onClick={handleCancel}
            className="bg-[#FF991C] text-white py-3 text-xl font-semibold rounded-lg mt-8 w-full"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewCarTable;
