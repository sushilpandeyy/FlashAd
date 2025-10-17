import { useParams } from 'react-router-dom';

const CampaignDetails = () => {
  const { campaignId } = useParams();

  return (
    <div>
      <h1>Campaign Details</h1>
      <p>Campaign ID: {campaignId}</p>
    </div>
  );
};

export default CampaignDetails;
