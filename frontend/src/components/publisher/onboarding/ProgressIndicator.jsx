const ProgressIndicator = ({ currentStep, totalSteps = 4 }) => {
  const steps = [
    { number: 1, label: 'Website' },
    { number: 2, label: 'Category' },
    { number: 3, label: 'Traffic' },
    { number: 4, label: 'Connect' }
  ];

  return (
    <div className="border-b-2 border-vintage-gray-400 pb-8 mb-8">
      <h1 className="text-center font-serif text-2xl mb-2">Register Your Website</h1>
      <div className="flex items-center justify-center gap-4 mt-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-sm transition-all ${
                  step.number < currentStep
                    ? 'bg-green-400 border-green-400 text-vintage-black'
                    : step.number === currentStep
                    ? 'bg-blue-400 border-blue-400 text-vintage-black'
                    : 'bg-vintage-black border-vintage-gray-400 text-vintage-gray-600'
                }`}
              >
                {step.number < currentStep ? '✓' : step.number}
              </div>
              <div
                className={`mt-2 font-mono text-xs ${
                  step.number === currentStep
                    ? 'text-vintage-white font-bold'
                    : 'text-vintage-gray-600'
                }`}
              >
                {step.label}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mb-6 transition-all ${
                  step.number < currentStep
                    ? 'bg-green-400'
                    : 'bg-vintage-gray-400'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
