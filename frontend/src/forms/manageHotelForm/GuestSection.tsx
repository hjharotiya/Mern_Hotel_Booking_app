import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guest</h2>
      <div className="flex gap-2 bg-gray-300 p-6">
        <label className="text-gray-700 text-sm font-bold flex-1 max-w-[50%]">
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 front-normal"
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-xs">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1 max-w-[50%]">
          Children
          <input
            type="number"
            min={0}
            className="border rounded w-full py-1 px-2 front-normal"
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-xs">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
