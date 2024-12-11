import React from "react";

const videoData = [
  {
    id: 1,
    title: "60 Japanese Words for Everyday Life - Basic Vocabulary #3",
    description:
      "his series, we will teach you the core 800 Japanese words that you must know if you're a an absolute beginnerWith each new episodes in this series, we’ll include the previous lessons at the end.",
    embedLink: "https://www.youtube.com/embed/FCtHKQk2Dc0",
  },
  {
    id: 2,
    title: "80 Japanese Words for Everyday Life - Basic Vocabulary #4",
    description:
      "In this series, we will teach you the core 800 Japanese words that you must know if you're a an absolute beginnerWith each new episodes in this series, we’ll include the previous lessons at the end.",
    embedLink: "https://www.youtube.com/embed/EK4YZPd7XE8",
  },
  {
    id: 3,
    title:
      "Body Parts in Japanese | からだのパーツ】face/かお, body/からだ, mouth/くち, hand/てvocabulary",
    description:
      "You will learn different parts of the body with body parts pictures , English and Japanese. I read each words twice. The first time is normal and second is slower. ",
    embedLink: "https://www.youtube.com/embed/j6YuhK6T5f4",
  },
  {
    id: 4,
    title: "Japanese Vocabulary & Phrases | 40 Things You See Outside",
    description:
      "Whenever I want perfect enunciation and fairly easy to digest sentences, I come here !!! Plus Tanaka's radio voice is sooo soothing for my soul ",
    embedLink: "https://www.youtube.com/embed/YxHMFaz2_6w",
  },
  {
    id: 5,
    title: "100 Informal Japanese Phrases for Beginner",
    description: "100 Informal Japanese Phrases for Beginner",
    embedLink: "https://www.youtube.com/embed/ogqeb9TLO8A",
  },
];

const TutorialScreen = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-8 bg-gray-50">
      {videoData.map((video) => (
        <div
          key={video.id}
          className="bg-white shadow-md hover:shadow-lg rounded-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
        >
          <div className="relative w-full h-48">
            <iframe
              className="w-full h-full rounded-t-xl"
              src={video.embedLink}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 mt-3">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TutorialScreen;
