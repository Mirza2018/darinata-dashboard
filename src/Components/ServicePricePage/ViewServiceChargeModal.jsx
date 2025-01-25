/* eslint-disable react/prop-types */
import { Form, Input, Modal } from "antd";
import React from "react";

const ViewEarningTable = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
}) => {
  console.log("currentRecord", currentRecord);
  const onFinish = (values) => {
    console.log("clinivea_user:", values);
  };
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
          How much Service Charge do you want?
        </h1>
        <Form
          layout="vertical"
          className="bg-transparent w-full"
          onFinish={onFinish}
        >
          <Input
                      placeholder="Enter Service Charge"
                      type="number"
            className="py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              className="bg-[#FF991C] text-white py-3 text-xl font-semibold rounded-lg mt-8 w-fit px-8 "
            >
              Confirm
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ViewEarningTable;
