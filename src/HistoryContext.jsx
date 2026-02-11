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

  // Set selected item on initial load or if history changes
  useEffect(() => {
    if (history.length > 0 && !selectedHistoryId) {
      setSelectedHistoryId(history[0].id);
    } else if (history.length === 0) {
      setSelectedHistoryId(null);
    } else if (selectedHistoryId && !history.some(item => item.id === selectedHistoryId)) {
      // If selected item was deleted, select the latest one
      setSelectedHistoryId(history[0].id);
    }
  }, [history, selectedHistoryId]);

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

  const deleteHistoryItem = (idToDelete) => {
    setHistory(prevHistory => {
      const updatedHistory = prevHistory.filter(item => item.id !== idToDelete);
      return updatedHistory;
    });
    // The useEffect above will handle updating selectedHistoryId if the deleted item was selected
  };

  const getHistoryItem = (id) => history.find(item => item.id === id);

  const selectHistoryItem = (id) => setSelectedHistoryId(id);

  const selectedData = selectedHistoryId ? getHistoryItem(selectedHistoryId)?.data : null;

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, deleteHistoryItem, selectedData, selectHistoryItem, selectedHistoryId }}>
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
