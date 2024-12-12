import { useNavigate } from "react-router-dom";
import SectionWrapper from "../components/common/section-wrapper";

export default function LessonsScreen() {
  const navigation = useNavigate();
  const handleRedirect = (id) => {
    navigation("vocabulary");
  };
  
  return (
    <div>
      <SectionWrapper>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Japanese Vocabulary Lessons
          </h1>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
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
                    {lesson.vocabularyCount}
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

const lessons = [
  {
    id: 1,
    title: "Basic Greetings",
    description:
      "Learn essential Japanese greetings for everyday conversations.",
    vocabularyCount: 10,
  },
  {
    id: 2,
    title: "Numbers and Counting",
    description: "Master the numbers and counting system in Japanese.",
    vocabularyCount: 15,
  },
  {
    id: 3,
    title: "Family Members",
    description: "Understand how to refer to family members in Japanese.",
    vocabularyCount: 12,
  },
  {
    id: 4,
    title: "Food and Drinks",
    description: "Learn Japanese vocabulary for common foods and drinks.",
    vocabularyCount: 20,
  },
  {
    id: 5,
    title: "Shopping Phrases",
    description: "Useful phrases and vocabulary for shopping in Japan.",
    vocabularyCount: 18,
  },
];
