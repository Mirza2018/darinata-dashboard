/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { MdOutlineDone } from "react-icons/md";

const ViewEarningModal = ({ isViewModalVisible, handleCancel }) => {
  return (
    <Modal
      title={
        <div className="pt-5">
          <h2 className="text-secondary-color text-4xl mb-5">
            User payment details
          </h2>
        </div>
      }
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:min-w-[1000px]"
    >
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl bg-[#F5F9FE] p-5">
            <h2 className="border-b border-secondary-color text-3xl pb-2 px-3">
              User information:
            </h2>
            <div className="flex justify-start items-center gap-2 mt-3 mb-5">
              {/* Avatar */}
              <img
                src={"../../../public/images/userImage.png"}
                alt="avatar"
                className="w-14 h-14  rounded-full mr-4"
              />
              <div className="">
                <h1 className="sm:text-lg lg:text-2xl font-medium">
                  Emily jane
                </h1>
                <p className="text-sm sm:text-base lg:text-lg  text-[#4E4E4E]">
                  User
                </p>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 mb-3 font-semibold">
                <p className="text-sm sm:text-base lg:text-lg">User name: </p>
                <p className="text-sm sm:text-base lg:text-lg">Emily jane</p>
              </div>
              <div className="grid grid-cols-2 mb-3 font-semibold">
                <p className="text-sm sm:text-base lg:text-lg">
                  Contact number:{" "}
                </p>
                <p className="text-sm sm:text-base lg:text-lg">
                  +8801864752412
                </p>
              </div>
              <div className="grid grid-cols-2 mb-3 font-semibold">
                <p className="text-sm sm:text-base lg:text-lg">Email: </p>
                <p className="text-sm sm:text-base lg:text-lg">
                  emily@gmail.com
                </p>
              </div>
              <div className="grid grid-cols-2 mb-0 font-semibold">
                <p className="text-sm sm:text-base lg:text-lg">Date: </p>
                <p className="text-sm sm:text-base lg:text-lg">
                  12/05/24; 11:17AM
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[#F5F9FE] p-5">
            <h2 className="border-b border-secondary-color text-3xl pb-2 px-3">
              Subscriptions plan
            </h2>
            <div className="">
              <h2 className=" text-3xl mt-3 mb-4 font-semibold">Premium</h2>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-secondary-color font-semibold mb-3">
                  $9.99/mo
                </p>
                <ul className="">
                  <li className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-[#222222] -mt-4">
                      <MdOutlineDone className="size-3 text-primary-color" />
                    </div>
                    <p className="sm:text-lg lg:text-xl text-[#222222] mb-5">
                      Audio call.
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="p-1 rounded-full bg-[#222222] -mt-4">
                      <MdOutlineDone className="size-3 text-primary-color" />
                    </div>
                    <p className="sm:text-lg lg:text-xl text-[#222222] mb-5">
                      Video call.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#F5F9FE] p-5">
          <h2 className="border-b border-secondary-color text-3xl pb-2 px-3 mb-5">
            Transaction information:
          </h2>
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] ">
            <div className="grid grid-cols-2 mb-3 font-semibold">
              <p className="text-sm sm:text-base lg:text-lg">User name: </p>
              <p className="text-sm sm:text-base lg:text-lg">Emily jane</p>
            </div>
            <div className="grid grid-cols-2 mb-3 font-semibold">
              <p className="text-sm sm:text-base lg:text-lg">
                Transaction number :
              </p>
              <p className="text-sm sm:text-base lg:text-lg">61adx021641</p>
            </div>
            <div className="grid grid-cols-2 mb-3 font-semibold">
              <p className="text-sm sm:text-base lg:text-lg">Email: </p>
              <p className="text-sm sm:text-base lg:text-lg">emily@gmail.com</p>
            </div>
            <div className="grid grid-cols-2 mb-3 font-semibold">
              <p className="text-sm sm:text-base lg:text-lg">
                Contact number:{" "}
              </p>
              <p className="text-sm sm:text-base lg:text-lg">+8801864752412</p>
            </div>
            <div className="grid grid-cols-2 mb-0 font-semibold">
              <p className="text-sm sm:text-base lg:text-lg">Amount: </p>
              <p className="text-sm sm:text-base lg:text-lg">$750</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewEarningModal;
