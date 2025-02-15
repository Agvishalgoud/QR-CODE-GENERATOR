import React, { useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Link2, FileText, Download, RefreshCw } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('url');

  async function generateQR(value) {
    if (!value) return;
    
    setIsLoading(true);
    try {
      const url = await QRCode.toDataURL(value, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000',
          light: '#fff',
        },
      });
      setQrUrl(url);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
    setIsLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    generateQR(text);
  }

  function downloadQR() {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="flex-grow max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <QrCode className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">QR Code Generator</h1>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('url')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                mode === 'url'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Link2 className="w-4 h-4" />
              URL
            </button>
            <button
              onClick={() => setMode('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                mode === 'text'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Text
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                {mode === 'url' ? 'Enter URL' : 'Enter Text'}
              </label>
              <input
                type={mode === 'url' ? 'url' : 'text'}
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={mode === 'url' ? 'https://example.com' : 'Enter your text here'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <QrCode className="w-5 h-5" />
                  Generate QR Code
                </>
              )}
            </button>
          </form>

          {qrUrl && (
            <div className="mt-8 space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center shadow-md">
                <img src={qrUrl} alt="QR Code" className="max-w-full hover:scale-105 transition" />
              </div>
              <button
                onClick={downloadQR}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer (Sticky at Bottom) */}
      <footer className="text-center text-sm font-bold text-gray-600 p-4 mt-auto bg-gray-100 shadow-inner">
        DEVELOPED BY AG VISHAL GOUD
      </footer>
    </div>
  );
}

export default App;
