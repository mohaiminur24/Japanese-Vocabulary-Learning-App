import server from "./axios";

export const Vocabulary = {
  create_vocabulary: async (data) => await server.post("/add-vocabulary", data),
  update_vocabulary: async (id, data) =>
    await server.post(`/update-vocabulary?id=${id}`, data),
  delete_vocabulary: async (id) =>
    await server.delete(`delete-vocabulary?id:${id}`),
  get_vocabulary: async()=> await server.get("/get-vocabulary")
};
