import { useState } from 'react';

const AdCreativeDisplay = ({ adCreative, onChangeCreative }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    imageUrl,
    targetUrl,
    format,
    fileSize,
    ipfsHash,
    dimensions
  } = adCreative;

  const handlePreviewClick = () => {
    setShowModal(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ad-creative-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="border-2 border-vintage-white p-6 mb-8">
        {/* Header */}
        <h3 className="font-mono uppercase tracking-wider text-sm mb-6">
          🖼️ Ad Creative
        </h3>

        {/* Ad Preview */}
        <div
          className="border-2 border-vintage-gray-400 p-4 mb-4 text-center cursor-pointer hover:border-vintage-white transition-colors"
          onClick={handlePreviewClick}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Ad Creative"
              className="max-w-full h-auto mx-auto"
              style={{ maxHeight: '300px' }}
            />
          ) : (
            <div className="py-12 text-vintage-gray-600 font-mono text-sm">
              No ad creative uploaded
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="space-y-2 font-mono text-xs mb-6">
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Target URL:</span>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vintage-white hover:underline truncate ml-4"
              style={{ maxWidth: '300px' }}
            >
              {targetUrl}
            </a>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Format:</span>
            <span>{dimensions || format || 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">File Size:</span>
            <span>{fileSize || 'Unknown'}</span>
          </div>
          {ipfsHash && (
            <div className="flex justify-between">
              <span className="text-vintage-gray-600">IPFS Hash:</span>
              <span className="truncate ml-4" style={{ maxWidth: '300px' }}>
                {ipfsHash}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onChangeCreative}
            className="btn-vintage text-xs py-2 px-4"
          >
            Change Creative
          </button>
          <button
            onClick={handlePreviewClick}
            className="btn-vintage text-xs py-2 px-4"
          >
            Preview on Site
          </button>
          <button
            onClick={handleDownload}
            className="btn-vintage text-xs py-2 px-4"
          >
            Download
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-10 right-0 text-vintage-white text-2xl hover:text-vintage-gray-600 transition-colors"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={imageUrl}
              alt="Ad Creative Preview"
              className="max-w-full max-h-screen"
            />

            {/* Preview Context */}
            <div className="mt-4 border-2 border-vintage-white bg-vintage-black p-4 font-mono text-xs">
              <p className="text-vintage-gray-600 mb-2">
                This is how your ad appears on publisher websites
              </p>
              <p className="text-vintage-white">
                When users click, they'll be redirected to: <br />
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {targetUrl}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdCreativeDisplay;
