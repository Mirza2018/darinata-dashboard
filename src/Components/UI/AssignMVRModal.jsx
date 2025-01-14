/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useState } from "react";
import { Input, List, Radio } from "antd";

const AssignMVRModal = ({
  isAssignMVRVisible,
  handleCancel,

  handleOk,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const users = [
    {
      id: "1",
      name: "Julee Ann",
      profileImage: "/../../../../public/images/userImage.png",
    },
    {
      id: "2",
      name: "Julee Ann",
      profileImage: "/../../../../public/images/userImage.png",
    },
    {
      id: "3",
      name: "Julee Ann",
      profileImage: "/../../../../public/images/userImage.png",
    },
    {
      id: "4",
      name: "Julee Ann",
      profileImage: "/../../../../public/images/userImage.png",
    },
  ];
  const handleSelect = (userId) => {
    setSelectedUser(userId);
  };
  return (
    <Modal
      //   title={
      //     <div className="pt-7">
      //       <h2 className="text-secondary-color text-4xl ">Users Details</h2>
      //     </div>
      //   }
      open={isAssignMVRVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[800px]"
    >
      <div className=" mx-auto p-4 mt-5">
        <Input
          placeholder="Search MVR"
          className="mb-4 border-red-500 py-3"
          style={{ borderRadius: "8px" }}
        />
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              className={`hover:bg-gray-100 ${
                selectedUser === user.id ? "bg-red-50" : ""
              }`}
              onClick={() => handleSelect(user.id)}
            >
              <List.Item.Meta
                avatar={
                  <div className="flex items-center gap-3">
                    <div className="rounded-full border border-secondary-color">
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>{user.name}</div>
                  </div>
                }
                // title=
              />
              <Radio
                checked={selectedUser === user.id}
                onChange={() => handleSelect(user.id)}
              />
            </List.Item>
          )}
        />
        <button
          onClick={() => handleOk()}
          disabled={!selectedUser}
          className="bg-secondary-color text-primary-color border border-secondary-color px-2 w-full rounded-md font-semibold text-lg sm:text-xl lg:text-2xl py-2 mt-5"
        >
          Assign
        </button>
      </div>
    </Modal>
  );
};

export default AssignMVRModal;
