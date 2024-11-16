import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, Plus, X } from 'lucide-react';

interface ImageEditorProps {
  selectedImages: string[];
  setSelectedImages: (images: string[]) => void;
  welcomeText: string;
  backgroundColor: string;
  backgroundType: 'solid' | 'gradient' | 'image';
  gradientColors: [string, string];
  backgroundImage: string;
}

export function ImageEditor({
  selectedImages,
  setSelectedImages,
  welcomeText,
  backgroundColor,
  backgroundType,
  gradientColors,
  backgroundImage,
}: ImageEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case 'solid':
        return { backgroundColor };
      case 'gradient':
        return {
          background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        };
      case 'image':
        return {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      default:
        return { backgroundColor };
    }
  };

  const handleDownload = async () => {
    if (editorRef.current) {
      try {
        const dataUrl = await toPng(editorRef.current, {
          quality: 1,
          pixelRatio: 2,
          width: editorRef.current.scrollWidth,
          height: editorRef.current.scrollHeight,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }
        });
        const link = document.createElement('a');
        link.download = 'edited-images.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error downloading image:', err);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages([...selectedImages, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  if (selectedImages.length === 0) return null;

  return (
    <div className="space-y-4">
      <div
        ref={editorRef}
        className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden space-y-4 bg-white p-4"
        style={{
          minWidth: '800px',
          width: '100%',
        }}
      >
        {/* Welcome Message Container */}
        <div 
          className="w-full p-4 mb-4"
          style={getBackgroundStyle()}
        >
          <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg mx-auto max-w-2xl">
            <p className="text-2xl font-medium text-gray-800 break-words text-center">
              {welcomeText || 'Welcome!'}
            </p>
          </div>
        </div>

        {/* Images Container */}
        <div className="space-y-6">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20 opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-auto object-contain relative rounded-lg shadow-lg"
                style={{
                  maxHeight: '800px'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors cursor-pointer hover:shadow-md">
          <Plus className="w-5 h-5" />
          Add More Images
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors hover:shadow-md"
        >
          <Download className="w-5 h-5" />
          Download Combined Image
        </button>
      </div>
    </div>
  );
}