import React from 'react';
import Card from './Card'; // Assuming it uses the existing Card component

const TokenUsageDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <Card title="Token Usage Details">
      <div className="token-usage-grid">
        {data.model && <div className="token-item"><strong>Model:</strong> <span>{data.model}</span></div>}
        {data.provider && <div className="token-item"><strong>Provider:</strong> <span>{data.provider}</span></div>}
        {data.inputTokens && <div className="token-item"><strong>Input Tokens:</strong> <span>{data.inputTokens}</span></div>}
        {data.outputTokens && <div className="token-item"><strong>Output Tokens:</strong> <span>{data.outputTokens}</span></div>}
        {data.totalTokens && <div className="token-item total-tokens"><strong>Total Tokens:</strong> <span>{data.totalTokens}</span></div>}
        {data.contextWindow && <div className="token-item"><strong>Context Window:</strong> <span>{data.contextWindow}</span></div>}
        {data.maxOutputTokens && <div className="token-item"><strong>Max Output Tokens:</strong> <span>{data.maxOutputTokens}</span></div>}
        {data.contextUtilization && <div className="token-item"><strong>Context Utilization:</strong> <span>{data.contextUtilization}%</span></div>}
        {data.outputUtilization && <div className="token-item"><strong>Output Utilization:</strong> <span>{data.outputUtilization}%</span></div>}
        {data.inputRate && <div className="token-item"><strong>Input Rate:</strong> <span>{data.inputRate}</span></div>}
        {data.outputRate && <div className="token-item"><strong>Output Rate:</strong> <span>{data.outputRate}</span></div>}
        {data.estimatedCost && <div className="token-item estimated-cost"><strong>Estimated Cost:</strong> <span>{data.estimatedCost} {data.currency}</span></div>}
        
        {/* Render other fields if available and relevant, using DetailCard's approach if needed */}
        {Object.keys(data).map(key => {
            if (!['model', 'provider', 'inputTokens', 'outputTokens', 'totalTokens', 'contextWindow', 'maxOutputTokens', 'contextUtilization', 'outputUtilization', 'inputRate', 'outputRate', 'estimatedCost', 'currency'].includes(key)) {
                return (
                    <div className="token-item" key={key}>
                        <strong>{key}:</strong> <span>{data[key]}</span>
                    </div>
                );
            }
            return null;
        })}
      </div>
    </Card>
  );
};

export default TokenUsageDisplay;