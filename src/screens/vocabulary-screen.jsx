import { useState } from "react";
import SectionWrapper from "../components/common/section-wrapper";
import Modal from "../components/common/modal";
import { logout, user_info } from "../components/common/custom-hook";
import { useNavigate } from "react-router-dom";

export default function VocabularyScreen() {
  const user = user_info();
  const navigation = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentWord = data[currentIndex];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const [isOpenSlide, setOpenSlide] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSpeak = (letter) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = "ja-JP"; // Japanese
    window.speechSynthesis.speak(utterance);
  };

  if(!user) {
    logout();
    navigation("/")
  }

  return (
    <div>
      <SectionWrapper>
        
          <div className="flex justify-end space-x-4">
            {/*slide modal*/}
            <button
              className="btn btn-info btn-outline"
              onClick={() => setOpenSlide(true)}
            >
              Open Slider
            </button>
            {/* Add Vocabulary Section */}
            {user.role === 1 && <button
              className="btn btn-success btn-outline"
              onClick={() => navigation("/lessons/dashboard")}
            >
              Add Vocabulary
            </button>}
            
          </div>
        

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-gray-600 text-lg">
                  <th>#</th>
                  <th>Word</th>
                  <th>Meaning</th>
                  <th>pronunciation</th>
                  <th>whenToSay</th>
                  <th>lessonNo</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((x) => {
                  return (
                    <tr className="font-extralight text-gray-500" key={x.id}>
                      <th>{x.id}</th>
                      <td>{x.word}</td>
                      <td>{x.meaning}</td>
                      <td>{x.pronunciation}</td>
                      <td className="text-xs">{x.whenToSay}</td>
                      <td>{x.lessonNo}</td>
                      {user.role === 1 && (
                        <td className="flex justify-center items-center space-x-2">
                          {/* Edit Button */}
                          <button
                            className="btn btn-sm btn-accent"
                            onClick={() => {}}
                          >
                            Edit
                          </button>

                          {/* Delete Button */}
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => {}}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
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
      {/* modal is here */}
      <Modal
        isOpen={isOpenSlide}
        title="Learning Japanese Vocabulary"
        onClose={() => setOpenSlide(false)}
      >
        <div>
          <div className="p-6 flex flex-col items-center ">
            <div className="rounded-lg w-full max-w-md p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                {currentWord.word}
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <span className="font-semibold">Meaning:</span>{" "}
                  {currentWord.meaning}
                </p>
                <p>
                  <span className="font-semibold">Pronunciation:</span>{" "}
                  {currentWord.pronunciation}
                </p>
                <p>
                  <span className="font-semibold">When to Say:</span>{" "}
                  {currentWord.whenToSay}
                </p>
                <p>
                  <span className="font-semibold">Lesson Number:</span>{" "}
                  {currentWord.lessonNo}
                </p>
              </div>
              <button
                onClick={() => handleSpeak(currentWord.word)}
                className="btn btn-success btn-outline mt-20"
              >
                {currentWord.meaning}
              </button>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                className={`btn ${
                  currentIndex === 0 ? "btn-disabled" : "btn-primary"
                }`}
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                className={`btn ${
                  currentIndex === data.length - 1
                    ? "btn-disabled"
                    : "btn-primary"
                }`}
                onClick={handleNext}
                disabled={currentIndex === data.length - 1}
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

const data = [
  {
    id: 1,
    word: "こんにちは",
    meaning: "Hello",
    pronunciation: "Konnichiwa",
    whenToSay:
      "Used for greeting in the afternoon or general polite greetings.",
    lessonNo: 1,
  },
  {
    id: 2,
    word: "さようなら",
    meaning: "Goodbye",
    pronunciation: "Sayounara",
    whenToSay: "Used for saying goodbye, especially in formal contexts.",
    lessonNo: 1,
  },
  {
    id: 3,
    word: "ありがとう",
    meaning: "Thank you",
    pronunciation: "Arigatou",
    whenToSay: "Used to express gratitude or say 'thank you'.",
    lessonNo: 2,
  },
  {
    id: 4,
    word: "いくら",
    meaning: "How much?",
    pronunciation: "Ikura",
    whenToSay: "Used to ask for the price of something.",
    lessonNo: 3,
  },
  {
    id: 5,
    word: "おはよう",
    meaning: "Good morning",
    pronunciation: "Ohayou",
    whenToSay: "Used for greeting in the morning, informally.",
    lessonNo: 1,
  },
  {
    id: 6,
    word: "おやすみ",
    meaning: "Good night",
    pronunciation: "Oyasumi",
    whenToSay: "Used before going to bed or saying goodnight.",
    lessonNo: 4,
  },
  {
    id: 7,
    word: "すみません",
    meaning: "Excuse me / Sorry",
    pronunciation: "Sumimasen",
    whenToSay: "Used to apologize or get someone's attention politely.",
    lessonNo: 2,
  },
  {
    id: 8,
    word: "はい",
    meaning: "Yes",
    pronunciation: "Hai",
    whenToSay: "Used to agree or affirm.",
    lessonNo: 1,
  },
  {
    id: 9,
    word: "いいえ",
    meaning: "No",
    pronunciation: "Iie",
    whenToSay: "Used to disagree or decline.",
    lessonNo: 1,
  },
  {
    id: 10,
    word: "お元気ですか",
    meaning: "How are you?",
    pronunciation: "Ogenki desu ka",
    whenToSay: "Used to ask about someone's well-being.",
    lessonNo: 3,
  },
  {
    id: 11,
    word: "お願いします",
    meaning: "Please",
    pronunciation: "Onegaishimasu",
    whenToSay: "Used to politely request something.",
    lessonNo: 2,
  },
  {
    id: 12,
    word: "どこ",
    meaning: "Where?",
    pronunciation: "Doko",
    whenToSay: "Used to ask about a location.",
    lessonNo: 3,
  },
  {
    id: 13,
    word: "誰",
    meaning: "Who?",
    pronunciation: "Dare",
    whenToSay: "Used to ask about a person.",
    lessonNo: 3,
  },
  {
    id: 14,
    word: "何",
    meaning: "What?",
    pronunciation: "Nani",
    whenToSay: "Used to ask for information.",
    lessonNo: 3,
  },
  {
    id: 15,
    word: "いつ",
    meaning: "When?",
    pronunciation: "Itsu",
    whenToSay: "Used to ask about time.",
    lessonNo: 3,
  },
  {
    id: 16,
    word: "どうぞ",
    meaning: "Here you go / Please",
    pronunciation: "Douzo",
    whenToSay: "Used when offering something politely.",
    lessonNo: 4,
  },
  {
    id: 17,
    word: "どうも",
    meaning: "Thanks / Hello",
    pronunciation: "Doumo",
    whenToSay: "Used for casual thanks or greetings.",
    lessonNo: 4,
  },
  {
    id: 18,
    word: "ちょっと待って",
    meaning: "Wait a moment",
    pronunciation: "Chotto matte",
    whenToSay: "Used to ask someone to wait briefly.",
    lessonNo: 5,
  },
  {
    id: 19,
    word: "いらっしゃいませ",
    meaning: "Welcome",
    pronunciation: "Irasshaimase",
    whenToSay: "Used by staff to greet customers in shops or restaurants.",
    lessonNo: 5,
  },
  {
    id: 20,
    word: "おめでとう",
    meaning: "Congratulations",
    pronunciation: "Omedetou",
    whenToSay: "Used to congratulate someone.",
    lessonNo: 6,
  },
];
