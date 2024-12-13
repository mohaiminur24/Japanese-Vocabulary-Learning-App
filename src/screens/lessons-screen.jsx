import { useNavigate } from "react-router-dom";
import SectionWrapper from "../components/common/section-wrapper";
import { useGetLessons } from "../react-query/lessons";
import Loading from "../components/common/loading";

export default function LessonsScreen() {
  const navigation = useNavigate();
  const lessons = useGetLessons();

  const handleRedirect = (id) => {
    navigation("vocabulary");
  };

  if (lessons.isLoading) return <Loading />;

  return (
    <div>
      <SectionWrapper>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Japanese Vocabulary Lessons
          </h1>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {lessons.data.map((lesson) => (
              <div
                onClick={() => handleRedirect(lesson.id)}
                key={lesson.id}
                className="bg-white shadow-lg cursor-pointer rounded-lg p-4 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {lesson.description}
                </p>
                <p className="text-gray-700 font-medium">
                  Vocabulary Count:{" "}
                  <span className="text-blue-500">
                    {lesson.count}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
