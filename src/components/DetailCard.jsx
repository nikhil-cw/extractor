import React from 'react';
import Card from './Card';

const renderContent = (content) => {
  if (content === null || content === undefined) {
    return <em>N/A</em>;
  }

  if (typeof content === 'string' || typeof content === 'number' || typeof content === 'boolean') {
    // Check if the string contains HTML tags
    if (typeof content === 'string' && /<[a-z][\s\S]*>/i.test(content)) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content.toString();
  }

  if (Array.isArray(content)) {
    if (content.length === 0) {
      return <em>(Empty List)</em>;
    }
    return (
      <ul>
        {content.map((item, index) => (
          <li key={index}>
            {renderContent(item)}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof content === 'object') {
    const keys = Object.keys(content);
    if (keys.length === 0) {
      return <em>(Empty Object)</em>;
    }
    return (
      <dl>
        {keys.map((key, index) => (
          <React.Fragment key={index}>
            <dt><strong>{key}:</strong></dt>
            <dd>{renderContent(content[key])}</dd>
          </React.Fragment>
        ))}
      </dl>
    );
  }

  return <em>(Unsupported Type)</em>;
};

const DetailCard = ({ title, content }) => {
  return (
    <Card title={title}>
      {renderContent(content)}
    </Card>
  );
};

export default DetailCard;
