import server from "./axios";

export const Lessons = {
  create_lesson: async (data) => await server.post("/create-lesson", data),
  get_lessons: async () => await server.get("/get-lessons"),
};
