import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../context/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out !", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handelClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handelClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 rounded-sm"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
