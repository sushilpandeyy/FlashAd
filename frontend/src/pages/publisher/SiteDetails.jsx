import { useParams } from 'react-router-dom';

const SiteDetails = () => {
  const { siteId } = useParams();

  return (
    <div>
      <h1>Site Details</h1>
      <p>Site ID: {siteId}</p>
    </div>
  );
};

export default SiteDetails;
