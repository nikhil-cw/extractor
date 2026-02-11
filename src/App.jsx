import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Content from './components/Content';
import HistorySidebar from './components/HistorySidebar';
import TokenUsageDisplay from './components/TokenUsageDisplay'; // Import TokenUsageDisplay
import { useHistory } from './HistoryContext';

const API_URL = "/api/tour/content-extraction/extract"; // Corrected API_URL

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

      // Add the full JSON response data to history
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
      <div className="container search-container"> {/* Container for search bar */}
        <Search url={url} setUrl={setUrl} fetchData={fetchData} disabled={loading} />
      </div>

      <div className="app-layout">
        <HistorySidebar history={history} onSelect={handleSelectHistoryItem} selectedHistoryId={selectedHistoryId} />
        
        <div className="main-content-area"> {/* New container for main content and token sidebar */}
          <div className="container">
            {loading && <div className="loading">Extracting content…</div>}
            {error && <div className="error">{error}</div>}
            
            <div className="content-display-area"> {/* Flex container for content and token usage */}
              <Content data={selectedData?.extracted || {}} url={selectedData?.url || url} /> {/* Ensure data and url are always objects/strings */}
              {selectedData?.tokenUsage && (
                <div className="token-usage-sidebar">
                  <TokenUsageDisplay data={selectedData.tokenUsage} /> {/* Use TokenUsageDisplay */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;