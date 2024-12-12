import { useNavigate } from "react-router-dom";
import SectionWrapper from "../../components/common/section-wrapper";

export default function DashboardScreen() {
  const navigate = useNavigate();
  return (
    <div>
      <SectionWrapper>
        <div className="p-10">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {dashboardCards.map((card) => (
              <div
                key={card.id}
                className="bg-gradient-to-r from-blue-100 to-blue-50 shadow-xl rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {card.title}
                </h2>
                <p className="text-gray-700 text-base mb-6">
                  {card.description}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded w-full transition-colors duration-200"
                  onClick={() => navigate(card.path)}
                >
                  Explore {card.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

const dashboardCards = [
  {
    id: 1,
    title: "Lessons",
    description:
      "Access a comprehensive list of lessons available in the system. You can view, organize, and update each lesson with ease.",
    path: "/lessons/content-management",
  },
  {
    id: 2,
    title: "Add Lessons",
    description:
      "Create new lessons for your system by providing all necessary details, including title, description, and associated vocabulary.",
    path: "/lessons/content-management",
  },
  {
    id: 3,
    title: "Add Vocabularies",
    description:
      "Easily add new vocabulary items to any existing lesson. Specify words, their meanings, pronunciations, and when to use them.",
    path: "/lessons/vocabulary",
  },
  {
    id: 4,
    title: "Manage Users",
    description:
      "Handle all user-related tasks, such as assigning roles, promoting or demoting users, and managing their access to resources.",
    path: "/lessons/user-management",
  },
  {
    id: 5,
    title: "Lesson Management",
    description:
      "Take control of lessons with this dedicated page. Oversee their structure, manage content, and ensure everything is up-to-date.",
    path: "/lessons/content-management",
  },
  {
    id: 6,
    title: "Vocabulary Management",
    description:
      "Efficiently manage vocabulary sets for every lesson. Update words, modify details, and keep your lessons enriched with valuable vocabulary.",
    path: "/lessons/vocabulary",
  },
];
