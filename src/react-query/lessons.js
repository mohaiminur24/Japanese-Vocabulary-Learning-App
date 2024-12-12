import { useMutation, useQuery, useQueryClient } from "react-query";
import { Lessons } from "../api/server/lessons";

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-lesson"],
    mutationFn: async (data) => {
      const res = await Lessons.create_lesson(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-lessons"] });
    },
  });
};

export const useGetLessons = () => {
  return useQuery({
    queryKey: ["get-lessons"],
    queryFn: async () => {
      const res = await Lessons.get_lessons();
      return res.data;
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-lesson"],
    mutationFn: async (data) => {
      const res = await Lessons.update_lesson(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-lessons"] });
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-lesson"],
    mutationFn: async (id) => {
      const res = await Lessons.delete_lesson(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-lessons"] });
    },
  });
};
