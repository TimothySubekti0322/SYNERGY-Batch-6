import React from "react";

interface ImageInputProps {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fileName: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  handleFileChange,
  fileName,
}) => {
  return (
    <div className="w-full flex mt-4">
      <p className="mb-0 w-1/5 py-2">
        Foto<span className="text-[#FA2C5A]">*</span>
      </p>
      <div className="grow relative">
        <input
          id="photo"
          type="file"
          name="photo"
          className="w-0 h-0 absolute"
          onChange={handleFileChange}
        />
        <div
          className="w-1/2 h-full flex justify-between items-center border-2 rounded-sm border-[#D0D0D0] px-3 py-2.5 cursor-pointer"
          id="file-container"
        >
          <p className="mb-0 text-[#8A8A8A]" id="file-name">
            {fileName}
          </p>
          <label htmlFor="photo">
            <img src="/images/upload_icon.png" alt="upload button" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
