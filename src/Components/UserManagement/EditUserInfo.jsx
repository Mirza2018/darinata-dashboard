import { Form, Input, Modal, Upload } from "antd";
import React, { useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";
import { useUpdateProfileAnotherMutation } from "../../redux/api/profileApi";

const EditUserInfo = ({ record, setIsOpen3, isOpen3 }) => {
  const [editDealer] = useUpdateProfileAnotherMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (record?.profile) {
      form.setFieldsValue({
        first_name: record?.profile?.first_name,
        last_name: record?.profile?.last_name,
        phoneNumber: record?.profile.phoneNumber,
        email: record?.email,
        zip: record?.profile?.zip,
        city: record?.profile?.city,
        street: record?.profile?.street,
        address: record?.profile?.address,
        kontoNr: record?.profile?.kontoNr,
        regNo: record?.profile?.regNo,
      });
    }
  }, [record, form]);

  console.log(record);

  const onFinish = async (values) => {
    console.log(values);

    // router("car-info");

    const toastId = toast.loading("User is updateing...");
    const data = { ...values };

    console.log(data);

    try {
      const res = await editDealer({
        data: data,
        id: record?.profile?._id,
      }).unwrap();
      console.log(res);
      toast.success(res?.message || "user is update Successfully", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      setIsOpen3(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem to create user",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <Modal
      title={null}
      open={isOpen3}
      onOk={() => setIsOpen3(false)}
      onCancel={() => setIsOpen3(false)}
      footer={null}
      width={800}
    >
      <Form
        name="basic"
        className=" gap-5 p-10 "
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <div className=" ">
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please inptut First Name",
                },
              ]}
              label="First Name"
              name="first_name"
            >
              <Input required placeholder="Enter First Name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please inptut Last Name",
                },
              ]}
              label="Last Name"
              name="last_name"
            >
              <Input required placeholder="Enter Last Name" />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please inptut Phone Number",
                },
              ]}
              label="Phone Number"
              name="phoneNumber"
            >
              <Input required placeholder="Enter Phone Number" />
            </Form.Item>
            <Form.Item
              className="cursor-not-allowed"
              rules={[
                {
                  required: true,
                  message: "Please inptut Email",
                },
              ]}
              label="Email"
              //   name="email"
            >
              <Input
                value={record?.email}
                className="cursor-not-allowed"
                readOnly
                required
                placeholder="Enter Email"
              />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please inptut Zip",
                },
              ]}
              label="Zip"
              name="zip"
            >
              <Input required placeholder="Ente zip" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please inptut city",
                },
              ]}
              label="City"
              name="city"
            >
              <Input required placeholder="Enter city name" />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please inptut Street",
                },
              ]}
              label="Street"
              name="street"
            >
              <Input required placeholder="Enter street name" />
            </Form.Item>

            {/* <Form.Item label="Address" name="address">
              <Input required placeholder="Enter Address" />
            </Form.Item> */}
            <Form.Item label="Konto Nr." name="kontoNr">
              <Input  placeholder="Enter Konto Nr." />
            </Form.Item>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item label="Rge Nr." name="regNo">
              <Input  placeholder="Enter Rge Nr." />
            </Form.Item>
          </div>
        </div>

        <Form.Item label={null} className="col-span-3 text-end">
          <button
            className="text-xl font-medium text-white bg-highlight-color px-10 py-2 rounded-md "
            type="primary"
            htmlType="submit"
          >
            Update
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserInfo;
