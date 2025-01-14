import HealthTrends from "../Components/Dashboard/WellnessTracking/HealthTrends";
import MedicalHistoryLog from "../Components/Dashboard/WellnessTracking/MedicalHistoryLog";
import MyBloodPressure from "../Components/Dashboard/WellnessTracking/MyBloodPressure";
import WalkTracking from "../Components/Dashboard/WellnessTracking/WalkTracking";

const ActionableWellnessTracking = () => {
  return (
    <div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <HealthTrends />
          <div className="lg:block hidden">
            <WalkTracking />
          </div>
        </div>

        <MyBloodPressure />
        <MedicalHistoryLog/>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5 top-0 lg:hidden ">
        <WalkTracking />
      </div>
    </div>
  );
};

export default ActionableWellnessTracking;
