import { useState } from "react";

export const Home = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Hello, Hono with React!</h1>
      <h2 className="text-lg font-bold mb-2">Example of useState()</h2>
      <Counter />
      <h2 className="text-lg font-bold mt-4 mb-2">Example of API fetch()</h2>
      <ClockButton />
    </>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setCount(count + 1)}
    >
      You clicked me {count} times
    </button>
  );
};

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await fetch("/api/clock");
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Get Server Time
      </button>
      {response && <pre className="mt-4">{response}</pre>}
    </div>
  );
};
