import { Button } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import { useContentCreateMutation } from "../../../redux/api/adminApi";

const TermsOfService = () => {
  const [staticData] = useContentCreateMutation();
  const [value, setValue] = useState("");

  const handleOnSave =async () => {
    const toastId = toast.loading("Terms Of Service is Posting...");

    const data = {
      type: "terms-and-conditions",
      content: value,
    };

    try {
      const res = await staticData(data).unwrap();
      console.log(res);
      toast.success("Terms Of Service post Successfully", {
        id: toastId,
        duration: 2000,
      });
      setValue("")
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "There is an problem",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }


  };

  return (
    <div
      className="min-h-screen bg-primary-color py-1 px-8 "
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  !text-black ">
          Terms Of Service
        </h1>
        <div className="">
          {/* <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          /> */}
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-96"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                ["link"],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                ["blockquote", "code-block"],
                ["clean"], // "Clean" button to remove formatting
              ],
            }}
            formats={[
              "header",
              "font",
              "list",
              "align",
              "bold",
              "italic",
              "underline",
              "strike",
              "color",
              "background",
              "link",
              "image",
              "script",
              "indent",
              "blockquote",
              "code-block",
              "clean",
            ]}
          />
        </div>
        <Button
          onClick={handleOnSave}
          className="w-full py-6 border  text-xl  font-semibold rounded-2xl  bg-[#ff991c] !hover:bg-[#ff991c] text-white mt-20"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default TermsOfService;
