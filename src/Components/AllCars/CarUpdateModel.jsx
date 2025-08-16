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
    const toastId = toast.loading("Biloplysningerne opdateres...");

    console.log(values);

    const formData = new FormData();
    formData.append("data", JSON.stringify(values));

    try {
      const res = await updateCar({ id: record?._id, data: formData }).unwrap();
      console.log(res);

      toast.success("Biloplysningerne er opdateret.", {
        id: toastId,
        duration: 2000,
      });
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error("Der er et problem med at opdatere biloplysningerne.", {
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
          Opdater bilinformationen
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
                Antal kørte kilometer*
              </p>
              <Form.Item
                name={`noOfKmDriven`}
                rules={[
                  {
                    required: true,
                    message: "Indtast venligst antallet af kørte kilometer.",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Indtast venligst antal kørte kilometer."
                  className="py-2 w-full"
                />
              </Form.Item>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <p
                style={{ fontSize: "clamp(14px, 1vw + 1rem ,20px)" }}
                className=" font-medium pb-2 "
              >
                Antal lakerede felter*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Indtast venligst antallet af lakfelter.",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Antallet af lakfelter skal være et tal.",
                  },
                ]}
                name={`noOfVarnishField`}
                className=""
              >
                <InputNumber
                  placeholder="Indtast antallet af lakfelter."
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
                  Ekstra udstyr*
                </p>

                <Form.Item name="additionalEquipment">
                  <Checkbox.Group className=" flex flex-col gap-2">
                    <Checkbox value="Automatic transmission">
                      Automatgear
                    </Checkbox>
                    <Checkbox value="Trailer hitch">Anhængertræk</Checkbox>
                    <Checkbox value="Extra wheel set">Ekstra hjulsæt</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>
              <div className="flex-1">
                <p
                  style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
                  className=" font-medium pb-2"
                >
                  Bilens tilstand*
                </p>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Vælg venligst en betingelse.",
                    },
                  ]}
                  name={`condition`}
                >
                  <Radio.Group
                    name="condition"
                    className=" flex flex-col gap-2"
                  >
                    <Radio value="Good">Godt</Radio>
                    <Radio value="Used">Brugt</Radio>
                    <Radio value="very Used">Meget brugt</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className="flex-1">
              <p
                style={{ fontSize: "clamp(14px, 3vw + 1rem ,20px)" }}
                className=" font-medium pb-2"
              >
                Fejl eller andre kommentarer*
              </p>
              <Form.Item name={`comment`}>
                <TextArea
                  placeholder="Defekter eller andre kommentarer"
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
                Forventet pris (kr.)*
              </p>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Indtast venligst din forventede pris.",
                  },
                ]}
                name={`expectedPrice`}
              >
                <InputNumber
                  placeholder="Forventet pris (DKK)."
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
              Opdater detaljer
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CarUpdateModel;
