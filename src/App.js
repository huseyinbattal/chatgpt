import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 400,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="App">
      <div className="chat">
        <textarea
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write your prompt..."
          className="textarea"
          rows={3}
        ></textarea>

        <button
          onClick={handleClick}
          disabled={loading || prompt.length === 0}
          className={loading || prompt.length === 0 ? "btn-disabled" : "btn"}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      

      </div>
      <div className="result">
        <p>{result}</p>
        </div>

    </main>
  );
}

export default App;
