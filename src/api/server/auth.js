import server from "./axios";


export const auth = {
  create_user: async (user) => await server.post("/user",user),
  login_user:async(credential)=>await server.post("/login",credential),
  get_profile: async()=>await server.get("/profile"),
}
