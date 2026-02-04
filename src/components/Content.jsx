import React from 'react';
import Card from './Card';

const Content = ({ data }) => {
  if (!data) return null;

  const logistics = data.logisticsAndDetails || {};

  return (
    <>
      {/* Hero Section */}
      {data.heroImage?.url && (
        <div className="hero-image">
          <img src={data.heroImage.url} alt={data.heroImage.alt || data.tourName} />
        </div>
      )}

      {/* Title & Description */}
      <Card>
        {data.tourName && <h2>{data.tourName}</h2>}

        <div className="meta-badges">
          {logistics.duration && <span className="badge primary">{logistics.duration}</span>}
          {logistics.pricePerPerson && <span className="badge price">{logistics.pricePerPerson}</span>}
          {logistics.difficulty && <span className="badge">{logistics.difficulty}</span>}
          {logistics.groupSize && <span className="badge">Group: {logistics.groupSize}</span>}
        </div>

        {data.description && <p className="description">{data.description}</p>}
      </Card>

      {/* Quick Info */}
      {(logistics.meetingPoint || logistics.bestTimeToVisit || logistics.guideLanguages) && (
        <Card title="Quick Info">
          <div className="info-grid">
            {logistics.meetingPoint && (
              <div className="info-item">
                <strong>Meeting Point</strong>
                <span>{logistics.meetingPoint}</span>
              </div>
            )}
            {logistics.groupSize && (
              <div className="info-item">
                <strong>Group Size</strong>
                <span>{logistics.groupSize}</span>
              </div>
            )}
            {logistics.bestTimeToVisit && (
              <div className="info-item">
                <strong>Best Time</strong>
                <span>{logistics.bestTimeToVisit}</span>
              </div>
            )}
            {logistics.guideLanguages && (
              <div className="info-item">
                <strong>Guide Languages</strong>
                <span>{logistics.guideLanguages}</span>
              </div>
            )}
            {logistics.guideExperience && (
              <div className="info-item">
                <strong>Guide Experience</strong>
                <span>{logistics.guideExperience}</span>
              </div>
            )}
            {logistics.guideCertification && (
              <div className="info-item">
                <strong>Guide Certification</strong>
                <span>{logistics.guideCertification}</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Highlights */}
      {data.highlights?.length > 0 && (
        <Card title="Highlights">
          <ul className="highlight-list">
            {data.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </Card>
      )}

      {/* Destinations */}
      {data.destinations?.length > 0 && (
        <Card title="Destinations">
          {data.destinations.map((d, i) => <span className="badge" key={i}>{d}</span>)}
        </Card>
      )}

      {/* Activities */}
      {data.activities?.length > 0 && (
        <Card title="Activities">
          {data.activities.map((a, i) => <span className="badge" key={i}>{a}</span>)}
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
      {data.itineraries?.length > 0 && (
        <Card title="Itinerary">
          {data.itineraries.map((day, i) => (
            <div className="itinerary-day" key={i}>
              <strong>{day.day}: {day.title}</strong>
              <p>{day.description}</p>
              {(day.accommodation || day.meals) && (
                <small>
                  {day.accommodation && <span>{day.accommodation}</span>}
                  {day.accommodation && day.meals && ' • '}
                  {day.meals && <span>{day.meals}</span>}
                </small>
              )}
            </div>
          ))}
        </Card>
      )}

      {/* Inclusions */}
      {data.inclusions?.length > 0 && (
        <Card title="Inclusions">
          <ul className="inclusion-list">
            {data.inclusions.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Card>
      )}

      {/* Exclusions */}
      {data.exclusions?.length > 0 && (
        <Card title="Exclusions">
          <ul className="exclusion-list">
            {data.exclusions.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </Card>
      )}

      {/* Cancellation Policy */}
      {logistics.cancellationPolicy && (
        <Card title="Cancellation Policy">
          <p>{logistics.cancellationPolicy}</p>
        </Card>
      )}

      {/* FAQs */}
      {data.faqs?.length > 0 && (
        <Card title="FAQs">
          {data.faqs.map((f, i) => (
            <div className="faq" key={i}>
              <strong>{f.question}</strong>
              <span>{f.answer}</span>
            </div>
          ))}
        </Card>
      )}
    </>
  );
};

export default Content;
