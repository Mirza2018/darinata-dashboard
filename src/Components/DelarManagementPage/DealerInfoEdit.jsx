import { Form, Input, Modal, Upload } from "antd";
import React, { useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";
import { useUpdateProfileAnotherMutation } from "../../redux/api/profileApi";
const DealerInfoEdit = ({ record, setIsOpen3, isOpen3 }) => {
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
        cvrNumber: record?.profile?.cvrNumber,
        companyName: record?.profile?.companyName,
        websiteLink: record?.profile?.websiteLink,
        street: record?.profile?.street,
        address: record?.profile?.address,
        kontoNr: record?.profile?.kontoNr,
        regNo: record?.profile?.regNo,
      });
    }
  }, [record, form]);
  const onFinish = async (values) => {
    const toastId = toast.loading("Forhandleroplysningerne opdateres...");
    const data = { ...values };
    console.log(data);
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(data));

    console.log(data);

    try {
      const res = await editDealer({
        data: data,
        id: record?.profile?._id,
      }).unwrap();
      console.log(res);
      toast.success("Forhandleren er opdateret.", {
        id: toastId,
        duration: 2000,
      });
      form.resetFields();
      setIsOpen3(false);
    } catch (error) {
      console.log(error);
      toast.error("Der er et problem med at oprette forhandleren", {
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
        className="md:grid md:grid-cols-3  gap-5 p-5 "
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <div className="md:col-span-2 ">
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst fornavn.",
                },
              ]}
              label="Fornavn"
              name="first_name"
            >
              <Input required placeholder="Indtast dit fornavn." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst efternavn.",
                },
              ]}
              label="Efternavn"
              name="last_name"
            >
              <Input required placeholder="Indtast venligst dit efternavn." />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst telefonnummer.",
                },
              ]}
              label="Telefonnummer"
              name="phoneNumber"
            >
              <Input required placeholder="Indtast dit telefonnummer." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst e-mail.",
                },
              ]}
              label="E-mail"
            >
              <Input
                value={record?.email}
                className="cursor-not-allowed"
                required
                placeholder="Indtast venligst din e-mail."
              />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst postnummer.",
                },
              ]}
              label="Postnummer"
              name="zip"
            >
              <Input required placeholder="Indtast venligst dit postnummer." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst by.",
                },
              ]}
              label="By"
              name="city"
            >
              <Input required placeholder="Indtast venligst bynavn." />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {/* <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Enter Address",
                },
              ]}
              label="Address"
              name="address"
            >
              <Input required placeholder="Enter your Address" />
            </Form.Item> */}

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst gade.",
                },
              ]}
              label="Gade"
              name="street"
            >
              <Input required placeholder="Indtast dit gadelink." />
            </Form.Item>
            <Form.Item label="Websidelink" name="websiteLink">
              <Input placeholder="Indtast dit hjemmeside-link." />
            </Form.Item>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst CVR-nummer.",
                },
              ]}
              label="CVR-nummer"
              name="cvrNumber"
            >
              <Input required placeholder="Indtast venligst dit CVR-nummer." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Indtast venligst firmanavn.",
                },
              ]}
              label="Firmanavn"
              name="companyName"
            >
              <Input required placeholder="Indtast dit firmanavn." />
            </Form.Item>{" "}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Form.Item label="Reg. nr." name="regNo">
              <Input placeholder="Indtast dit registreringsnummer." />
            </Form.Item>
            <Form.Item label="Kontonummer" name="kontoNr">
              <Input placeholder="Indtast dit kontonummer." />
            </Form.Item>{" "}
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

export default DealerInfoEdit;
