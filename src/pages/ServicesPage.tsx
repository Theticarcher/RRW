import React, { useState } from 'react';
import info from '../assets/info.json';
import { ServiceCard } from '../components/services/ServiceCard';

type Service = {
  id: string;
  name: string;
  description?: {
    paragraphs?: string[];
    lists?: (string | null)[][];
  };
};

const ServicePage: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const services = info.services as Service[];

  return (
    <div className="container">
      <h2>Our Packages</h2>

      {/* Service Cards */}
      <div className="services">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            colorClass={`color-${service.id}`} // Add the color class
            onClick={() => setActiveServiceId(service.id)} // Set active service
          />
        ))}
      </div>

      {/* Service Descriptions */}
      <div id="service-details">
        {services.map((service) => {
          const isVisible = service.id === activeServiceId;
          const paragraphs = service.description?.paragraphs || [];
          const lists = service.description?.lists || [];

          return (
            <div
              key={service.id}
              id={service.id}
              className={`service-desc ${isVisible ? 'active' : ''}`} // Use active class to toggle visibility
            >
              {/* 1. First Paragraph */}
              {paragraphs[0] && <p>{paragraphs[0]}</p>}

              {/* 2. First List */}
              {lists[0] && (
                <ul>
                  {lists[0].map((item, i) =>
                    item ? <li key={`l0-${i}`}>{item}</li> : null
                  )}
                </ul>
              )}

              {/* 3. Second Paragraph */}
              {paragraphs[1] && <p>{paragraphs[1]}</p>}

              {/* 4. Second List */}
              {lists[1] && (
                <ul>
                  {lists[1].map((item, i) =>
                    item ? <li key={`l1-${i}`}>{item}</li> : null
                  )}
                </ul>
              )}

              {/* 5. Remaining Paragraphs */}
              {paragraphs.slice(2).map((para, i) => (
                <p key={`p-${i + 2}`}>{para}</p>
              ))}

              {/* 6. Remaining Lists */}
              {lists.slice(2).map((list, i) => (
                <ul key={`ul-${i + 2}`}>
                  {list.map((item, j) =>
                    item ? <li key={`li-${i + 2}-${j}`}>{item}</li> : null
                  )}
                </ul>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicePage;