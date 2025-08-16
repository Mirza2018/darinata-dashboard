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

    const toastId = toast.loading("Brugeren opdateres...");
    const data = { ...values };

    console.log(data);

    try {
      const res = await editDealer({
        data: data,
        id: record?.profile?._id,
      }).unwrap();
      console.log(res);
      toast.success("Brugeren er opdateret.", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      setIsOpen3(false);
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at oprette brugeren.", {
        id: toastId,
        duration: 2000,
      });
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
                  message: "Indtast venligst dit fornavn.",
                },
              ]}
              label="Fornavn"
              name="first_name"
            >
              <Input required placeholder="Indtast fornavn" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst dit efternavn.",
                },
              ]}
              label="Efternavn"
              name="last_name"
            >
              <Input required placeholder="Indtast efternavn" />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst dit telefonnummer.",
                },
              ]}
              label="Telefonnummer"
              name="phoneNumber"
            >
              <Input required placeholder="Indtast telefonnummer" />
            </Form.Item>
            <Form.Item
              className="cursor-not-allowed"
              rules={[
                {
                  required: true,
                  message: "Indtast venligst din e-mailadresse.",
                },
              ]}
              label="E-mail"
              //   name="email"
            >
              <Input
                value={record?.email}
                className="cursor-not-allowed"
                readOnly
                required
                placeholder="Indtast e-mail"
              />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst dit postnummer.",
                },
              ]}
              label="Postnummer"
              name="zip"
            >
              <Input required placeholder="Indtast postnummer" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst din by.",
                },
              ]}
              label="By"
              name="city"
            >
              <Input required placeholder="Indtast bynavn" />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst gaden.",
                },
              ]}
              label="Gade"
              name="street"
            >
              <Input required placeholder="Indtast gadenavn**" />
            </Form.Item>

            {/* <Form.Item label="Address" name="address">
              <Input required placeholder="Enter Address" />
            </Form.Item> */}
            <Form.Item label="Kontonummer" name="kontoNr">
              <Input placeholder="Indtast kontonr." />
            </Form.Item>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item label="Reg. nr." name="regNo">
              <Input placeholder="Indtast reg.nr." />
            </Form.Item>
          </div>
        </div>

        <Form.Item label={null} className="col-span-3 text-end">
          <button
            className="text-xl font-medium text-white bg-highlight-color px-10 py-2 rounded-md "
            type="primary"
            htmlType="submit"
          >
            Opdater
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserInfo;
