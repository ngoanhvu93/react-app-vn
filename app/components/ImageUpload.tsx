import { useState, useRef } from "react";
import { UploadIcon, XIcon } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onFileSelect?: (file: File) => void;
  className?: string;
  required?: boolean;
}

export function ImageUpload({
  label,
  value,
  onChange,
  onFileSelect,
  className = "",
  required = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn file ảnh");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File ảnh không được lớn hơn 5MB");
      return;
    }

    setError("");
    onFileSelect?.(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {value ? (
          <div className="relative group">
            <img
              src={value}
              alt={label}
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              aria-label={`Xóa ảnh ${label}`}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-400 hover:bg-red-50 transition-colors duration-200"
          >
            <UploadIcon className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Nhấn để chọn ảnh</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG (tối đa 5MB)</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
          title={`Chọn ảnh cho ${label}`}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {isUploading && (
        <div className="flex items-center space-x-2 text-sm text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>Đang tải ảnh...</span>
        </div>
      )}
    </div>
  );
}
