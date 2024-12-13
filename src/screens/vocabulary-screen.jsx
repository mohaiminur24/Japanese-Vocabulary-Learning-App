import { useEffect, useState } from "react";
import SectionWrapper from "../components/common/section-wrapper";
import Modal from "../components/common/modal";
import { logout, user_info } from "../components/common/custom-hook";
import { useNavigate } from "react-router-dom";
import {
  useDeleteVocabulary,
  useGetVocabulary,
} from "../react-query/vocabulary";
import Loading from "../components/common/loading";
import Swal from "sweetalert2";
import { useGetLessons } from "../react-query/lessons";
import Confetti from "react-confetti";

export default function VocabularyScreen() {
  const user = user_info();
  const vocabulary = useGetVocabulary();
  const navigation = useNavigate();
  const [isOpenSlide, setOpenSlide] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 5;
  const [currentLessons, setCurrentLessons] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const deleteVocabulary = useDeleteVocabulary();
  const lessons = useGetLessons();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (vocabulary?.data) {
      const pages = Math.ceil(vocabulary.data.length / lessonsPerPage);
      setTotalPages(pages);
      const startIndex = (currentPage - 1) * lessonsPerPage;
      const newLessons = vocabulary.data.slice(
        startIndex,
        startIndex + lessonsPerPage
      );
      setCurrentLessons(newLessons);
    }
  }, [vocabulary.data, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSpeak = (letter) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = "ja-JP"; // Japanese
    window.speechSynthesis.speak(utterance);
  };

  const handleDeleteVocabulary = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteVocabulary.mutateAsync(data);
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "sorry!",
            text: "something went wrong",
            icon: "error",
          });
        }
      }
    });
  };

  if (!user) {
    logout();
    navigation("/");
  }

  const handleFilter = (id) => {
    const filter = vocabulary.data.filter((x) => x.lessonNo == id);
    setCurrentLessons(filter);
  };

  const handleComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      setIsComplete(false);
    }, 6000);
  };

  if (vocabulary.isLoading || lessons.isLoading) return <Loading />;

  return (
    <div>
      {isComplete && <Confetti />}
      <SectionWrapper>
        <div className="flex justify-end space-x-4">
          <button
            className="btn btn-info btn-outline"
            onClick={() => setOpenSlide(true)}
          >
            Open Slider
          </button>
          {user.role === 1 && (
            <>
              <button
                className="btn btn-success btn-outline"
                onClick={() => navigation("/lessons/add-vocabulary")}
              >
                Add Vocabulary
              </button>
              <select
                id="lessonSelect"
                className="border border-gray-300 bg-transparent rounded px-4 py-2"
                onChange={(event) => handleFilter(event.target.value)}
              >
                <option defaultChecked value="">
                  filter by lesson name
                </option>
                {lessons.data.map((x) => {
                  return <option value={x._id}>{x.title}</option>;
                })}
              </select>
            </>
          )}
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-gray-600 text-lg">
                  <th>#</th>
                  <th>Word</th>
                  <th>Meaning</th>
                  <th>Pronunciation</th>
                  <th>When To Say</th>
                  <th>Lesson No</th>
                </tr>
              </thead>
              <tbody>
                {currentLessons.map((x, index) => (
                  <tr className="font-extralight text-gray-500" key={x._id}>
                    <th>{index + 1 + (currentPage - 1) * lessonsPerPage}</th>
                    <td>{x.word}</td>
                    <td>{x.meaning}</td>
                    <td>{x.pronunciation}</td>
                    <td className="text-xs">{x.whenToSay}</td>
                    <td>{x.lessonNo}</td>
                    {user.role === 1 && (
                      <td className="flex justify-center items-center space-x-2">
                        <button
                          className="btn btn-sm btn-accent"
                          onClick={() =>
                            navigation(`/lessons/updateVocabulary/${x._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleDeleteVocabulary(x)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </SectionWrapper>
      {/* Modal */}
      <Modal
        isOpen={isOpenSlide}
        title="Learning Japanese Vocabulary"
        onClose={() => setOpenSlide(false)}
      >
        <div>
          <div className="p-6 flex flex-col items-center">
            <div className="rounded-lg w-full max-w-md p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                {currentLessons[currentIndex]?.word}
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <span className="font-semibold">Meaning:</span>{" "}
                  {currentLessons[currentIndex]?.meaning}
                </p>
                <p>
                  <span className="font-semibold">Pronunciation:</span>{" "}
                  {currentLessons[currentIndex]?.pronunciation}
                </p>
                <p>
                  <span className="font-semibold">When to Say:</span>{" "}
                  {currentLessons[currentIndex]?.whenToSay}
                </p>
                <p>
                  <span className="font-semibold">Lesson Number:</span>{" "}
                  {currentLessons[currentIndex]?.lessonNo}
                </p>
              </div>
              <div>
                <button
                  onClick={() =>
                    handleSpeak(currentLessons[currentIndex]?.word)
                  }
                  className="btn btn-success btn-outline mt-4"
                >
                  Speak
                </button>
                <button
                  onClick={handleComplete}
                  className="btn btn-accent btn-outline animate-pulse mt-4 ml-10"
                >
                  Complete
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                className={`btn ${
                  currentIndex === 0 ? "btn-disabled" : "btn-primary"
                }`}
                onClick={() => {
                  setCurrentIndex(currentIndex - 1);
                }}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                className={`btn ${
                  currentIndex === currentLessons.length - 1
                    ? "btn-disabled"
                    : "btn-primary"
                }`}
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                }}
                disabled={currentIndex === currentLessons.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
