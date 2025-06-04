import { Card, Modal, Typography } from "antd";
import Title from "antd/es/skeleton/Title";
import { getImageUrl } from "../../redux/getBaseUrl";

const { Text } = Typography; // Correct import for Text

const ViewTaskManagementTable = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleBlock,
}) => {
  console.log("currentRecord105", currentRecord);
  const taskData = {
    title: "Task Title",
    dealerName: "Harry",
    description: "Unanswered Questions",
    dueDate: "2024-12-31",
    category: "Administrative Issues",
  };

  const taskImage =
    currentRecord?.taskResolve?.[currentRecord?.taskResolve?.length - 1]
      ?.taskFile;

  const taskDescription =
    currentRecord?.taskResolve?.[currentRecord?.taskResolve?.length - 1]
      ?.solutionDetails;
 
  // console.log(getImageUrl() + taskImage);
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
      className="lg:min-w-[800px] h-fit !bg-[#FFF9FD]"
    >



{ !taskData || !taskDescription   ?<p className="text-2xl font-medium">No file Submit ....</p> :<>   <div className=" bg-gray-50 p-4">
        <div className="max-w-3xl  space-y-4 text-start">
          {/* Task Details Card */}

          <Card className="border rounded-lg shadow-sm">
            <h1 className="font-bold text-xl">Task Title</h1>
            <Title level={4} className="mb-4">
              {taskData.title}
            </Title>

            <div className="space-y-2">
              <div>
                <Text className="text-gray-600">Dealer Name: </Text>
                <Text strong>
                  {currentRecord?.dealerInfo?.first_name}{" "}
                  {currentRecord?.dealerInfo?.last_name}
                </Text>
              </div>

              <div>
                <Text className="text-gray-600">Description: </Text>
                <Text strong> {currentRecord?.taskDescription}</Text>
              </div>

              <div>
                <Text className="text-gray-600">Due Date: </Text>
                <Text strong>{currentRecord?.deadline.split("T")[0]}</Text>
              </div>
              <div>
                <Text className="text-gray-600 ">Task Image: </Text>
                <img className="!w-28 pt-3" src={getImageUrl() + taskImage} />
              </div>
            </div>
          </Card>

          {/* Info Box */}
          <div className="bg-[#B4E4E9] p-4 rounded-lg flex justify-between items-center">
            <div>
              <Text strong className="block text-lg">
                Unanswered Questions
              </Text>
              <Text className="text-gray-600">{taskDescription}</Text>
            </div>
            {/* <Button
              type="primary"
              className="bg-[#F5A623] hover:bg-[#E69512] border-none"
            >
              Recreate
            </Button> */}
          </div>

          {/* Action Buttons */}
          {/* <div className="flex justify-end gap-4 mt-6">
            <Button
              size="large"
              className="min-w-[100px] bg-base-color border-secondary-color"
            >
              No
            </Button>
            <Button
              type="primary"
              size="large"
              className="min-w-[100px] bg-[#FF4D4F] hover:bg-[#FF7875]"
            >
              yes
            </Button>
          </div> */}
        </div>
      </div></>}


   
    </Modal>
  );
};

export default ViewTaskManagementTable;
