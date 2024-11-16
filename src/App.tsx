import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { WelcomeMessage } from './components/WelcomeMessage';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { ImageEditor } from './components/ImageEditor';

function App() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [welcomeText, setWelcomeText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FF6B6B');
  const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient' | 'image'>('solid');
  const [gradientColors, setGradientColors] = useState<[string, string]>(['#FF6B6B', '#4ECDC4']);
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?w=400');

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImages(prev => [...prev, e.target?.result as string]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Image Editor & QR Code Generator</h1>
          <p className="mt-2 text-gray-600">Upload multiple images, add a welcome message, and generate QR codes</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <ImageUploader onImageSelect={handleImageSelect} />

          <WelcomeMessage
            welcomeText={welcomeText}
            onWelcomeTextChange={setWelcomeText}
            backgroundColor={backgroundColor}
            onBackgroundColorChange={setBackgroundColor}
            selectedImage={selectedImages[0]}
            backgroundType={backgroundType}
            onBackgroundTypeChange={setBackgroundType}
            gradientColors={gradientColors}
            onGradientColorsChange={setGradientColors}
            backgroundImage={backgroundImage}
            onBackgroundImageChange={setBackgroundImage}
          />

          <ImageEditor
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            welcomeText={welcomeText}
            backgroundColor={backgroundColor}
            backgroundType={backgroundType}
            gradientColors={gradientColors}
            backgroundImage={backgroundImage}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <QRCodeGenerator />
        </div>
      </div>
    </div>
  );
}

export default App;