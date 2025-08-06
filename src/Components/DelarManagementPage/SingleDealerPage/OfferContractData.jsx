import { Checkbox, Radio, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../../redux/getBaseUrl";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PiPrinterThin } from "react-icons/pi";

const OfferContractData = () => {
  const displayedData = useSelector((state) => state.offerInfo.offerCarInfo);
  console.log(displayedData);
  let carPrice = displayedData?.cashPrice;

  // console.log(params);

  const advancedRef = useRef();
  const agrimentRef = useRef(); 
  const contractRef = useRef();

  const inspectionDate = new Date(
    displayedData?.data?.car?.inspectionDate
  ).toDateString();
  const [advanceAmount, setAdvanceAmount] = useState();
  const [registrationValue, setRegistrationValue] = useState(null);

  const onChange = (e) => {
    setRegistrationValue(e.target.value);
  };
  const handlePrint = async () => {
    if (!contractRef.current) return;

    try {
      const canvas = await html2canvas(contractRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: contractRef.current.scrollWidth,
        height: contractRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Contract_SLUTSEDDEL.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };
  const [isValueIncressed, setIsValueIncreased] = useState(
    displayedData?.isMoms
  );

  useEffect(() => {
    setIsValueIncreased(displayedData?.isMoms);
  }, [displayedData?.isMoms]);
  // Access localStorage only on the client side for initial load

  return (
    <div className="container mx-auto border-2 border-secondary-color rounded-md md:my-20 overflow-x-clip">
      <div ref={contractRef} className="max-w-[1350px] mx-auto md:my-10 ">
        <h1
          style={{ fontSize: "clamp(20px, 3vw + 1rem ,60px)" }}
          className="font-bold "
        >
          SLUTSEDDEL
        </h1>

        <section className="mx-6 my-10 ">
          <h1
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color  font-bold mb-3 mt-7"
          >
            SÆLGER & KØBER
          </h1>
          <main className="flex flex-col lg:grid lg:grid-cols-2  ">
            <section className="flex flex-col">
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="text-xl font-bold">Sælger</p>
                <p></p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Fornavn</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.dealerUserProfile?.first_name &&
                    displayedData?.dealerUserProfile?.first_name}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Efternavn</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.dealerUserProfile?.last_name &&
                    displayedData?.dealerUserProfile?.last_name}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Address</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.dealerUserProfile?.street}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Postnr.</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.dealerUserProfile?.zip &&
                    displayedData?.dealerUserProfile?.zip}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">By</p>
                <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
                  {displayedData?.dealerUserProfile?.city}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Telefon</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.dealerUserProfile?.phoneNumber &&
                    displayedData?.dealerUserProfile?.phoneNumber}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Privatperson / Virksomhed CVR</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.dealerUserProfile?.cvrNumber
                    ? displayedData?.dealerUserProfile?.cvrNumber
                    : "Private "}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
                <p className="ps-2">E-mail</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.dealerUser?.email &&
                    displayedData?.dealerUser?.email}
                </p>
              </div>
            </section>
            <section className="flex flex-col">
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="text-xl font-bold ms-2">KØBER</p>
                <p></p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Fornavn</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.privateUserProfile?.first_name &&
                    displayedData?.privateUserProfile?.first_name}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Efternavn</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.privateUserProfile?.last_name &&
                    displayedData?.privateUserProfile?.last_name}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Address</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.submitListing?.street}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Postnr.</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.submitListing?.postalCode &&
                    displayedData?.submitListing?.postalCode}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">By</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.submitListing?.city &&
                    displayedData?.submitListing?.city}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Telefon</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.submitListing?.phoneNumber &&
                    displayedData?.submitListing?.phoneNumber}
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Privatperson / Virksomhed CVR </p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  Private
                </p>
              </div>
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
                <p className="ps-2">E-mail</p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.privateUser?.email &&
                    displayedData?.privateUser?.email}
                </p>
              </div>
            </section>
          </main>
        </section>
        {/* Orginal */}
        <section className="mx-6 my-10 ">
          <h1
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color  font-bold mb-3 mt-7"
          >
            BILEN
          </h1>
          <main className="flex flex-col lg:grid lg:grid-cols-2 gap-0 ">
            <section className="flex flex-col">
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Mærke & model</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.mark} {displayedData?.model}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Biltype</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.carCategory}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Kilometer</p>
                <p className="border-s border-secondary-color ps-2 overflow-x-scroll hide-x-scrollbar">
                  {displayedData?.DrivenKm} KM
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
                <p className="ps-2">Brændstof</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.fuel}
                </p>
              </div>
            </section>

            {/* Buyer */}
            <section className="flex flex-col">
              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Chassisnummer</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.chassisNumber ? (
                    <>{displayedData?.chassisNumber}</>
                  ) : (
                    <>No chassisNumber found</>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">År</p>
                <p className="border-s border-secondary-color ps-2 overflow-x-scroll  hide-x-scrollbar">
                  {displayedData?.modelsYear > 0 && displayedData?.modelsYear}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-t border-secondary-color leading-10">
                <p className="ps-2">Licensnummer</p>
                <p className="border-s border-secondary-color ps-2">
                  {displayedData?.carLicensePlateNumber ? (
                    <>{displayedData?.carLicensePlateNumber}</>
                  ) : (
                    <>Offer Car Without License</>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 bg-base-color border-x font-medium border-y border-secondary-color leading-10">
                <p className="ps-2"> Bilens tilstand </p>
                <p className="overflow-x-scroll  hide-x-scrollbar border-s border-secondary-color ps-2">
                  {displayedData?.carCondition}
                </p>
              </div>
            </section>
          </main>
        </section>

        <section className="flex flex-col mx-5">
          <h1
            style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
            className="text-highlight-color  font-bold mb-3 py-3"
          >
            OMREGISTRERING/AFMELDING
          </h1>
          <div className=" rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
            <Radio.Group
              // onChange={onChange}
              onChange={onChange}
              // value={registrationValue}
              value={Number(displayedData?.reRegistrationDeRegistrationView)}
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
                  Køber omregistrerer/afmelder bilen inden for 4 hverdage
                </Radio>
                <Radio
                  // className="flex flex-row-reverse justify-between w-full"
                  value={2}
                >
                  Køber og sælger omregistrerer sammen bilen
                </Radio>
                <Radio
                  value={3}
                  // className="flex flex-row-reverse justify-between"
                >
                  Sælger afmelder bilen og afleverer nummerplader
                </Radio>
                <Radio
                  value={4}
                  // className="flex flex-row-reverse justify-between"
                >
                  Bilen er allerede afmeldt
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </section>

        {/* Price */}
        <section className="flex flex-col mx-5">
          <div className=" rounded-md font-medium border-secondary-color px-3 py-9 flex flex-col gap-9">
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
                  className={`bg-base-color md:px-8 px-2 py-2 rounded-md flex justify-center items-center gap-2   ${
                    isValueIncressed ? "" : "border border-secondary-color "
                  }`}
                >
                  inkl
                </p>
                <p
                  // onClick={() => setIsValueIncreased(true)}
                  className={`bg-base-color md:px-8 px-2 py-2  rounded-md flex justify-center items-center gap-2  ${
                    isValueIncressed ? "border border-secondary-color" : ""
                  }`}
                >
                  moms
                </p>
              </div>
              <p className="bg-base-color px-8 py-2 border border-secondary-color rounded-md">
                {isValueIncressed
                  ? `${carPrice + carPrice * 0.25} .kr`
                  : `${carPrice} .kr`}
              </p>
            </div>

            <div className="flex justify-between items-start w-full gap-5  flex-wrap">
              <h1 className="flex-1">Afslag ved hurtig handel (DKK)</h1>

              <p className="bg-base-color border border-secondary-color py-1 px-3 rounded-lg">
                {displayedData?.advancedPayment} .kr
              </p>
            </div>
            <h1
              style={{ fontSize: "clamp(24px, 3vw + 1rem ,32px)" }}
              className="text-highlight-color  font-bold  "
            >
              HANDEL
            </h1>
            <div className="flex justify-between items-start w-full gap-5  flex-wrap border-secondary-color border p-2">
              <h1>Samlet købesum (DKK)</h1>
              <p className="bg-base-color px-2 py-2 border border-secondary-color rounded-md ">
                {carPrice ? (
                  <>
                    {isValueIncressed
                      ? `${
                          carPrice +
                          carPrice * 0.25 -
                          (displayedData?.advancedPayment +
                            displayedData?.advancedPayment * 0.25)
                        } .kr`
                      : `${carPrice - displayedData?.advancedPayment} .kr`}{" "}
                  </>
                ) : (
                  <>
                    {isValueIncressed
                      ? `${carPrice + carPrice * 0.25} .kr`
                      : `${carPrice} .kr`}
                  </>
                )}
              </p>
            </div>

            <section className="flex flex-col">
              <h1
                style={{ fontSize: "clamp(24px, 3vw + 1rem ,32px)" }}
                className="text-highlight-color  font-bold mb-3 py-3"
              >
                Kommentarer
              </h1>
              <div className="flex  gap-5">
                <h1>
                  Køber bekræfter at have gennemgået bilen og accepterer dens
                  stand. Handlen gennemføres som beset.
                </h1>
                <Checkbox
                  checked={displayedData?.isAggrade}
                  ref={agrimentRef}
                ></Checkbox>
              </div>
            </section>
          </div>
        </section>
        {/* Re-registration */}

        <section className="flex flex-col mx-10">
          <section className="flex flex-col">
            <h1
              style={{ fontSize: "clamp(18px, 3vw + 1rem ,48px)" }}
              className="text-highlight-color  font-bold mb-3 py-3"
            >
              Underskrifter
            </h1>
          </section>
          <div className="flex flex-col gap-5">
            <h1>
              Så snart denne kontrakt er underskrevet, er handlen bindende for
              begge parter.
            </h1>

            <h1>
              Bilen sælges af privatperson, og handlen er derfor ikke
              momspligtig. Købsprisen er momsfri.
            </h1>
            <h1>
              Hvis der er moms i bilen, skal sælger udstede en faktura, hvor
              momsen fremgår særskilt.
            </h1>
          </div>
        </section>

        {/* Signature */}

        <section className=" rounded-md font-medium border-secondary-color px-3 py-9 flex md:flex-row flex-col justify-around gap-9 mx-5 my-10">
          {displayedData?.signatureAsOwner ? (
            <div className="flex flex-col justify-center gap-2 items-center">
              <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                <img
                  src={getImageUrl() + displayedData?.signatureAsOwner}
                  alt="Saved Signature"
                  fill
                  style={{ objectFit: "contain" }}
                  className="absolute"
                />
              </div>
              <p className="text-base font-medium">Private User underskrift</p>
              <p className="text-base font-medium">
                {displayedData?.privateUserProfile?.first_name}{" "}
                {displayedData?.privateUserProfile?.last_name}
              </p>
              {/* <p className="text-base font-medium">
                  Date: 2025-01-27 13:12:38
                </p> */}
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-2 items-center">
              <p className="max-h-36 min-h-28 aspect-video border-2 border-dotted border-highlight-color rounded-lg"></p>
              <p className="text-base font-medium">Private User underskrift</p>
              <p className="text-base font-medium">
                {displayedData?.data?.dealer?.first_name}{" "}
                {displayedData?.data?.dealer?.last_name}
              </p>
            </div>
          )}

          {displayedData?.signatureAsDealer ? (
            <div className="flex flex-col justify-center gap-2 items-center">
              <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                <img
                  src={getImageUrl() + displayedData?.signatureAsDealer}
                  alt="Saved Signature"
                  fill
                  style={{ objectFit: "contain" }}
                  className="absolute"
                />
              </div>
              <p className="text-base font-medium">Dealer underskrift</p>
              <p className="text-base font-medium">
                {displayedData?.dealerUserProfile?.first_name}{" "}
                {displayedData?.dealerUserProfile?.last_name}
              </p>
              {/* <p className="text-base font-medium">
                  Date: 2025-01-27 13:12:38
                </p> */}
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-2 items-center">
              <div className="max-h-36 min-h-28  aspect-video border-2 border-dotted border-highlight-color rounded-lg flex justify-center items-center relative">
                {signature ? (
                  <Image
                    src={signature}
                    alt="Saved Signature"
                    fill
                    style={{ objectFit: "contain" }}
                    className="absolute"
                  />
                ) : (
                  <p></p>
                )}
              </div>
              <p className="text-base font-medium">Dealer underskrift</p>
              <p className="text-base font-medium">
                {displayedData?.dealerUserProfile?.first_name}{" "}
                {displayedData?.dealerUserProfile?.last_name}
              </p>
            </div>
          )}

          <div className="!flex !justify-end !items-end">
            <button className="bg-base-color w-fit px-8 py-2 border border-secondary-color rounded-md text-end h-fit whitespace-nowrap">
              {carPrice ? (
                <>
                  {isValueIncressed
                    ? `${
                        carPrice +
                        carPrice * 0.25 -
                        (displayedData?.advancedPayment +
                          displayedData?.advancedPayment * 0.25)
                      } .kr`
                    : `${carPrice - displayedData?.advancedPayment} .kr`}{" "}
                </>
              ) : (
                <>
                  {isValueIncressed
                    ? `${carPrice + carPrice * 0.25} .kr`
                    : `${carPrice} .kr`}
                </>
              )}
            </button>
          </div>
        </section>
        <h1 className="mx-10">
          Så længe der ikke står noget i feltet 'Bemærkninger', anses bilen for
          at være med fuld dansk registreringsafgift og gældfri. Hvis der er
          gæld, betaler køber direkte til sælgers bank.
        </h1>
      </div>
      <div className="flex justify-around mb-3">
        <div></div>
        <button
          onClick={handlePrint}
          className="font-bold text-white bg-highlight-color p-2 rounded-md flex justify-center items-center gap-2"
        >
          <PiPrinterThin className="text-xl" />
          Print
        </button>
      </div>
    </div>
  );
};

export default OfferContractData;
