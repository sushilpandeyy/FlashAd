import { useState } from 'react';

const Step2Category = ({ formData, setFormData, onNext, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(formData.category || '');
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [customCategory, setCustomCategory] = useState(formData.customCategory || '');
  const [customDescription, setCustomDescription] = useState('');

  const categories = [
    {
      id: 'finance',
      icon: '💰',
      name: 'Finance & Crypto',
      description: 'Best for DeFi, trading, Web3 news'
    },
    {
      id: 'gaming',
      icon: '🎮',
      name: 'Gaming & Esports',
      description: 'Best for game reviews, Web3 gaming'
    },
    {
      id: 'nft',
      icon: '🎨',
      name: 'NFT/Art & Metaverse',
      description: 'Best for NFT marketplaces, digital art'
    },
    {
      id: 'news',
      icon: '📰',
      name: 'News & Media',
      description: 'Best for blockchain news'
    },
    {
      id: 'tech',
      icon: '💻',
      name: 'Tech & Development',
      description: 'Best for dev tutorials, coding guides'
    },
    {
      id: 'education',
      icon: '📚',
      name: 'Education & Learning',
      description: 'Best for courses, tutorials'
    },
    {
      id: 'ecommerce',
      icon: '🛍️',
      name: 'E-commerce & Shopping',
      description: 'Best for Web3 marketplaces'
    },
    {
      id: 'marketing',
      icon: '🎯',
      name: 'Marketing & Business',
      description: 'Best for agencies, SaaS'
    },
    {
      id: 'other',
      icon: '⚙️',
      name: 'Other Category',
      description: 'Describe your niche'
    }
  ];

  const handleSelectCategory = (categoryId) => {
    if (categoryId === 'other') {
      setShowOtherModal(true);
    } else {
      setSelectedCategory(categoryId);
      // Auto-continue after selection
      setTimeout(() => {
        setFormData({ ...formData, category: categoryId });
        onNext();
      }, 500);
    }
  };

  const handleOtherSubmit = () => {
    if (customCategory.trim()) {
      setSelectedCategory('other');
      setFormData({
        ...formData,
        category: 'other',
        customCategory: customCategory,
        customDescription: customDescription
      });
      setShowOtherModal(false);
      setTimeout(onNext, 300);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl mb-3">What's Your Website About?</h2>
        <p className="text-vintage-gray-600 font-mono text-sm">
          Help advertisers find the right audience
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleSelectCategory(category.id)}
            className={`border-2 p-6 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${
              selectedCategory === category.id
                ? 'border-blue-400 bg-blue-900 bg-opacity-10 border-[3px]'
                : 'border-vintage-gray-400 hover:border-blue-400'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-mono text-sm font-bold mb-2">{category.name}</h3>
              <p className="font-mono text-xs text-vintage-gray-600 mb-4 min-h-[40px]">
                {category.description}
              </p>
              <button
                className={`btn-vintage text-xs py-2 px-4 w-full ${
                  selectedCategory === category.id ? 'bg-blue-400 text-vintage-black' : ''
                }`}
              >
                {selectedCategory === category.id ? '✓ Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Message */}
      <div className="border-2 border-blue-400 bg-blue-900 bg-opacity-10 p-4 mb-8">
        <div className="flex items-start gap-3 font-mono text-sm">
          <div>💡</div>
          <div>
            <strong>Why does this matter?</strong><br />
            <span className="text-vintage-gray-600">
              Advertisers target specific niches. The right category helps you get more relevant ads and higher earnings.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="btn-vintage px-8 py-3">
          ← Back
        </button>
        <button
          onClick={() => {
            if (selectedCategory) {
              setFormData({ ...formData, category: selectedCategory });
              onNext();
            }
          }}
          disabled={!selectedCategory}
          className={`btn-vintage-inverse px-8 py-3 ${
            !selectedCategory ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue →
        </button>
      </div>

      {/* Other Category Modal */}
      {showOtherModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-md w-full">
            <h3 className="font-mono text-lg mb-4">⚙️ Describe Your Website</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-mono text-xs mb-2">Category Name:</label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g., Healthcare, Travel"
                  className="input-vintage w-full"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-mono text-xs mb-2">Brief Description:</label>
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="What topics do you cover?"
                  className="input-vintage w-full h-24 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowOtherModal(false)}
                className="btn-vintage text-xs py-2 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleOtherSubmit}
                disabled={!customCategory.trim()}
                className={`btn-vintage-inverse text-xs py-2 px-4 flex-1 ${
                  !customCategory.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2Category;
