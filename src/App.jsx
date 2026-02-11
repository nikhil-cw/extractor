import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Content from './components/Content';
import HistorySidebar from './components/HistorySidebar';
import { useHistory } from './HistoryContext';

const API_URL = "/api/tour/content-extraction/extract";

const App = () => {
  const [url, setUrl] = useState("https://www.alpineramble.com/trip/annapurna-base-camp-trek");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addHistoryItem, history, selectedData, selectHistoryItem, selectedHistoryId } = useHistory();

  useEffect(() => {
    // If there's history, set the initial URL to the latest history item's URL
    if (history.length > 0 && !selectedHistoryId) {
      setUrl(history[0].url);
      selectHistoryItem(history[0].id);
    }
  }, [history, selectedHistoryId, selectHistoryItem]);

  const fetchData = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const json = await res.json();
      if (!json.success) throw new Error("Extraction failed");

      // Add the full JSON response data to history, not just extracted
      addHistoryItem(url, json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistoryItem = (id) => {
    const item = history.find(h => h.id === id);
    if (item) {
      setUrl(item.url); // Update search bar with selected history item's URL
      selectHistoryItem(id);
    }
  };

  return (
    <>
      <Header />
      <div className="app-layout"> {/* New div for layout */}
        <HistorySidebar history={history} onSelect={handleSelectHistoryItem} selectedHistoryId={selectedHistoryId} />
        <div className="main-content">
          <div className="container">
            <Search url={url} setUrl={setUrl} fetchData={fetchData} disabled={loading} />
            {loading && <div className="loading">Extracting content…</div>}
            {error && <div className="error">{error}</div>}
            {/* Pass selectedData to Content */}
            <Content data={selectedData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;