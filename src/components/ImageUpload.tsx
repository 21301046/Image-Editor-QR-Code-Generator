import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: string | null;
}

export function ImageUpload({ onImageUpload, selectedImage }: ImageUploadProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
        id="imageInput"
      />
      <label
        htmlFor="imageInput"
        className="cursor-pointer flex flex-col items-center"
      >
        <Upload className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-gray-600">Click to upload an image</span>
      </label>
      
      {selectedImage && (
        <div className="mt-6">
          <img
            src={selectedImage}
            alt="Uploaded preview"
            className="max-h-96 mx-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}