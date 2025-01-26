import React from 'react';
import { PiPhoneCall } from 'react-icons/pi';
import { TfiEmail } from 'react-icons/tfi';

const adminData = {
  name: "admin",
  avatar:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-66dCgrHq0sRe3GbxrIetveZdOfwv1J.png",
  address: "125 Rio street Road, UK",
  email: "example@gmail.com",
  phone: "+9-088971452123",
};

 const contractData = {
  purchaser: "Jack Mann",
  seller: {
    company: "AUTOGOOD",
    representative: "Olivia Hicks",
    role: "Owner",
  },
  property: {
    vin: "1HGCMB2653A123456",
    make: "Honda",
    model: "Accord",
    year: "2020",
    fullDescription: "2020 Honda Accord VIN 1HGCMB2653A123456",
  },
  earnestMoney: {
    amount: 1000,
    terms:
      "paid by check, shall be deposited into the trust account of the listing broker on the next legal banking day after acceptance of this offer.",
    otherProvisions: "None",
  },
};

const ContractData = () => {
    return (
      <div className="min-h-screen bg-[#FDFDFD] p-4 md:p-8">
        <div className="mx-auto max-w-4xl bg-[#FDFDFD]rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="p-6 flex flex-row items-start justify-between space-y-0">
            <div className="bg-blue-50 rounded-lg p-6">
              <h1 className="text-2xl font-bold">
                CAR SELL
                <br />
                CONTRACT
              </h1>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <div className="relative h-12 w-12">
                  <img
                    src={adminData.avatar || "/placeholder.svg"}
                    alt={adminData.name}
                    className="rounded-full object-cover h-full w-full"
                  />
                </div>
                <span className="font-medium">{adminData.name}</span>
              </div>
              <p className="text-sm text-gray-600">{adminData.address}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {/* <Mail className="h-4 w-4" /> */}
                <span>{adminData.email}</span>
                <TfiEmail />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {/* <Phone className="h-4 w-4" /> */}

                <span>{adminData.phone}</span>
                <PiPhoneCall />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">1. PARTIES TO CONTRACT</h2>
              <p className="text-sm text-gray-600 mb-6">
                Purchaser and Seller acknowledge that Broker is the limited
                agent of both parties to this transaction as outlined in Section
                II of the Agency Agreement Addendum dated July 1, 2028, as
                authorized by Purchaser and Seller.
              </p>
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-sm font-medium">Purchaser</p>
                    <p className="text-sm text-gray-600">
                      {contractData.purchaser}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Seller</p>
                    <p className="text-sm text-gray-600">
                      {contractData.seller.company} (represented by{" "}
                      {contractData.seller.representative},{" "}
                      {contractData.seller.role})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Property Description</p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc">
                      <li>VIN: {contractData.property.vin}</li>
                      <li>Make: {contractData.property.make}</li>
                      <li>Model: {contractData.property.model}</li>
                      <li>Year: {contractData.property.year}</li>
                      <li>
                        Also Known As: {contractData.property.fullDescription}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">
                2. EARNEST MONEY DEPOSIT
              </h2>
              <p className="text-sm text-gray-600">
                Earnest Money in the amount of $
                {contractData.earnestMoney.amount.toLocaleString()}(
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                  .format(contractData.earnestMoney.amount)
                  .replace(/\d+/, "One Thousand")}{" "}
                Dollars) {contractData.earnestMoney.terms}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Other earnest money provisions:{" "}
                {contractData.earnestMoney.otherProvisions}
              </p>
            </section>
          </div>
        </div>
      </div>
    );
};

export default ContractData;