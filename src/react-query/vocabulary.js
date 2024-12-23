import { useMutation, useQuery, useQueryClient } from "react-query";
import { Vocabulary } from "../api/server/vocabulary";

export const useCreateVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-vocabulary"],
    mutationFn: async (data) => {
      const res = await Vocabulary.create_vocabulary(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-vocabulary"] });
    },
  });
};

export const useUpdateVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-vocabulary"],
    mutationFn: async (data) => {
      const res = await Vocabulary.update_vocabulary(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-vocabulary"] });
    },
  });
};

export const useDeleteVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-vocabulary"],
    mutationFn: async (data) => {
      const res = await Vocabulary.delete_vocabulary(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-vocabulary"] });
    },
  });
};

export const useGetVocabulary = () => {
  return useQuery({
    queryKey: ["get-vocabulary"],
    queryFn: async () => {
      const res = await Vocabulary.get_vocabulary();
      return res.data;
    },
  });
};

export const useVocabulary = (id) => {
  return useQuery({
    queryKey: ["vocabulary"],
    queryFn: async () => {
      const res = await Vocabulary.vocabulary(id);
      return res.data;
    },
  });
};
