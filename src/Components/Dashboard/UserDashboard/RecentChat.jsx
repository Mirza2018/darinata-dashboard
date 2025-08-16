import { Image } from "antd";

import { CiMail, CiVideoOn } from "react-icons/ci";
import { FaRegImage, FaSmile } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { LuPhone } from "react-icons/lu";
import {AllImages} from "../../../../public/images/AllImages"


const RecentChat = () => {

  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg h-full">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src={AllImages.recentChatImg}
              alt="Angela Vatiga"
              className="w-full h-full object-cover aspect-square"
            />
          </div>
          <h2 className="text-xl font-semibold">Angela Vatiga</h2>
        </div>
        <div className="flex items-center gap-2">
          {["CiVideoOn", "LuPhone", "CiMail"].map((icon) => (
            <button
              key={icon}
              className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
            >
              {icon === "CiVideoOn" && (
                <CiVideoOn className="h-5 w-5 text-red-500" />
              )}
              {icon === "LuPhone" && (
                <LuPhone className="h-5 w-5 text-red-500" />
              )}
              {icon === "CiMail" && <CiMail className="h-5 w-5 text-red-500" />}
            </button>
          ))}
          <button className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors">
            <IoMdMore className="h-5 w-5 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-4  overflow-y-auto space-y-4 flex flex-col items-end justify-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              {/* <img src="/placeholder.svg" alt="Angela Vatiga" className="w-full h-full object-cover" /> */}
              <Image
                src={AllImages.recentChatImg}
                alt="Angela Vatiga"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <span className="font-semibold">Angela Vatiga</span>
            <span className="text-sm text-rose-300">08:23 AM</span>
          </div>
          <div className="ml-10 bg-zinc-100 rounded-lg p-3 max-w-[80%]">
            <p className="text-zinc-600">
              Auctor urna, varius duis suspendisse mi in dictum. Interdum
              egestas ut porttitor tortor aliquet massa.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-rose-300">08:23 AM</span>
            <span className="font-semibold">You</span>
          </div>
          <div className="bg-rose-50 rounded-lg p-3 max-w-[80%]">
            <p className="text-zinc-600">
              Auctor urna, varius duis suspendisse mi in dictum.
            </p>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="bg-rose-50 rounded-full p-4 flex items-center gap-3">
          <FaSmile className="h-6 w-6 text-zinc-500" />
          <input
            type="text"
            placeholder="Send din besked..."
            className="flex-1 bg-transparent outline-none text-zinc-600 placeholder:text-zinc-500"
          />
          <div className="flex items-center gap-2">
            <FaRegImage className="h-6 w-6 text-zinc-500" />
            <FiPaperclip className="h-6 w-6 text-zinc-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentChat;
