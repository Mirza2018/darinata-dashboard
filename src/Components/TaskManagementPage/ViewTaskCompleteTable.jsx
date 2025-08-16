/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { toast } from "sonner";
import { useTaskActionMutation } from "../../redux/api/adminApi";

const ViewTaskCompleteTable = ({
  isViewModalVisible2,
  handleCancel2,
  currentRecord2,
  handleBlock,
}) => { 
  const [taskAction] = useTaskActionMutation();
  console.log(currentRecord2);

  const handleTaskComplete = async () => {
    const data = {
      taskStatus: "completed",
    };
    const toastId = toast.loading("Opgaven er ved at blive accepteret...");
    try {
      const res = await taskAction({ data, id: currentRecord2?._id }).unwrap();
      console.log(res);

      toast.success("Opgaven er accepteret.", {
        id: toastId,
        duration: 2000,
      });
      handleCancel2();
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at acceptere opgaven.", {
        id: toastId,
        duration: 2000,
      });
    }
  };
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
          Vil du markere den som fuldført?
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
            Nej
          </button>
          <button
            onClick={handleTaskComplete}
            className="bg-[#00721E] border border-[#ADD8E6] text-white py-3 text-xl font-semibold rounded-lg mt-8 w-full px-8 "
          >
            Ja
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTaskCompleteTable;
