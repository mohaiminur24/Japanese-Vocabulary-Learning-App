import { useMutation, useQuery, useQueryClient } from "react-query";
import { tutorial } from "../api/server/tutorial";

export const useCreateTutorial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-tutorial"],
    mutationFn: async (data) => {
      const res = await tutorial.create_tutorial(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tutorial"] });
    },
  });
};

export const useGetTutorial = () => {
  return useQuery({
    queryKey: ["get-tutorial"],
    queryFn: async () => {
      const res = await tutorial.get_tutorial();
      return res.data;
    },
  });
};
