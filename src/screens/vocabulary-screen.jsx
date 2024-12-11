import { useState } from "react";
import SectionWrapper from "../components/common/section-wrapper";

export default function VocabularyScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SectionWrapper>
        <div className="bg-gray-100 min-h-screen p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Japanese Vocabulary
          </h1>
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
                    <tr className="font-extralight text-gray-500">
                      <th>{x.id}</th>
                      <td>{x.word}</td>
                      <td>{x.meaning}</td>
                      <td>{x.pronunciation}</td>
                      <td className="text-xs">{x.whenToSay}</td>
                      <td>{x.lessonNo}</td>
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
