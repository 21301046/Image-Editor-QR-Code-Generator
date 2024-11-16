import React from 'react';
import { Palette, Image as ImageIcon, Paintbrush } from 'lucide-react';

interface WelcomeMessageProps {
  welcomeText: string;
  onWelcomeTextChange: (text: string) => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  selectedImage: string | null;
  backgroundType: 'solid' | 'gradient' | 'image';
  onBackgroundTypeChange: (type: 'solid' | 'gradient' | 'image') => void;
  gradientColors: [string, string];
  onGradientColorsChange: (colors: [string, string]) => void;
  backgroundImage: string;
  onBackgroundImageChange: (url: string) => void;
}

export function WelcomeMessage({
  welcomeText,
  onWelcomeTextChange,
  backgroundColor,
  onBackgroundColorChange,
  selectedImage,
  backgroundType,
  onBackgroundTypeChange,
  gradientColors,
  onGradientColorsChange,
  backgroundImage,
  onBackgroundImageChange,
}: WelcomeMessageProps) {
  if (!selectedImage) return null;

  const predefinedColors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9B786F',
    '#A8E6CF',
    '#FFD3B6',
    '#FF8B94',
  ];

  const predefinedGradients = [
    ['#FF6B6B', '#4ECDC4'],
    ['#A8E6CF', '#FFD3B6'],
    ['#FF8B94', '#4ECDC4'],
    ['#96CEB4', '#FFEEAD'],
    ['#D4A5A5', '#9B786F'],
  ];

  const predefinedBackgroundImages = [
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
    'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=400',
    'https://img.freepik.com/free-vector/copy-space-bokeh-spring-lights-background_52683-55649.jpg?semt=ais_hybrid',
  ];

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Add Your Welcome Message
      </h3>
      <div className="space-y-4">
        <textarea
          value={welcomeText}
          onChange={(e) => onWelcomeTextChange(e.target.value)}
          placeholder="Enter your welcome message here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24 resize-none"
        />

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => onBackgroundTypeChange('solid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                backgroundType === 'solid'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Palette className="w-4 h-4" />
              Solid
            </button>
            <button
              onClick={() => onBackgroundTypeChange('gradient')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                backgroundType === 'gradient'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Paintbrush className="w-4 h-4" />
              Gradient
            </button>
            <button
              onClick={() => onBackgroundTypeChange('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                backgroundType === 'image'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Image
            </button>
          </div>

          {backgroundType === 'solid' && (
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onBackgroundColorChange(color)}
                    className={`w-full h-8 rounded-md transition-transform hover:scale-105 ${
                      backgroundColor === color
                        ? 'ring-2 ring-offset-2 ring-indigo-500'
                        : ''
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="w-full h-10 cursor-pointer rounded-lg"
              />
            </div>
          )}

          {backgroundType === 'gradient' && (
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {predefinedGradients.map(([color1, color2], index) => (
                  <button
                    key={index}
                    onClick={() => onGradientColorsChange([color1, color2])}
                    className="w-full h-8 rounded-md transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(to right, ${color1}, ${color2})`,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={gradientColors[0]}
                  onChange={(e) =>
                    onGradientColorsChange([e.target.value, gradientColors[1]])
                  }
                  className="w-1/2 h-10 cursor-pointer rounded-lg"
                />
                <input
                  type="color"
                  value={gradientColors[1]}
                  onChange={(e) =>
                    onGradientColorsChange([gradientColors[0], e.target.value])
                  }
                  className="w-1/2 h-10 cursor-pointer rounded-lg"
                />
              </div>
            </div>
          )}

          {backgroundType === 'image' && (
            <div className="space-y-4">
              <input
                type="text"
                value={backgroundImage}
                onChange={(e) => onBackgroundImageChange(e.target.value)}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-3 gap-2">
                {predefinedBackgroundImages.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => onBackgroundImageChange(url)}
                    className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 ring-indigo-500"
                  >
                    <img
                      src={url}
                      alt={`Background ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
