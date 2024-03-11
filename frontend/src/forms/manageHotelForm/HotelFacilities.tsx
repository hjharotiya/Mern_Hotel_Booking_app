import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { HFacilities } from "../../config/hotel-config-option";

const HotelFacilities = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid  grid-cols-5 gap-3">
        {HFacilities.map((item) => (
          <label className="text-sm flex gap-1 items-center text-gray-700">
            <input
              type="checkbox"
              value={item}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At Least one Facility is Required";
                  }
                },
              })}
            />
            {item}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default HotelFacilities;
