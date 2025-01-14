import MedicalHistory from "../Components/Dashboard/UserHealthRecord/MedicalHistory";
import ProgressNotes from "../Components/Dashboard/UserHealthRecord/ProgressNotes";
import LaboratoryImagingResults from "../Components/Dashboard/UserHealthRecord/LaboratoryImagingResults";
import InterplayReports from "../Components/Dashboard/UserHealthRecord/InterplayReports";
import Filters from "../Components/Dashboard/UserHealthRecord/Filters";

const UserHealthRecoardPage = () => {
  return (
    <div className="-mt-4">
      <div className="grid xl:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <MedicalHistory />
          <ProgressNotes />
        </div>

        <div className="md:col-span-3">
          <LaboratoryImagingResults />
          <div className="grid md:grid-cols-5 gap-3 mt-4">
            <div className="md:col-span-2 ">
              <InterplayReports />
            </div>

            <div className="md:col-span-3">
              <Filters />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHealthRecoardPage;
