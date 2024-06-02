import { HFacilities } from "../config/hotel-config-option";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Facilities = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {HFacilities.map((facilities) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={facilities}
            checked={selectedFacilities.includes(facilities)}
            onChange={onChange}
          />
          <span>{facilities} </span>
        </label>
      ))}
    </div>
  );
};

export default Facilities;
