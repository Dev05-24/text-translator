import { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import Dropdown from "./Components/Dropdown";
import languages from "./Components/LanguageOption";

const Translator = () => {
  const [textInput, setTextInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextTranslation = async () => {
    if (!textInput || !selectValue) return;
    setLoading(true);

    try {
      const options = {
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "x-rapidapi-key":
            "252d5dca39msh38cfa3c14d5fa38p107894jsn2aabb3a25f12",
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          q: textInput,
          source: "en",
          target: selectValue,
          format: "text",
        },
      };

      const response = await axios.request(options);
      setResult(
        response?.data?.data?.translations?.[0]?.translatedText ||
          "Translation error"
      );
    } catch (error) {
      console.error("Translation Error : ", error);
      setResult("Translation failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#b36321]">
      <div className=" w-full max-w-5xl bg-white/90 shadow-md shadow-[#e3a775fe] rounded-lg p-8 flex flex-col gap-6">
        <div className="flex justify-center items-center gap-3">
          <p className="text-4xl">🌍</p>
          <h1
            className="text-3xl
          sm:text-4xl text-center
          text-[#b36321] underline underline-offset-7 font-extrabold mb-3"
          >
            Text Translator
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <textarea
            value={textInput}
            className="w-full h-32 rounded-lg text-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b36321] transition-all duration-300 shadow-md font-semibold bg-white"
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text..."
          />

          <textarea
            value={result}
            className="w-full h-32 border border-gray-300 rounded-lg text-lg p-3 focus:outline-none bg-white shadow-md font-semibold"
            placeholder="Translation will appear here..."
            readOnly
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label
            htmlFor="options"
            className="text-lg font-semibold text-gray-800"
          >
            Convert Into:{" "}
          </label>
          <Dropdown
            options={languages}
            onChange={(e) => setSelectValue(e.target.value)}
          />
        </div>

        <button
          onClick={handleTextTranslation}
          className="w-full bg-[#b36321] text-white text-xl cursor-pointer font-bold p-3 rounded-xl flex items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-105"
        >
          {loading ? <Loader className="animate-spin" /> : "Translate"}
        </button>
      </div>
    </div>
  );
};
export default Translator;
