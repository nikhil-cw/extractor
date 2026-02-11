import React from 'react';
import Card from './Card';

const HistorySidebar = ({ history, onSelect, selectedHistoryId }) => {
  return (
    <div className="history-sidebar">
      <Card title="History">
        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <ul>
            {history.map((item) => (
              <li key={item.id} onClick={() => onSelect(item.id)} className={selectedHistoryId === item.id ? 'selected' : ''}>
                <a href="#">{item.url}</a>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default HistorySidebar;