import { useMutation, useQuery } from "react-query"
import { auth } from "../api/server/auth"

export const useCreateNewUser=()=>{
    return useMutation({
        mutationKey:["create-new-user"],
        mutationFn:async(user)=>{
            const res = await auth.create_user(user);
            return res.data;
        }
    })
};

export const useLoginUser =()=>{
    return useMutation({
        mutationKey:["login-user"],
        mutationFn:async(credential)=>{
            const res = await auth.login_user(credential);
            return res.data;
        }
    })
}

export const useGetProfile=()=>{
    return useQuery({
        queryKey:["get-profile"],
        queryFn:async()=>{
            const res = await auth.get_profile();
            return res.data;
        }
    })
}