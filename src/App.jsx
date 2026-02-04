import React, { useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Content from './components/Content';

const API_URL = "/api/builder/content-extraction/extract";

const App = () => {
  const [url, setUrl] = useState("https://www.alpineramble.com/trip/annapurna-base-camp-trek");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const json = await res.json();
      if (!json.success) throw new Error("Extraction failed");

      setData(json.data.extracted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Search url={url} setUrl={setUrl} fetchData={fetchData} disabled={loading} />
        {loading && <div className="loading">Extracting content…</div>}
        {error && <div className="error">{error}</div>}
        <Content data={data} />
      </div>
    </>
  );
};

export default App;