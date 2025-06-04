/* eslint-disable react/prop-types */
import { Avatar, Modal, Spin } from "antd";

import {
  useConversationDetailsQuery,
  useDealerDetailsQuery,
} from "../../../redux/api/adminApi";
import { getImageUrl } from "../../../redux/getBaseUrl";

const ViewDealerChat = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
}) => {
  console.log("currentRecord", currentRecord?.conversationId);

  const { data, isLoading } = useConversationDetailsQuery(
    currentRecord?.conversationId
  );

  const { data: dealerData, isLoading: isDealerLoading } =
    useDealerDetailsQuery({ id: currentRecord?.dealerId });
  const { data: carownerData, isLoading: isCarOwner } = useDealerDetailsQuery({
    id: currentRecord?.carOwner,
  });

  console.log(
    "conversation Dealer",
    dealerData?.data?.user?.email,
    dealerData?.data?.user?.profile?.profileImage
  );
  console.log(
    "conversation carowener",
    carownerData?.data?.user?.email,
    carownerData?.data?.user?.profile?.profileImage
  );

  let dealerImage;
  let carOwenerImage;
  if (dealerData?.data?.user?.profile?.profileImage) {
    dealerImage = getImageUrl() + dealerData?.data?.user?.profile?.profileImage;
  }
  if (carOwenerImage?.data?.user?.profile?.profileImage) {
    dealerImage =
      getImageUrl() + carOwenerImage?.data?.user?.profile?.profileImage;
  }

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
      <div className=" bg-gray-50 flex flex-col">
        {isLoading ? (
          <Spin size="large"></Spin>
        ) : (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-3">
                {/* <Avatar src={chatData.user.avatar} size={40} /> */}
                {carOwenerImage ? (
                  <Avatar src={carOwenerImage} size={40} />
                ) : (
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    {carownerData?.data?.user?.profile?.first_name.slice(0, 1)}
                  </Avatar>
                )}

                <div>
                  <h2 className="font-semibold">
                    {carownerData?.data?.user?.profile?.first_name}{" "}
                    {carownerData?.data?.user?.profile?.last_name}{" "}
                    {/* ({carownerData?.data?.user?.email}) */}
                  </h2>
                  {/* {chatData.user.isTyping && (
                    <p className="text-sm text-gray-500">Larry is Typing....</p>
                  )} */}
                </div>
              </div>
              {/* <Button
            type="text"
            icon={<CloseOutlined />}
            className="border-none shadow-none"
          /> */}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
              {data?.data.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message?.senderId === currentRecord?.carOwner
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message?.senderId === currentRecord?.dealerId && (
                    <>
                      {carOwenerImage ? (
                        <Avatar src={carOwenerImage} className="mt-1 mr-2" />
                      ) : (
                        <Avatar
                          style={{
                            backgroundColor: "#fde3cf",
                            color: "#f56a00",
                          }}
                        >
                          {carownerData?.data?.user?.profile?.first_name.slice(
                            0,
                            1
                          )}
                        </Avatar>
                      )}
                    </>
                  )}
                  <div
                    className={`max-w-[70%] ${
                      message?.senderId === currentRecord?.carOwner
                        ? "items-end"
                        : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 ${
                        message?.senderId === currentRecord?.carOwner
                          ? "bg-coral-100 text-black"
                          : "bg-gray-100"
                      }`}
                    >
                      {message?.message}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {message.time}
                    </span>
                  </div>
                  {message?.senderId === currentRecord?.carOwner && (
                    // <Avatar src={dealerImage} className="mt-1 ml-2" />
                    <>
                      {dealerImage ? (
                        <Avatar src={dealerImage} className="mt-1 mr-2" />
                      ) : (
                        <Avatar
                          style={{
                            backgroundColor: "#fde3cf",
                            color: "#f56a00",
                          }}
                        >
                          {dealerData?.data?.user?.profile?.first_name.slice(
                            0,
                            1
                          )}
                        </Avatar>
                      )}
                    </>
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
                   { currentRecord?.conversationId}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Dealer Name:</span>{" "}
                    {dealerData?.data?.user?.profile?.first_name}{" "}
                    {dealerData?.data?.user?.profile?.last_name}{" "}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">User Name:</span>{" "}
                    {carownerData?.data?.user?.profile?.first_name}{" "}
                    {carownerData?.data?.user?.profile?.last_name}{" "}
                  </p>
                  {/* <p className="text-sm">
                    <span className="text-gray-500">Last Activity:</span>{" "}
                    {currentRecord?.conversationId}
                  </p> */}
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
              {/* <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button danger type="primary">
              Delete
            </Button>
          </div> */}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ViewDealerChat;
