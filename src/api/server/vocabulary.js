import server from "./axios";

export const Vocabulary = {
  create_vocabulary: async (data) => await server.post("/add-vocabulary", data),
  update_vocabulary: async (data) =>
    await server.post(`/update-vocabulary`, data),
  delete_vocabulary: async (data) =>
    await server.post(`delete-vocabulary`, data),
  get_vocabulary: async () => await server.get(`/get-vocabulary`),
  vocabulary: async(id)=> await server.get(`/vocabulary?id=${id}`),
};
