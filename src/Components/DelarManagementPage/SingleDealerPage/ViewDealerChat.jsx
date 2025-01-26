/* eslint-disable react/prop-types */
import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Divider, Modal } from "antd";

import React from "react";
import { AllImages } from "../../../../public/images/AllImages";


const ViewDealerChat = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
}) => {
  console.log("currentRecord", currentRecord);

  const chatData = {
    user: {
      name: "Larry",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-44H3H7yohwRNAyRfNWRqKT9LQXUZw2.png",
      isTyping: true,
      status: "online",
    },
    messages: [
      {
        id: 1,
        text: "omg, this is amazing",
        sender: "user",
        time: "2 min ago",
      },
      { id: 2, text: "perfect! ✅", sender: "user", time: "2 min ago" },
      {
        id: 3,
        text: "Wow, this is really epic",
        sender: "user",
        time: "2 min ago",
      },
      { id: 4, text: "woohoooo", sender: "other", time: "just now" },
      { id: 5, text: "Haha oh man", sender: "other", time: "just now" },
      {
        id: 6,
        text: "Haha that's terrifying 🤣",
        sender: "other",
        time: "just now",
      },
    ],
    chatInfo: {
      id: "#1234",
      dealerName: "Dealer A",
      userName: "User X",
      lastActivity: "2024-12-30",
      status: "Active",
      report: "No",
      seeReason: "Spam",
    },
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
      className="lg:min-w-[800px] !bg-[#FFF9FD]"
    >
      <div className="max-w-2xl mx-auto bg-gray-50 h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-white p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Badge dot status="success" offset={[-2, 32]}>
              {/* <Avatar src={chatData.user.avatar} size={40} /> */}
              <Avatar src={AllImages.person1} size={40} />
            </Badge>
            <div>
              <h2 className="font-semibold">{chatData.user.name}</h2>
              {chatData.user.isTyping && (
                <p className="text-sm text-gray-500">Larry is Typing....</p>
              )}
            </div>
          </div>
          {/* <Button
            type="text"
            icon={<CloseOutlined />}
            className="border-none shadow-none"
          /> */}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatData.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "other" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "user" && (
                // <Avatar src={chatData.user.avatar} className="mt-1 mr-2" />
                <Avatar src={AllImages.person1} className="mt-1 mr-2" />
              )}
              <div
                className={`max-w-[70%] ${
                  message.sender === "other" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "other"
                      ? "bg-coral-100 text-black"
                      : "bg-gray-100"
                  }`}
                >
                  {message.text}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {message.time}
                </span>
              </div>
              {message.sender === "other" && (
                // <Avatar src="/placeholder.svg" className="mt-1 ml-2" />
                <Avatar src={AllImages.person2} className="mt-1 ml-2" />
              )}
            </div>
          ))}
        </div>

        {/* Chat Info */}
        <div className="bg-white p-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <span className="text-gray-500">Chat ID:</span>{" "}
                {chatData.chatInfo.id}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Dealer Name:</span>{" "}
                {chatData.chatInfo.dealerName}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">User Name:</span>{" "}
                {chatData.chatInfo.userName}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Last Activity:</span>{" "}
                {chatData.chatInfo.lastActivity}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="text-gray-500">Status:</span>{" "}
                {chatData.chatInfo.status}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Report:</span>{" "}
                {chatData.chatInfo.report}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">See Reason:</span>{" "}
                {chatData.chatInfo.seeReason}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button  danger type="primary">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewDealerChat;
