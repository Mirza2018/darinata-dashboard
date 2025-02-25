/* eslint-disable react/prop-types */
import { Divider, Form, Input, Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";
import React, { useEffect, useState } from "react";

const ViewTaskCompleteTable = ({
  isViewModalVisible2,
  handleCancel2,
  currentRecord2,
  handleBlock,
}) => {
  const [block, setBlock] = useState(currentRecord2?.isBlock);
  //   console.log("currentRecord", currentRecord);
  console.log("block", block);
  useEffect(() => {
    setBlock(currentRecord2?.isBlock);
  }, [currentRecord2]);

  return (
    <Modal
      title={
        <div className="pt-7">
          {/* <h2 className="text-secondary-color text-4xl ">Users Details</h2> */}
        </div>
      }
      open={isViewModalVisible2}
      onCancel={handleCancel2}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[500px] "
    >
      <div className="p-10 grid gap-4 ">
        <h1 className="text-2xl font-medium ">
          {/* {block
            ? "Do you want to unblock this car?"
            : "Are you sure you want to temporarily block this car?"} */}
          Do you want to mark it as completed?
        </h1>

        {/* <Input
            placeholder="Enter Service Charge"
            type="number"
            className="py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
          /> */}
        <div className="flex justify-around gap-14">
          <button
            onClick={handleCancel2}
            className=" border border-secondary-color bg-base-color text-black py-3 text-xl font-semibold rounded-lg mt-8 w-full px-8 "
          >
            No
          </button>
          <button
            onClick={() => {
              setBlock(!block);
              handleCancel2();
            }}
            className="bg-[#00721E] border border-[#ADD8E6] text-white py-3 text-xl font-semibold rounded-lg mt-8 w-full px-8 "
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTaskCompleteTable;
