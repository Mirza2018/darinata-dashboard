
import { Form, Input, Radio, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";

const UserCarInfo = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { TextArea } = Input;
  const inputRef = useRef(null);

  const handleEditClick = () => {
    // For Ant Design's Input, the ref points to the component instance.
    // Access the underlying DOM input element via `inputRef.current.input`
    const inputValue = inputRef.current?.input?.value;
    console.log("Input value:", inputValue);
    // Do something with inputValue...
  };
  const normFileEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  };
  const onFinish = (values) => {
    console.log(values);
    form.resetFields();
    navigate("/admin/user-management");
  };
  return (
    <div className="container mx-auto mb-12">
      <h1 className="text-4xl font-bold">The car's information</h1>
      <div className="h1 w-full border-t border-text-light-color my-5"></div>
      <h1 className="text-2xl font-bold mb-5">Number plate*</h1>
      <Input
        ref={inputRef}
        placeholder="Indtast søgetekst"
        className=" max-w-[500px] "
        suffix={
          <div
            onClick={handleEditClick}
            className="bg-highlight-color  rounded py-2 px-10"
          >
            <p className="text-white font-bold text-lg">Edit</p>
          </div>
        }
        prefix={
          <div className="bg-[#007FFF] flex flex-col justify-center items-center gap-2 rounded py-2 px-5">
            <img className="w-9" alt="search" src={AllImages.star} />
            <img alt="search" src={AllImages.dk} />
          </div>
        }
      />
      {/* <p className="mt-2 text-lg font-medium">
        TESLA Model Y, Hatchback, 393 KW
      </p> */}
      <Form form={form} onFinish={onFinish}>
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2 ">
              Number of kilometers driven
            </p>
            <Form.Item name={`km`}>
              <Input className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1 ">
            <p className="text-2xl font-medium pb-2 ">
              Number of varnish fields
            </p>
            <Form.Item name={`varnish`} className="">
              <Input className="py-3" />
            </Form.Item>
          </div>
        </div>
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Additional equipment</p>

            <Form.Item name="equipment">
              <Radio.Group className=" flex flex-col gap-2">
                <Radio value="Automatic transmission">
                  Automatic transmission
                </Radio>
                <Radio value="Trailer hitch">Trailer hitch</Radio>
                <Radio value="Extra wheel set">Extra wheel set</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">
              The condition of the car
            </p>
            <Form.Item className="" name={`carCondition`}>
              <Radio.Group name="bilens" className=" flex  gap-2">
                <Radio value="sommy">Sommy</Radio>
                <Radio value="god">Good</Radio>
                <Radio value="used">Used</Radio>
                <Radio value="very_used">Very used</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-2xl font-medium pb-2">Defects or other comments</p>
          <Form.Item name={`comments`}>
            <TextArea
              placeholder="Fejl eller andre kommentarer"
              rows={4}
              className="py-3"
            />
          </Form.Item>
        </div>
        <div className="my-[10px] flex justify-between gap-5 items-center">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Expected price (DKK)*</p>
            <Form.Item name={`expectedPrice`}>
              <Input placeholder="Forventet pris (DKK)" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            {/* <p className="text-2xl font-medium pb-2">Number of varnish fields</p> */}
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFileEvent}
              noStyle
            >
              <Upload.Dragger
                onChange={handleUploadChange}
                beforeUpload={() => false}
                name="files"
                accept="image/*"
              >
                <p className="flex justify-center items-center">
                  <FaCloudUploadAlt className="text-8xl " />
                </p>
                <p className="ant-upload-text">Drag and drop your files here</p>
                <p className="ant-upload-text">or click to upload</p>
              </Upload.Dragger>
            </Form.Item>
          </div>
        </div>
        {/* <div className="flex-1">
          <Form.Item>
            <Radio.Group name="type" className=" flex  gap-2 ">
              <Radio value="company" className="text-2xl">
                Company{" "}
              </Radio>
              <Radio value="private" className="text-2xl">
                Private
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div> */}
        <h1 className="text-3xl font-bold">Contact information</h1>
        <div className="h1 w-full border-t border-text-light-color my-5"></div>
        <h1 className="text-lg font-medium mb-5">
          To provide you with the best offer for your car, we recommend
          uploading a few pictures of your car to us. You can find some examples
          of the angles we would like of your car.
        </h1>

        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Company Name</p>
            <Form.Item name={`company`}>
              <Input placeholder="Firmanavn" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">CVR Number</p>
            <Form.Item name={`cvr`}>
              <Input placeholder="CVR-nummer" className="py-3" />
            </Form.Item>
          </div>
        </div>
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">First Name*</p>
            <Form.Item name={`firstName`}>
              <Input placeholder="Fornavn" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Last Name*</p>
            <Form.Item name={`lastName`}>
              <Input placeholder="Efternavn" className="py-3" />
            </Form.Item>
          </div>
        </div>
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Postal Code*</p>
            <Form.Item name={`PostalCode`}>
              <Input placeholder="Postnummer" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">City*</p>
            <Form.Item name={`city`}>
              <Input placeholder="By" className="py-3" />
            </Form.Item>
          </div>
        </div>
        <div className="my-[10px] flex justify-between gap-5">
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Phone Number*</p>
            <Form.Item name={`PhoneNumber`}>
              <Input placeholder="Telefonnummer" className="py-3" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-medium pb-2">Account Number*</p>
            <Form.Item name={`accNumber`}>
              <Input placeholder="Indtast kontonummer" className="py-3" />
            </Form.Item>
          </div>
        </div>
        <div className="text-center">
          <button
            className="bg-highlight-color text-white text-2xl font-medium  py-5 px-20 rounded-lg "
            htmlType="submit"
          >
            Create Listing
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserCarInfo;
