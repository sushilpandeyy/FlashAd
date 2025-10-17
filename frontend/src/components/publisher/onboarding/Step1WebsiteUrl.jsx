import { useState } from 'react';

const Step1WebsiteUrl = ({ formData, setFormData, onNext }) => {
  const [url, setUrl] = useState(formData.websiteUrl || '');
  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState(null);
  const [error, setError] = useState('');

  const validateUrl = async (inputUrl) => {
    setError('');
    setValidating(true);

    try {
      // Basic URL validation
      if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
        throw new Error('URL must start with http:// or https://');
      }

      const urlObj = new URL(inputUrl);

      if (urlObj.hostname === 'localhost' || urlObj.hostname.startsWith('127.')) {
        throw new Error('URL must be publicly accessible (not localhost)');
      }

      // Simulate API validation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock validation success
      setValidation({
        valid: true,
        title: 'Crypto News - Latest Blockchain Updates',
        favicon: '🌐',
        accessible: true
      });

    } catch (err) {
      setError(err.message);
      setValidation(null);
    } finally {
      setValidating(false);
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setValidation(null);
    setError('');
  };

  const handleBlur = () => {
    if (url && url.length > 0) {
      validateUrl(url);
    }
  };

  const handleContinue = () => {
    if (validation && validation.valid) {
      setFormData({ ...formData, websiteUrl: url });
      onNext();
    }
  };

  const isValid = validation && validation.valid;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl mb-3">Add Your Website</h2>
        <p className="text-vintage-gray-600 font-mono text-sm">
          Enter the URL where you'll display ads
        </p>
      </div>

      <div className="mb-6">
        <label className="block font-mono text-sm mb-2">
          Website URL <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          onBlur={handleBlur}
          placeholder="https://"
          className="input-vintage w-full text-lg"
          disabled={validating}
        />
        <div className="font-mono text-xs text-vintage-gray-600 mt-2">
          Example: https://cryptonews.io
        </div>
      </div>

      {/* Validation States */}
      {validating && (
        <div className="border-2 border-blue-400 bg-blue-900 bg-opacity-10 p-4 mb-6">
          <div className="flex items-center gap-3 font-mono text-sm">
            <div className="animate-spin">⏳</div>
            <div>Validating your website...</div>
          </div>
        </div>
      )}

      {error && (
        <div className="border-2 border-red-400 bg-red-900 bg-opacity-10 p-4 mb-6">
          <div className="flex items-center gap-3 font-mono text-sm text-red-400">
            <div>❌</div>
            <div>{error}</div>
          </div>
        </div>
      )}

      {isValid && (
        <div className="border-2 border-green-400 bg-green-900 bg-opacity-10 p-4 mb-6">
          <div className="flex items-center gap-3 font-mono text-sm text-green-400">
            <div>✅</div>
            <div>
              Great! Your site is accessible<br />
              <span className="text-vintage-gray-600">{url} is ready to register</span>
            </div>
          </div>
        </div>
      )}

      {/* Requirements */}
      <div className="border-t-2 border-vintage-gray-400 pt-6 mb-6">
        <h3 className="font-mono text-sm uppercase tracking-wider text-vintage-gray-600 mb-3">
          ✅ Requirements:
        </h3>
        <ul className="space-y-2 font-mono text-sm text-vintage-gray-600">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Must be a valid, publicly accessible website</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>You must own or manage this website</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Site must have regular content updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>No illegal, adult, or harmful content</span>
          </li>
        </ul>
      </div>

      {/* Site Preview */}
      {isValid && (
        <div className="border-t-2 border-vintage-gray-400 pt-6 mb-6">
          <h3 className="font-mono text-sm uppercase tracking-wider text-vintage-gray-600 mb-3">
            📊 Site Preview:
          </h3>
          <div className="border-2 border-vintage-gray-400 p-6 flex items-center gap-4">
            <div className="text-4xl">{validation.favicon}</div>
            <div>
              <div className="font-mono text-sm font-bold mb-1">{validation.title}</div>
              <div className="font-mono text-xs text-vintage-gray-600">{url}</div>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleContinue}
          disabled={!isValid || validating}
          className={`btn-vintage-inverse px-8 py-3 ${
            !isValid || validating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Step1WebsiteUrl;
