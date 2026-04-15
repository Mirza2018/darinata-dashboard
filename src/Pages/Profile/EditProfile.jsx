/* eslint-disable no-unused-vars */
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/adminApi";
import { getImageUrl } from "../../redux/getBaseUrl";
import profileImage from "/images/profileImage.png";

const EditProfile = () => {
  const { data, currentData, isLoading, isFetching, isSuccess } =
    useProfileQuery();
  const [profileUpdate] = useUpdateProfileMutation();
  const displayedData = data ?? currentData;

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [imageUrl, setImageUrl] = useState(profileImage);
  const [fileList, setFileList] = useState([]);

  // Handle image selection and preview
  const handleImageUpload = (info) => {
    const newFileList = [...info.fileList].slice(-1); // Keep only the latest file
    setFileList(newFileList);

    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      // Create preview URL for the selected image
      const previewUrl = URL.createObjectURL(newFileList[0].originFileObj);
      setImageUrl(previewUrl);
    } else if (newFileList.length === 0) {
      // Reset to default if removed
      setImageUrl(profileImage);
    }
  };

  // Load existing profile image from API when component loads
  useEffect(() => {
    if (displayedData?.data?.profile?.profileImage) {
      setImageUrl(getImageUrl() + displayedData.data.profile.profileImage);
      setFileList([]); // Clear any previous selection
    }
  }, [displayedData?.data?.profile?.profileImage]);

  const onFinish = async (values) => {
    const toastId = toast.loading("Profilen opdateres...");

    const formData = new FormData();
    const dataToSend = { ...values };
    delete dataToSend.profileImage;

    formData.append("data", JSON.stringify(dataToSend));

    // Append image only if a new one is selected
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      formData.append("profileImage", fileList[0].originFileObj);
    }

    try {
      await profileUpdate({
        fromData: formData,
        userId: userInfo.profile,
      }).unwrap();

      toast.success("Profilen er opdateret.", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Prøv igen.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isLoading || isFetching) {
    return <Spin className="flex justify-center items-center" size="large" />;
  }

  return (
    <div
      className="min-h-screen bg-primary-color flex justify-center items-center"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <Form
        initialValues={displayedData?.data?.profile}
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent py-10 h-full w-full lg:w-[70%]"
      >
        <h1 className="text-2xl font-bold ms-10 mb-10">Profil</h1>

        <div className="mt-12 flex items-center gap-x-4">
          <div className="relative">
            <img
              className="w-40 aspect-square object-contain rounded-full ring-1"
              src={imageUrl}
              alt="Profile"
            />

            {/* Upload Component */}
            <Upload
              beforeUpload={() => false}
              onChange={handleImageUpload}
              maxCount={1}
              accept="image/*"
              fileList={fileList}
              showUploadList={false}
              className="absolute -top-3 -right-3"
            >
              <button
                type="button"
                className="bg-highlight-color h-9 w-9 rounded-full text-xl flex items-center justify-center border border-white shadow-md hover:bg-opacity-90"
              >
                <EditOutlined className="text-white" />
              </button>
            </Upload>
          </div>

          <p className="text-5xl font-semibold -mt-16">
            {displayedData?.data?.profile?.first_name}{" "}
            {displayedData?.data?.profile?.last_name}
          </p>
        </div>

        {/* Rest of the form fields remain the same */}
        <div className="text-white mt-5">
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Fornavn
          </Typography.Title>
          <Form.Item name="first_name">
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Indtast dit fornavn"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>

          <Typography.Title level={5} style={{ color: "#222222" }}>
            Efternavn
          </Typography.Title>
          <Form.Item name="last_name">
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Indtast dit efternavn"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>

          <Typography.Title level={5} style={{ color: "#222222" }}>
            Adresse
          </Typography.Title>
          <Form.Item name="address">
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Indtast din adresse"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>

          <div className="flex gap-5 w-full">
            <div className="flex-1">
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Postnummer
              </Typography.Title>
              <Form.Item name="zip">
                <Input
                  suffix={<MdOutlineEdit />}
                  placeholder="Indtast dit postnummer"
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <Typography.Title level={5} style={{ color: "#222222" }}>
                By
              </Typography.Title>
              <Form.Item name="city">
                <Input
                  suffix={<MdOutlineEdit />}
                  placeholder="Indtast din by"
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
            </div>
          </div>

          <Typography.Title level={5} style={{ color: "#222222" }}>
            Kontaktnummer
          </Typography.Title>
          <Form.Item name="phoneNumber">
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Indtast dit telefonnummer"
              className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
              htmlType="submit"
            >
              Gem og skift
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditProfile;
