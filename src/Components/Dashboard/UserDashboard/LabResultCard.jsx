
import GetData from "../../../api/GetData";

const LabResultCard = () => {

  const { data, loading, error } = GetData("/data/labReportData.json");

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6  h-full">
      <div>
        <h2 className="text-[24px] font-normal text-[#F5382C]">Lab Result</h2>
        <div className="grid grid-cols-3 mb-4 h-full w-full gap-3">
          <div>
            <p className="text-[16px] text-black font-semibold">
              {data?.patientName}
            </p>
            <p className="text-[12px] text-[#222222]">Age: {data.age} Years</p>
            <p className="text-[12px] text-[#222222]">Sex: {data.sex}</p>
            <p className="text-[12px] text-[#222222]">PID: {data.pid}</p>
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
      <div className="border-t border-gray-200 pt-4">
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
      </div>
    </div>
  );
};

export default LabResultCard;
