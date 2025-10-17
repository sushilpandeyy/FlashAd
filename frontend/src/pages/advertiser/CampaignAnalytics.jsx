import { useParams } from 'react-router-dom';

const CampaignAnalytics = () => {
  const { campaignId } = useParams();

  return (
    <div>
      <h1>Campaign Analytics</h1>
      <p>Campaign ID: {campaignId}</p>
    </div>
  );
};

export default CampaignAnalytics;
