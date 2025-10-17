const Step1CampaignType = ({ selectedType, onSelectType, onNext }) => {
  const campaignTypes = [
    {
      id: 'CPM',
      icon: '$',
      title: 'CPM',
      subtitle: 'Cost Per Mille',
      description: '(per 1000 views)',
      benefits: ['Brand Awareness', 'Maximum Reach', 'Predictable Cost'],
      pricing: 'Avg: $2-5 per 1K'
    },
    {
      id: 'CPC',
      icon: '↗',
      title: 'CPC',
      subtitle: 'Cost Per Click',
      description: '(per click)',
      benefits: ['Direct Response', 'Action-Focused', 'ROI Tracking'],
      pricing: 'Avg: $0.25-1.00 each'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif mb-3">Choose Your Campaign Type</h2>
        <p className="text-vintage-gray-600 font-mono text-sm">
          Select how you want to pay for advertising
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {campaignTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => onSelectType(type.id)}
            className={`border-2 p-8 cursor-pointer transition-all hover:border-vintage-white hover:bg-vintage-gray-200 ${
              selectedType === type.id
                ? 'border-vintage-white bg-vintage-gray-200'
                : 'border-vintage-gray-400'
            }`}
          >
            {/* Icon */}
            <div className="text-5xl mb-4 text-center">{type.icon}</div>

            {/* Title */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-mono uppercase tracking-wider mb-1">{type.title}</h3>
              <p className="font-serif text-lg">{type.subtitle}</p>
              <p className="font-mono text-xs text-vintage-gray-600">{type.description}</p>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              {type.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <span className="text-vintage-white">✓</span>
                  <span className="font-mono text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="text-center py-3 border-t border-vintage-gray-400">
              <p className="font-mono text-sm text-vintage-gray-600">{type.pricing}</p>
            </div>

            {/* Selected indicator */}
            {selectedType === type.id && (
              <div className="mt-4 text-center">
                <button className="btn-vintage-inverse text-xs py-2 px-6">
                  Selected
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="border border-vintage-gray-400 p-4 mb-8">
        <p className="font-mono text-sm">
          <span className="text-vintage-white">💡</span> Not sure which to choose?
          CPM is best for brand visibility, CPC for conversions.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onNext}
          disabled={!selectedType}
          className={`btn-vintage-inverse px-8 py-3 ${
            !selectedType ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Step1CampaignType;
