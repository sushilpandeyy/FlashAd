import { useState } from 'react';
import ProgressIndicator from '../../components/publisher/onboarding/ProgressIndicator';
import Step1WebsiteUrl from '../../components/publisher/onboarding/Step1WebsiteUrl';
import Step2Category from '../../components/publisher/onboarding/Step2Category';
import Step3Traffic from '../../components/publisher/onboarding/Step3Traffic';
import Step4WalletConnect from '../../components/publisher/onboarding/Step4WalletConnect';
import RegistrationSuccess from '../../components/publisher/onboarding/RegistrationSuccess';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    websiteUrl: '',
    category: '',
    customCategory: '',
    customDescription: '',
    trafficTier: '',
    pageViews: '',
    walletAddress: null
  });

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-vintage-black">
      {/* Logo Header */}
      <div className="border-b-2 border-vintage-gray-400 py-4">
        <div className="container mx-auto px-4">
          <div className="font-serif text-2xl">FlashAd</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {currentStep <= 4 && (
          <ProgressIndicator currentStep={currentStep} totalSteps={4} />
        )}

        {/* Step Content with Animation */}
        <div className="animate-fadeIn">
          {currentStep === 1 && (
            <Step1WebsiteUrl
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <Step2Category
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <Step3Traffic
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
            <Step4WalletConnect
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <RegistrationSuccess formData={formData} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-vintage-gray-400 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="font-mono text-xs text-vintage-gray-600">
            Need help? <span className="text-blue-400 underline cursor-pointer">Contact Support</span> or{' '}
            <span className="text-blue-400 underline cursor-pointer">View Documentation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
