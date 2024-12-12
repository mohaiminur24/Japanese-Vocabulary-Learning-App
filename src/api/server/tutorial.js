import server from "./axios";

export const tutorial ={
    create_tutorial: async(data)=>await server.post("/tutorial",data),
    get_tutorial: async()=> await server.get("/get-tutorial"),
}