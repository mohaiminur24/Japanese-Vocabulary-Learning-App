import { useMutation, useQuery, useQueryClient } from "react-query";
import { auth } from "../api/server/auth";

export const useCreateNewUser = () => {
  return useMutation({
    mutationKey: ["create-new-user"],
    mutationFn: async (user) => {
      const res = await auth.create_user(user);
      return res.data;
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (credential) => {
      const res = await auth.login_user(credential);
      return res.data;
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await auth.get_profile();
      return res.data;
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const res = await auth.get_users();
      return res.data;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data) => {
      const res = await auth.update_user(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id) => {
      const res = await auth.delete_user(id);
      return res.data;
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["get-users"]})
    }
  });
};
