import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "registeration successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 front-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 front-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 front-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 front-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 front-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This Field is Required";
              } else if (watch("password") !== val) {
                return "Your Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span>
        <button className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500">
          create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
