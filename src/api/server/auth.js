import server from "./axios";


export const auth = {
  create_user: async (user) => await server.post("/user",user),
  login_user:async(credential)=>await server.post("/login",credential),
  get_profile: async()=>await server.get("/profile"),
  get_users: async()=> await server.get("/get-users"),
  update_user: async(data)=> await server.post(`/update-user`,data ),
  delete_user: async(id)=> await server.delete(`/delete-user?id=${id}`),
}
