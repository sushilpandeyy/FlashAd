const ProcessingModal = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Preparing transaction...' },
    { id: 2, label: 'Waiting for wallet approval...' },
    { id: 3, label: 'Confirming on blockchain...' },
    { id: 4, label: 'Transferring funds...' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return { icon: '✅', label: 'Complete', color: 'text-green-400' };
    if (stepId === currentStep) return { icon: '⏳', label: 'In Progress', color: 'text-yellow-400' };
    return { icon: '⏸️', label: 'Pending', color: 'text-vintage-gray-600' };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-vintage-black border-2 border-vintage-white p-8 max-w-lg w-full">
        <h3 className="font-mono text-lg uppercase tracking-wider mb-6 text-center">
          💫 Processing Withdrawal...
        </h3>

        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 border-4 border-vintage-gray-400 border-t-green-400 rounded-full animate-spin"></div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            return (
              <div
                key={step.id}
                className="flex items-center justify-between font-mono text-sm"
              >
                <span className="text-vintage-white">{step.label}</span>
                <span className={`${status.color} flex items-center gap-2`}>
                  <span>{status.icon}</span>
                  <span className="text-xs">{status.label}</span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Message */}
        <div className="border-t-2 border-vintage-gray-400 pt-6 text-center">
          <p className="font-mono text-sm text-vintage-white mb-2">
            Please confirm the transaction in your wallet
          </p>
          <p className="font-mono text-xs text-vintage-gray-600">
            Estimated time: ~10 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;
