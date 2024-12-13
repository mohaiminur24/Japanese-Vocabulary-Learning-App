import { useNavigate } from "react-router-dom";
import { user_info } from "./custom-hook";

export default function ErrorScreen() {
  const navigation = useNavigate();
  const user = user_info();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl text-gray-700 mt-4">Oops! Page Not Found</p>
        <p className="mt-2 text-gray-500">
          It seems the page you are looking for does not exist.
        </p>
        <button
          onClick={() =>
            navigation(user.role === 2 ? "/lessons" : "/lessons/dashboard")
          }
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back Home
        </button>
        <div className="mt-8">
          <img
            src="https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_p6kb2m6b185b1.png"
            alt="Error Illustration"
            className="mx-auto w-32 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
