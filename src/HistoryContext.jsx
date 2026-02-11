import React, { createContext, useState, useEffect, useContext } from 'react';

const HistoryContext = createContext();

const LOCAL_STORAGE_KEY = 'extracted_data_history';

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Failed to read history from local storage:", error);
      return [];
    }
  });

  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to write history to local storage:", error);
    }
  }, [history]);

  const addHistoryItem = (url, data) => {
    const newId = Date.now().toString(); // Unique ID for each history item
    const newItem = { id: newId, url, timestamp: new Date().toISOString(), data };

    setHistory(prevHistory => {
      // Remove existing item with the same URL, if any (rewriting history)
      const filteredHistory = prevHistory.filter(item => item.url !== url);
      return [newItem, ...filteredHistory]; // Add new item to the top
    });
    setSelectedHistoryId(newId); // Select the newly added item
  };

  const getHistoryItem = (id) => history.find(item => item.id === id);

  const selectHistoryItem = (id) => setSelectedHistoryId(id);

  const selectedData = selectedHistoryId ? getHistoryItem(selectedHistoryId)?.data : null;

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, selectedData, selectHistoryItem, selectedHistoryId }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
