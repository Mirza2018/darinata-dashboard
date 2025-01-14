import React from "react";
import GetData from "../../../api/GetData";
import { Image } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

const LaboratoryImagingResults = () => {
  const { data, loading, error } = GetData("/data/labReportData.json");

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return (
    <div className="  px-5 pt-2 bg-[#F7F8F8] rounded-lg shadow h-fit">
      <div>
        <h2 className="text-[24px] font-normal text-[#F5382C]">
          Laboratory & Imaging Results
        </h2>
        <div className="grid grid-cols-3  h-full w-full gap-3">
          <div className="flex justify-between">
            <div>
              <p className="text-[16px] text-black font-semibold">
                {data?.patientName}
              </p>
              <p className="text-[12px] text-[#222222]">
                Age: {data.age} Years
              </p>
              <p className="text-[12px] text-[#222222]">Sex: {data.sex}</p>
              <p className="text-[12px] text-[#222222]">PID: {data.pid}</p>
            </div>
            <div>
              <Image src={AllImages.qr} />
            </div>
          </div>

          <div className="border-x-2 border-y-0 border-x-[#D9D9D9] px-3">
            <p className="text-[16px] text-black font-semibold">
              Sample Collected At:
            </p>
            <p className="text-[14px] text-[#222222]">
              {data.collectionAddress}
            </p>
            <p className="text-[16px] text-[#222222] ">
              Ref. By: <span className="font-semibold">{data.doctorName}</span>
            </p>
          </div>

          <div>
            <div className="text-[12px] text-[#222222] font-semibold">
              Registered on:{" "}
              <p className="text-[12px] text-[#222222] font-normal">
                {data.registeredOn}
              </p>
            </div>
            <div className="text-[12px] text-[#222222] font-semibold">
              Collected on:{" "}
              <p className="text-[12px] text-[#222222] font-normal">
                {data.collectedOn}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="border-t border-gray-200 pt-4">
        <h3 className="text-base text-secondary-color font-semibold mb-2 text-center">
          Complete Blood Count (CBC)
        </h3>
        <div className="grid grid-cols-4">
          <p className="text-[#222222] font-medium">
            Investigation <br />{" "}
            <span className="text-sm text-[#222222] font-normal">
              Primary Sample Type :
            </span>
          </p>
          <p className="text-[#222222] font-medium">
            Result
            <br />{" "}
            <span className=" text-[#222222] font-normal">
              {data.sampleType}
            </span>
          </p>
          <p className="text-[#222222] font-medium">Ref. Value</p>
          <p className="text-[#222222] font-medium j">Unit</p>
        </div>
        {data?.tests?.map((test) => (
          <div key={test.name} className="grid grid-cols-4 items-end">
            <p className="text-[#222222] font-medium">
              {test.name} <br />
              <span className=" text-[#222222] font-normal">{test.title}</span>
            </p>
            <p className=" text-gray-600">{test.result}</p>
            <p className=" text-gray-600">{test.refValue}</p>
            <p className=" text-gray-600">{test.unit}</p>
          </div>
        ))}
      </div> */}

      <div>
        <h2 className="text-base text-secondary-color  font-semibold  uppercase mb-2">
          Kidney
        </h2>
        <ul className="list-disc list-inside">
          <li className="text-[14px]">
            Both the kidneys are visualized and appear normal in size, shape,
            position and echotexture. Cortico-medullary differentiation is well
            maintained.
          </li>
          <li className="text-[14px]">
            Right kidney measures 10.0x3.2cm in size with cortical thickness of
            3cm at upper pole.
          </li>

            <li className="text-[14px]">
            Right kidney measures 10.0x3.2cm in size with cortical thickness of
            3cm at upper pole.
          </li>

            <li className="text-[14px]">
            Left kidney measures 9.7x4.2cm in size with cortical thickness of
            2.6cm at upper pole. URINARY BLADDER & UTERUS
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-base text-secondary-color  font-semibold  uppercase my-2">
          URINARY BLADDER & UTERUS
        </h2>
        <ul className="list-disc  list-inside">
            <li className="text-[14px]">
            Urinary Bladder is distended, lumen echofree.
          </li>

            <li className="text-[14px]">
            Uterus appears normal in size and echotexture. Bilateral adnexa
            clear.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-base text-secondary-color  font-semibold  uppercase my-2">
          IMPRESSION
        </h2>
        <ul className="list-disc  list-inside">
            <li className="text-[14px]">NO SIGNIFICANT ABNORMALITY DETECTED</li>
        </ul>
      </div>
      <div>
        <h2 className="text-base text-secondary-color  font-semibold  uppercase my-2">
          ADVICE
        </h2>
        <ul className="list-disc  list-inside mb-4">
            <li className="text-[14px]">CLINICAL CORRELATION</li>
        </ul>
        <Image src={AllImages.xray} />
      </div>
      <div className="text-base font-medium text-[#222222] mt-[51px] mb-[21px] flex justify-between pb-3">
        <div>
          <h1>Radiologic Technologists</h1>
          <h1>(MSC, PGDM)</h1>
        </div>

        <div>
          <h1>Dr. Payal Shah</h1>
          <h1>(MD, Radiologist)</h1>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryImagingResults;
