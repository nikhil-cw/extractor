import React from 'react';
import Card from './Card';
import DetailCard from './DetailCard';

const Content = ({ data }) => {
  if (!data) return null;

  // Fields to be explicitly rendered
  const renderedFields = new Set([
    "heroImage",
    "tourName",
    "meta",
    "info",
    "overview",
    "destinations",
    "activities",
    "images",
    "itineraries",
    "inclusions",
    "exclusions",
    "faqs",
    "slug", // Can be used for URL, not explicitly displayed as a card
    "other", // From the example, it's just a cookie message, not for display
  ]);

  return (
    <>
      {/* Hero Section */}
      {data.heroImage?.url && (
        <div className="hero-image">
          <img src={data.heroImage.url} alt={data.heroImage.alt || data.tourName} />
        </div>
      )}

      {/* Tour Name & Meta */}
      {(data.tourName || data.meta?.label || data.meta?.excerpt) && (
        <Card>
          {data.tourName && <h2>{data.tourName}</h2>}
          {data.meta?.label && <h3>{data.meta.label}</h3>}
          {data.meta?.excerpt && <p className="description">{data.meta.excerpt}</p>}
        </Card>
      )}

      {/* Info Section (Duration, Age Range, Difficulty) */}
      {(data.info?.duration || data.info?.ageRange || data.info?.difficulty) && (
        <Card title="Quick Info">
          <div className="info-grid">
            {data.info?.duration && (
              <div className="info-item">
                <strong>Duration</strong>
                <span>{data.info.duration}</span>
              </div>
            )}
            {data.info?.ageRange && (
              <div className="info-item">
                <strong>Age Range</strong>
                <span>{data.info.ageRange}</span>
              </div>
            )}
            {data.info?.difficulty && (
              <div className="info-item">
                <strong>Difficulty</strong>
                <span>{data.info.difficulty}</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Overview */}
      {data.overview && (
        <Card title="Overview">
          <div dangerouslySetInnerHTML={{ __html: data.overview }} />
        </Card>
      )}

      {/* Destinations */}
      {data.destinations?.length > 0 && (
        <Card title="Destinations">
          {data.destinations.map((d, i) => (
            <span className="badge" key={i}>{d}</span>
          ))}
        </Card>
      )}

      {/* Activities */}
      {data.activities?.length > 0 && (
        <Card title="Activities">
          {data.activities.map((a, i) => (
            <span className="badge" key={i}>{a}</span>
          ))}
        </Card>
      )}

      {/* Gallery */}
      {data.images?.length > 0 && (
        <Card title="Gallery">
          <div className="grid">
            {data.images.map((img, i) => (
              <img src={img.url} alt={img.alt || `Image ${i + 1}`} key={i} />
            ))}
          </div>
        </Card>
      )}

      {/* Itinerary */}
      {data.itineraries?.items?.length > 0 && (
        <Card title={data.itineraries.title || "Itinerary"}>
          {data.itineraries.items.map((day, i) => (
            <div className="itinerary-day" key={i}>
              <strong>{day.day}: {day.title}</strong>
              <div dangerouslySetInnerHTML={{ __html: day.description }} />
              {day.meals && <small>Meals: {day.meals}</small>}
            </div>
          ))}
        </Card>
      )}

      {/* Inclusions */}
      {data.inclusions?.items?.length > 0 && (
        <Card title={data.inclusions.title || "Inclusions"}>
          <ul className="inclusion-list">
            {data.inclusions.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </Card>
      )}

      {/* Exclusions */}
      {data.exclusions?.items?.length > 0 && (
        <Card title={data.exclusions.title || "Exclusions"}>
          <ul className="exclusion-list">
            {data.exclusions.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </Card>
      )}

      {/* FAQs */}
      {data.faqs?.items?.length > 0 && (
        <Card title={data.faqs.title || "FAQs"}>
          {data.faqs.items.map((f, i) => (
            <div className="faq" key={i}>
              <strong>{f.question}</strong>
              <div dangerouslySetInnerHTML={{ __html: f.answer }} />
            </div>
          ))}
        </Card>
      )}

      {/* Render unknown/other fields dynamically */}
      {Object.keys(data).map((key) => {
        if (!renderedFields.has(key)) {
          return <DetailCard key={key} title={key} content={data[key]} />;
        }
        return null;
      })}
    </>
  );
};

export default Content;