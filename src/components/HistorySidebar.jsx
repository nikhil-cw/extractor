import React from 'react';
import Card from './Card';
import { useHistory } from '../HistoryContext'; // Import useHistory

const HistorySidebar = ({ history, onSelect, selectedHistoryId }) => {
  const { deleteHistoryItem } = useHistory(); // Use the hook

  const handleDelete = (e, id) => {
    e.stopPropagation(); // Prevent triggering onSelect when deleting
    deleteHistoryItem(id);
  };

  return (
    <div className="history-sidebar">
      <Card title="History">
        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <ul>
            {history.map((item) => (
              <li key={item.id} className={selectedHistoryId === item.id ? 'selected' : ''}>
                <a href="#" onClick={() => onSelect(item.id)}>{item.url}</a>
                <button 
                  onClick={(e) => handleDelete(e, item.id)} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#dc2626', 
                    cursor: 'pointer', 
                    marginLeft: 'auto', // Push to the right
                    padding: '5px',
                    fontSize: '1.2em',
                  }}
                  title="Delete history item"
                >
                  &times; {/* Times symbol for a close/delete icon */}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default HistorySidebar;