import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import ProgressIndicator from '../../components/advertiser/campaign-wizard/ProgressIndicator';
import Step1CampaignType from '../../components/advertiser/campaign-wizard/Step1CampaignType';
import Step2Configure from '../../components/advertiser/campaign-wizard/Step2Configure';
import Step3Review from '../../components/advertiser/campaign-wizard/Step3Review';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    type: null,
    name: '',
    imageFile: null,
    imagePreview: null,
    targetUrl: '',
    budget: '',
    ratePerAction: '',
    currency: 'USDC'
  });

  const updateCampaignData = (updates) => {
    setCampaignData(prev => ({ ...prev, ...updates }));
  };

  const handleSelectType = (type) => {
    updateCampaignData({ type });
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleLaunch = async () => {
    // Simulate launch process
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Campaign launched:', campaignData);
        // Navigate to dashboard after successful launch
        navigate('/advertiser/dashboard');
        resolve();
      }, 2000);
    });
  };

  return (
    <div className="bg-vintage-black min-h-screen">
      <Header walletAddress="0x1a2b3c4d5e6f7890abcdef" />

      <ProgressIndicator currentStep={currentStep} />

      <div className="pb-12">
        {currentStep === 1 && (
          <Step1CampaignType
            selectedType={campaignData.type}
            onSelectType={handleSelectType}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <Step2Configure
            campaignData={campaignData}
            onUpdateData={updateCampaignData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <Step3Review
            campaignData={campaignData}
            onBack={handleBack}
            onLaunch={handleLaunch}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;
