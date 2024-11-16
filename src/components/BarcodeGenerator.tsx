import React, { useRef } from 'react';
import { Barcode } from 'lucide-react';
import JsBarcode from 'jsbarcode';

interface BarcodeGeneratorProps {
  barcodeUrl: string;
  onBarcodeUrlChange: (url: string) => void;
}

export function BarcodeGenerator({ barcodeUrl, onBarcodeUrlChange }: BarcodeGeneratorProps) {
  const barcodeRef = useRef<SVGSVGElement>(null);

  const generateBarcode = () => {
    if (barcodeRef.current && barcodeUrl) {
      JsBarcode(barcodeRef.current, barcodeUrl, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Barcode Generator</h2>
        <p className="text-gray-600">Enter a URL or text to generate a barcode</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={barcodeUrl}
          onChange={(e) => onBarcodeUrlChange(e.target.value)}
          placeholder="Enter URL or text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        
        <button
          onClick={generateBarcode}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <Barcode className="w-5 h-5 mr-2" />
          Generate Barcode
        </button>

        <div className="flex justify-center">
          <svg ref={barcodeRef}></svg>
        </div>
      </div>
    </div>
  );
}