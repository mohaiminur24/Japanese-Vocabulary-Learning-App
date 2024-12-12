import server from "./axios";

export const Lessons = {
  create_lesson: async (data) => await server.post("/create-lesson", data),
  get_lessons: async () => await server.get("/get-lessons"),
  update_lesson: async (data) => await server.post("/update-lesson", data),
  delete_lesson: async (id) => await server.delete(`/delete-lesson?id=${id}`),
};
