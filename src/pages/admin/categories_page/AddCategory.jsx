/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import CateFormNameFile from "./form/CateFormNameFile";
import CateFormDes from "./form/CateFormDes";
import { useEffect, useLayoutEffect, useState } from "react";
import { firstConfig } from "../../../context/formSlice";
import { ControlForm, HeaderStepForm } from "../../../components";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import CateReviewForm from "./form/CateReviewForm";

export default function AddCategory() {
  const dispatch = useDispatch();
  const [uiRender, setUIRender] = useState();
  const { currentStep } = useSelector((state) => state.formStore);
  const handleRenderUI = () => {
    switch (currentStep) {
      case 1:
        setUIRender(CateFormNameFile);
        return;
      case 2:
        setUIRender(CateFormDes);
        return;
      case 3:
        setUIRender(CateReviewForm);
        return;
      default:
        throw Error("current step invalid");
    }
  };

  useEffect(() => {
    if (currentStep) {
      handleRenderUI();
    }
  }, [currentStep]);
  useLayoutEffect(() => {
    dispatch(firstConfig({ currentStep: 1, totalStep: 3 }));
  }, []);
  return (
    <>
      {currentStep && (
        <div className="w-full ">
          <div className="my-5 flex  items-center gap-3">
            <Link to={"/admin/category"}>
              <Button variant="outlined">back</Button>
            </Link>
            <h1 className="font-bold text-xl">Add Category</h1>
          </div>
          <HeaderStepForm />
          {uiRender ? uiRender : "no ui"}
          <ControlForm />
        </div>
      )}
    </>
  );
}
