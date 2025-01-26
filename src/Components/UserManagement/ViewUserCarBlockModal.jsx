/* eslint-disable react/prop-types */
import { Divider, Form, Input, Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";
import React, { useEffect, useState } from "react";

const ViewUserCarBlockModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
}) => {
  const [block, setBlock] = useState(currentRecord?.isBlock);
//   console.log("currentRecord", currentRecord);
    console.log("block", block);
    useEffect(() => {
        setBlock(currentRecord?.isBlock);
    }, [currentRecord]);


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
      className="lg:min-w-[700px] !bg-[#FFF9FD]"
    >
      <div className="p-10 grid gap-4 bg-[#FFF9FD]">
        <h1 className="text-[32px] font-medium ">
          {block
            ? "Do you want to unblock this car?"
            : "Are you sure you want to temporarily block this car?"}
        </h1>

        {/* <Input
            placeholder="Enter Service Charge"
            type="number"
            className="py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
          /> */}
        <div className="flex justify-around mx-20">
          <button
            onClick={handleCancel}
            className="bg-[#F3F9FB] border border-[#ADD8E6] text-black py-3 text-xl font-semibold rounded-lg mt-8 w-fit px-8 "
          >
            No
          </button>
          <button
            onClick={() => {
              setBlock(!block);
              handleCancel();
            }}
            className="bg-[#FE3838] border border-[#ADD8E6] text-white py-3 text-xl font-semibold rounded-lg mt-8 w-fit px-8 "
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserCarBlockModal;
