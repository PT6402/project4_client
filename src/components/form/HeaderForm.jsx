import { useSelector } from "react-redux";
import ItemStep from "./ItemStep";

export default function HeaderStepForm() {
  const { totalStep } = useSelector((state) => state.formStore);
  if (totalStep) {
    return (
      <div className="flex-1 w-full">
        <ul className="relative flex flex-row gap-x-2">
          {Array(totalStep)
            .fill(null)
            .map((item, i) => {
              return <ItemStep key={i} level={i + 1} />;
            })}
        </ul>
      </div>
    );
  } else {
    throw Error("form not total step");
  }
}
