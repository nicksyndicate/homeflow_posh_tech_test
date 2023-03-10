import { FaBookmark } from 'react-icons/fa';

function PropertyCard({ property, toggleSave, isSaved }) {
  const stabImage = '/img/mock_700x450.png';
  const imageSrc = property.photos[0] ? `https://mr0.homeflow.co.uk/${property.photos[0]}` : stabImage;

  // if image exists in data response, but server responses 404
  const handleError = (event) => event.target.src = stabImage;
  const handleClick = () => toggleSave(property.property_id);

  return (
    <div className="border-2 bg-gray-50">
      <div className="relative">
        <img src={imageSrc} alt={property.display_address} onError={ handleError } />

        <button className="absolute top-0 right-2" title="Click to bookmark this property" onClick={ handleClick }>
          <FaBookmark className={`${!isSaved ? 'text-yellow-400' : 'text-red-400'}`} size="40" />
        </button>

        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">{property.price}</p>
      </div>

      <div className="px-3 py-2">
        <p>{property.display_address}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
