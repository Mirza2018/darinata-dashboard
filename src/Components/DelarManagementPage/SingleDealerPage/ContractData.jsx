
import { Checkbox, Radio, Space, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../../../redux/getBaseUrl";
import { useContactPaperQuery } from "../../../redux/api/contract";
import { useParams } from "react-router-dom";



const ContractData = () => {
  const params = useParams()
  console.log(params);


  // console.log(params);
  const advancedRef = useRef();
  const agrimentRef = useRef();

  const { data, currentData, isLoading, isFetching, isSuccess } =
    useContactPaperQuery(params.id);

  // const [contractPaper] = useUpdateContactPaperMutation();

  const displayedData = data ?? currentData;
  // console.log(displayedData);

  const inspectionDate = new Date(
    displayedData?.data?.car?.inspectionDate
  ).toDateString();
  const [advanceAmount, setAdvanceAmount] = useState();
  const [registrationValue, setRegistrationValue] = useState(null);

  const onChange = (e) => {
    setRegistrationValue(e.target.value);
  };


  const [isValueIncressed, setIsValueIncreased] = useState(
    displayedData?.data?.isMoms
  );

  useEffect(() => {
    setIsValueIncreased(displayedData?.data?.isMoms);
  }, [ displayedData?.data?.isMoms]);
  // Access localStorage only on the client side for initial load



  if (isLoading)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (!isLoading && isFetching)
    return <Spin className="flex justify-center items-center" size="large" />;
  if (isSuccess && displayedData)
    return (
      <div className="container mx-auto border-2 border-secondary-color rounded-md md:my-20 overflow-x-clip">
        <div className="max-w-[1350px] mx-auto md:my-10 ">
          <h1
            style={{ fontSize: "clamp(20px, 3vw + 1rem ,60px)" }}
            className="font-bold "
          >
            Final note
          </h1>
          {/* <pre>{JSON.stringify(displayedData.data, null, 4)}</pre> */}
          <section className="flex flex-col mx-5">
            <h1
              style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
              className="text-highlight-color  font-bold my-5"
            >
              With
            </h1>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p className="overflow-x-scroll hide-x-scrollbar">
                Model and brand
              </p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                {displayedData?.data?.carModel?.brand}{" "}
                {displayedData?.data?.carModel?.model}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Car Category</p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                {displayedData?.data?.car?.carCategory}
              </p>
            </div>
            {displayedData?.data?.carModel?.modelYear > 0 && (
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                <p>Year</p>
                <p>{displayedData?.data?.carModel?.modelYear}</p>
              </div>
            )}

            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Kilometer</p>
              <p>{displayedData?.data?.car?.noOfKmDriven} KM</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p className="overflow-x-scroll hide-x-scrollbar">
                Registration number
              </p>
              <p>{displayedData?.data?.car?.registrationNumber}</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p>Fuel</p>
              <p>{displayedData?.data?.carModel?.fuelType}</p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
              <p className="overflow-x-scroll hide-x-scrollbar">
                The condition of the car
              </p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                {displayedData?.data?.car?.condition}
              </p>
            </div>
            <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
              <p>Inspection Date</p>
              <p className="overflow-x-scroll hide-x-scrollbar">
                {inspectionDate}
              </p>
            </div>
          </section>

          <main className="flex flex-col lg:grid lg:grid-cols-2 gap-0 mx-6 my-10 ">
            <section className="flex flex-col">
              <h1
                style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
                className="text-highlight-color  font-bold mb-3 mt-7"
              >
                Seller
              </h1>

              {displayedData?.data?.company?.first_name && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                  <p>First name</p>
                  <p>{displayedData?.data?.company?.first_name}</p>
                </div>
              )}

              {displayedData?.data?.company?.last_name && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                  <p>Surname</p>
                  <p>{displayedData?.data?.company?.last_name}</p>
                </div>
              )}
              {displayedData?.data?.company?.companyName && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                  <p>Company Name</p>
                  <p className="overflow-x-scroll  hide-x-scrollbar">
                    {displayedData?.data?.company?.companyName}
                  </p>
                </div>
              )}

              {displayedData?.data?.company?.city && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                  <p>City</p>
                  <p className="overflow-x-scroll hide-x-scrollbar">
                    {displayedData?.data?.company?.city}
                  </p>
                </div>
              )}

              {displayedData?.data?.company?.postCode && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                  <p>Postal code</p>
                  <p>{displayedData?.data?.company?.postCode}</p>
                </div>
              )}

              {displayedData?.data?.company?.privateUser?.email && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                  <p>E-mail</p>
                  <p className="overflow-x-scroll hide-x-scrollbar">
                    <p>{displayedData?.data?.privateUser?.email}</p>
                  </p>
                </div>
              )}

              {displayedData?.data?.company?.phoneNumber && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
                  <p>Telephone</p>
                  <p className="overflow-x-scroll  hide-x-scrollbar">
                    {displayedData?.data?.company?.phoneNumber}
                  </p>
                </div>
              )}
            </section>
            <section className="flex flex-col">
              <h1
                style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
                className="text-highlight-color  font-bold my-5"
              >
                Buyer
              </h1>
              {displayedData?.data?.dealer?.first_name && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                  <p>First name</p>
                  <p>{displayedData?.data?.dealer?.first_name}</p>
                </div>
              )}

              {displayedData?.data?.dealer?.last_name && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color p-3">
                  <p>Surname</p>
                  <p>{displayedData?.data?.dealer?.last_name}</p>
                </div>
              )}
              {displayedData?.data?.dealer?.email && (
                <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color p-3">
                  <p>Email</p>
                  <p>{displayedData?.data?.dealer?.email}</p>
                </div>
              )}
            </section>
          </main>
          {/* Price */}
          <section className="flex flex-col mx-5">
            <div
              style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
              className="text-highlight-color font-bold mb-3 py-3"
            >
              Price
            </div>
            <div className="border rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
              <div className="flex justify-between items-center w-full gap-5 flex-wrap">
                <div className="bg-base-color py-2 border border-highlight-color rounded-md flex items-center gap-5 px-5 flex-wrap">
                  <h1
                    style={{ fontSize: "clamp(12px, 3vw + 1rem ,18px)" }}
                    className="text-xl font-bold"
                  >
                    Purchase amount*
                  </h1>
                  <p
                    // onClick={() => setIsValueIncreased(false)}
                    className={`bg-base-color md:px-8 px-2 py-2 rounded-md flex justify-center items-center gap-2 ${
                      isValueIncressed ? "" : "border border-secondary-color "
                    }`}
                  >
                    inkl
                  </p>
                  <p
                    // onClick={() => setIsValueIncreased(true)}
                    className={`bg-base-color md:px-8 px-2 py-2  rounded-md flex justify-center items-center gap-2 ${
                      isValueIncressed ? "border border-secondary-color" : ""
                    }`}
                  >
                    moms
                  </p>
                </div>
                <p className="bg-base-color px-8 py-2 border border-secondary-color rounded-md">
                  {isValueIncressed
                    ? `${
                        displayedData?.data?.expectedPrice +
                        displayedData?.data?.expectedPrice * 0.25
                      } DKK`
                    : `${displayedData?.data?.expectedPrice} DKK`}
                </p>
              </div>
              <div className="flex justify-between items-center w-full gap-5 flex-wrap">
                <h1>
                  The deal is signed and completed before inspection. The buyer
                  undertakes to pay the agreed amount upon collection of the
                  car, provided that the car is as described.{" "}
                  <Checkbox
                    checked={displayedData?.data?.isAggrade}
                    ref={agrimentRef}
                  ></Checkbox>
                </h1>
                {/* <div>
                  <FaRegSquareCheck className="text-xl text-highlight-color" />
                </div> */}
              </div>
              <div className="flex justify-between items-start w-full gap-5  flex-wrap">
                <h1 className="flex-1">
                  It has been agreed that the buyer pays a deposit to the seller
                  as security for the transaction. The remaining amount is paid
                  upon handover of the car. The deposit amounts to DKK
                </h1>
                {/* <InputNumber
                  defaultValue={displayedData?.data?.advancedPayment}
                  onChange={(e) => setAdvanceAmount(e)}
                  name="advancedPayment"
                  ref={advancedRef}
                  suffix="DKK"
                  className=" !w-40"
                /> */}
                <p className="bg-base-color border border-secondary-color py-1 px-3 rounded-lg">
                  {displayedData?.data?.advancedPayment} DKK
                </p>
              </div>
              <div className="flex justify-between items-start w-full gap-5  flex-wrap">
                <h1>
                  The remaining amount, which is paid out at the time of
                  transfer, is
                </h1>
                <p className="bg-base-color px-2 py-2 border border-secondary-color rounded-md ">
                  {displayedData?.data?.expectedPrice ? (
                    <>
                      {isValueIncressed
                        ? `${
                            displayedData?.data?.expectedPrice +
                            displayedData?.data?.expectedPrice * 0.25 -
                            displayedData?.data?.advancedPayment
                          } DKK`
                        : `${
                            displayedData?.data?.expectedPrice -
                            displayedData?.data?.advancedPayment
                          } DKK`}{" "}
                    </>
                  ) : (
                    <>
                      {isValueIncressed
                        ? `${
                            displayedData?.data?.expectedPrice +
                            displayedData?.data?.expectedPrice * 0.25
                          } DKK`
                        : `${displayedData?.data?.expectedPrice} DKK`}
                    </>
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center w-full gap-5">
                <h1>
                  *The buyer is obliged to pay the agreed amount at the time of
                  transfer.
                </h1>
              </div>
            </div>
          </section>
          {/* Re-registration */}
          <section className="flex flex-col mx-5">
            <h1
              style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
              className="text-highlight-color  font-bold mb-3 py-3"
            >
              Re-registration/de-registration view
            </h1>
            <div className="border rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
              <Radio.Group
                // onChange={onChange}
                onChange={onChange}
                // value={registrationValue}
                value={Number(
                  displayedData?.data?.reRegistrationDeRegistrationView
                )}
                name="registration"
                style={{ width: "100%" }}
              >
                <Space
                  // className="flex  items-start justify-between  w-full"
                  direction="vertical"
                >
                  <Radio
                    // className="flex flex-row-reverse justify-between w-full"
                    value={1}
                  >
                    Køber omregistrerer/afmelder bilen inden for 4 hverdage*
                  </Radio>
                  <Radio
                    // className="flex flex-row-reverse justify-between w-full"
                    value={2}
                  >
                    Buyer and seller re-register the car together
                  </Radio>
                  <Radio
                    value={3}
                    // className="flex flex-row-reverse justify-between"
                  >
                    The seller deregisters the car and hands over the number
                    plates
                  </Radio>
                  <Radio
                    value={4}
                    // className="flex flex-row-reverse justify-between"
                  >
                    The car is deregistered
                  </Radio>
                  <Radio
                    value={5}
                    // className="flex flex-row-reverse justify-between"
                  >
                    According to Danish legislation, the car must be
                    re-registered/de-registered no later than 4 working days
                    after the transaction
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </section>
          {/* Signature */}

          <section className="border rounded-md font-medium border-secondary-color px-3 py-9 flex md:flex-row flex-col justify-around gap-9 mx-5 my-10">
            {/* <div className="flex flex-col justify-center items-center gap-2">
              <p className="max-h-36 min-h-28 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
              <p className="text-base font-medium">Seller Signature</p>
              <p className="text-base font-medium">Kasper Munch Sørensen</p>
              <p className="text-base font-medium">Date: 2025-01-27 13:12:38</p>
            </div> */}

            {displayedData?.data?.signatureAsOwner ? (
              <div className="flex flex-col justify-center gap-2 items-center">
                <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                  <img
                    src={getImageUrl() + displayedData?.data?.signatureAsOwner}
                    alt="Saved Signature"
                    fill
                    style={{ objectFit: "contain" }}
                    className="absolute"
                  />
                </div>
                <p className="text-base font-medium">Private User Signature</p>
                <p className="text-base font-medium">
                  {displayedData?.data?.privateUser?.first_name}{" "}
                  {displayedData?.data?.privateUser?.last_name}
                </p>
                {/* <p className="text-base font-medium">
                  Date: 2025-01-27 13:12:38
                </p> */}
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-2 items-center">
                <p className="max-h-36 min-h-28 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
                <p className="text-base font-medium">Private User Signature</p>
                <p className="text-base font-medium">
                  {displayedData?.data?.privateUser?.first_name}{" "}
                  {displayedData?.data?.privateUser?.last_name}
                </p>
              </div>
            )}

            {displayedData?.data?.signatureAsDealer ? (
              <div className="flex flex-col justify-center gap-2 items-center">
                <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                  <img
                    src={getImageUrl() + displayedData?.data?.signatureAsDealer}
                    alt="Saved Signature"
                    fill
                    style={{ objectFit: "contain" }}
                    className="absolute"
                  />
                </div>
                <p className="text-base font-medium">Dealer Signature</p>
                <p className="text-base font-medium">
                  {displayedData?.data?.dealer?.first_name}{" "}
                  {displayedData?.data?.dealer?.last_name}
                </p>
                {/* <p className="text-base font-medium">
                  Date: 2025-01-27 13:12:38
                </p> */}
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-2 items-center">
                <p className="max-h-36 min-h-28 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
                <p className="text-base font-medium">Dealer Signature</p>
                <p className="text-base font-medium">
                  {displayedData?.data?.dealer?.first_name}{" "}
                  {displayedData?.data?.dealer?.last_name}
                </p>
              </div>
            )}

            <div className="!flex !justify-end !items-end">
              <button className="bg-base-color w-fit px-8 py-2 border border-secondary-color rounded-md text-end h-fit whitespace-nowrap">
                {isValueIncressed
                  ? `${
                      displayedData?.data?.expectedPrice +
                      displayedData?.data?.expectedPrice * 0.25
                    } DKK`
                  : `${displayedData?.data?.expectedPrice} DKK`}
              </button>
            </div>
          </section>

        </div>
      </div>
    );
};

export default ContractData;
