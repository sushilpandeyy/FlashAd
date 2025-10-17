const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Campaign Type' },
    { number: 2, label: 'Configure' },
    { number: 3, label: 'Review & Launch' }
  ];

  return (
    <div className="border-b-2 border-vintage-white py-6 px-6 mb-8">
      <h2 className="text-xl font-mono uppercase tracking-wider mb-6 text-center">
        Create New Campaign
      </h2>

      <div className="flex items-center justify-center max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 border-2 flex items-center justify-center font-mono text-sm transition-all ${
                  step.number < currentStep
                    ? 'bg-vintage-white text-vintage-black border-vintage-white'
                    : step.number === currentStep
                    ? 'bg-vintage-white text-vintage-black border-vintage-white'
                    : 'bg-transparent text-vintage-gray-600 border-vintage-gray-600'
                }`}
              >
                {step.number < currentStep ? '✓' : step.number}
              </div>
              <span
                className={`mt-2 text-xs font-mono ${
                  step.number <= currentStep ? 'text-vintage-white' : 'text-vintage-gray-600'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 -mt-8">
                <div
                  className={`h-full transition-all ${
                    step.number < currentStep ? 'bg-vintage-white' : 'bg-vintage-gray-600'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
