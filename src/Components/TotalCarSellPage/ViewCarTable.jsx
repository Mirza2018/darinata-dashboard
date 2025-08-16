/* eslint-disable react/prop-types */
import { Divider, Modal } from "antd";
import { getImageUrl } from "../../redux/getBaseUrl";

const ViewCarTable = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  data,
  handleBlock,
}) => {
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
            src={getImageUrl() + data?.carModel?.images[0]}
            alt={currentRecord?.userName}
            className=" aspect-square object-contain h-full"
          />{" "}
        </div>
        <div>
          <div className="flex flex-col gap-2 bg-base-color p-5 rounded-lg border border-[#ADD8E6]">
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Bilens ejers navn</h2>
              <p className="text-sm font-semibold">
                {data?.company?.first_name} {data?.company?.last_name}
              </p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Forhandlerens navn</h2>
              <p className="text-sm font-semibold">
                {`${data?.profile?.first_name} ${data?.profile?.last_name}`}
              </p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Mærkenavn</h2>
              <p className="text-sm font-semibold">{data?.carModel?.brand}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Bilmodel</h2>
              <p className="text-sm font-semibold">{data?.carModel?.model}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Lokation</h2>
              <p className="text-sm font-semibold"> {data?.company?.city}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Farve</h2>
              <p className="text-sm font-semibold">{data?.carModel?.color}</p>
            </div>
            {/* <div className="flex justify-between">
              <h2 className="text-sm font-bold">Price</h2>
              <p className="text-sm font-semibold">
                {data?.car?.expectedPrice}
              </p>
            </div> */}
          </div>

          <div className="flex flex-col gap-2 bg-base-color p-5 rounded-lg border border-[#ADD8E6] mt-6">
            {/* <h1 className="text-sm font-bold flex">Car Price</h1> */}
            <div className="flex justify-between">
              <h2 className="text-xs font-medium">Bilens pris</h2>
              <p className="text-xs font-medium">
                {data?.car?.expectedPrice} DKK
              </p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-xs font-medium">Ansøgningsservicegebyr</h2>
              <p className="text-xs font-medium">10%</p>
            </div>
            <Divider style={{ borderColor: "#004AAD" }}></Divider>

            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Samlet</h2>
              <p className="text-sm font-bold">
                {data?.car?.expectedPrice + data?.car?.expectedPrice * 0.1} DKK
              </p>
            </div>
            {/* <div className="flex justify-between">
              <h2 className="text-sm font-bold">Payment By</h2>
              <p className="text-sm font-bold">Card</p>
            </div> */}
          </div>

          <button
            onClick={handleCancel}
            className="bg-[#FF991C] text-white py-3 text-xl font-semibold rounded-lg mt-8 w-full"
          >
            Færdig
          </button>
        </div>
        {/* <pre className="text-start">{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </Modal>
  );
};

export default ViewCarTable;
