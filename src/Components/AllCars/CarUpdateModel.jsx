import { Checkbox, Form, InputNumber, Modal, Radio } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useUpdateCarMutation } from "../../redux/api/adminApi";

const CarUpdateModel = ({
  isUpdateModelOpen,
  setIsUpdateModalOpen,
  record,
}) => {
  const [updateCar] = useUpdateCarMutation();
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue(record);
  }, [record, form]);

  // console.log(record);
  const onFinish = async (values) => {
    const toastId = toast.loading("Car data is Updateing...");

    console.log(values);

    const formData = new FormData();
    formData.append("data", JSON.stringify(values));

    try {
      const res = await updateCar({ id: record?._id, data: formData }).unwrap();
      console.log(res);

      toast.success(res?.message || "Car data is updated successfully...", {
        id: toastId,
        duration: 2000,
      });
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error("There is an problem to update car data", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Modal
      title=""
      closable={{ "aria-label": "Custom Close Button" }}
      open={isUpdateModelOpen}
      onOk={() => setIsUpdateModalOpen(false)}
      onCancel={() => setIsUpdateModalOpen(false)}
      footer=""
    >
      <div>
        <h1 className="text-2xl font-medium text-center">
          Update The Car Information
        </h1>
        <Form
          className="p-2"
          initialValues={record}
          form={form}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
        >
          <div className="my-[10px] flex flex-col gap-5">
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 1vw + 1rem ,20px)" }}
                className=" font-medium pb-2 "
              >
                Number of kilometers driven*
              </p>
              <Form.Item
                name={`noOfKmDriven`}
                rules={[
                  {
                    required: true,
                    message: "Please Input Number of kilometers driven",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter Number of kilometers driven"
                  className="py-2 w-full"
                />
              </Form.Item>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <p
                style={{ fontSize: "clamp(14px, 1vw + 1rem ,20px)" }}
                className=" font-medium pb-2 "
              >
                Number of varnish fields*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input the number of varnish fields!",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Number of varnish fields must be at Number!",
                  },
                ]}
                name={`noOfVarnishField`}
                className=""
              >
                <InputNumber
                  placeholder="Enter  Number of varnish fields"
                  className="py-2 w-full"
                />
              </Form.Item>
            </div>
            <div className="my-[10px] flex md:flex-row flex-col justify-between gap-5">
              <div className="flex-1">
                <p
                  style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
                  className=" font-medium pb-2"
                >
                  Additional equipment*
                </p>

                <Form.Item name="additionalEquipment">
                  <Checkbox.Group className=" flex flex-col gap-2">
                    <Checkbox value="Automatic transmission">
                      Automatic transmission
                    </Checkbox>
                    <Checkbox value="Trailer hitch">Trailer hitch</Checkbox>
                    <Checkbox value="Extra wheel set">Extra wheel set</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>
              <div className="flex-1">
                <p
                  style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
                  className=" font-medium pb-2"
                >
                  The condition of the car*
                </p>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please Select one condition!",
                    },
                  ]}
                  name={`condition`}
                >
                  <Radio.Group
                    name="condition"
                    className=" flex flex-col gap-2"
                  >
                    <Radio value="Good">Good</Radio>
                    <Radio value="Used">Used</Radio>
                    <Radio value="very Used">Very used</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
                className=" font-medium pb-2"
              >
                Defects or other comments*
              </p>
              <Form.Item name={`comment`}>
                <TextArea
                  placeholder="Defects or other comments"
                  rows={2}
                  className="py-2"
                />
              </Form.Item>
            </div>
            <div className="flex-1 ">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,20)" }}
                className=" font-medium pb-2"
              >
                Expected price (.kr)*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your expected price!",
                  },
                ]}
                name={`expectedPrice`}
              >
                <InputNumber
                  placeholder="Expected price (DKK)"
                  className="py-2 w-full"
                />
              </Form.Item>
            </div>
          </div>
          <div className="text-center">
            <button
              style={{ fontSize: "clamp(14px, 1vw + 1rem ,20px)" }}
              className="bg-highlight-color text-white  font-medium  py-2 px-5 md:px-10 rounded-lg "
              htmlType="submit"
            >
              Update Details
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CarUpdateModel;
