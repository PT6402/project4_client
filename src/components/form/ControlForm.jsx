import { useDispatch, useSelector } from "react-redux";
import { setFormNextStep, setFormPrevStep } from "../../context/formSlice";
import IconArrowLeft from "../icons/IconArrowLeft";
import IconArrowRight from "../icons/IconArrowRight";

export default function ControlForm() {
  const dispatch = useDispatch();
  const { currentStep, totalStep: lastStep } = useSelector(
    (state) => state.formStore
  );

  const handleNextStep = () => {
    if (currentStep >= lastStep) {
      return;
    } else {
      dispatch(setFormNextStep());
    }
  };
  const handlePrevStep = () => {
    if (currentStep == 1) {
      return;
    } else {
      dispatch(setFormPrevStep());
    }
  };
  return (
    <div className="w-full flex justify-between flex-1">
      <button
        type="button"
        className={`py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 ${
          currentStep == 1 ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={handlePrevStep}
      >
        <IconArrowLeft />
        Back
      </button>
      <button
        type="button"
        className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none"
        onClick={handleNextStep}
        style={{ display: currentStep + 1 > lastStep ? "none" : "" }}
      >
        Next
        <IconArrowRight />
      </button>
      <button
        type="button"
        className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none"
        data-hs-stepper-finish-btn=""
        style={{ display: currentStep + 1 > lastStep ? "" : "none" }}
        onClick={handleNextStep}
      >
        Create
      </button>
    </div>
  );
}
