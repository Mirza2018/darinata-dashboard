import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PrivacyPolicy = () => {
    const [value, setValue] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleOnSave = () => {
    console.log(content);
  };

  console.log(value);
  

  return (
    <div
      className="min-h-screen bg-primary-color py-1 px-8 "
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-secondary-color">
          Privacy Policy
        </h1>
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
        <Button
          onClick={handleOnSave}
          className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
