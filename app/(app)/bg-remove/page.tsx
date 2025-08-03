 "use client"

import React, { useState, useEffect, useRef } from 'react'
import { CldImage } from 'next-cloudinary';


export default function BgRemove() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isTransforming, setIsTransforming] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (isUploading) {
            setIsTransforming(true);
        }
    }, [uploadedImage]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                throw new Error("Failed to upload image");
            }
            const data = await response.json();
            setUploadedImage(data.publicId);
        } catch (error) {
            console.log(error);
            alert("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };
const handleDownload = async () => {
  if (!imageRef.current) return;

  try {
    // Fetch the image directly from Cloudinary with CORS
    const response = await fetch(imageRef.current.src, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `bg_removed_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanig up the image 
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 0);
    
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download image. Please try again.");
  }
};

    return (
        
        <div className='container mx-auto p-4 max-w-4xl'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Background Remover</h1>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='card-title mb-4'>Upload an Image</h2>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Choose an Image to Upload</span>
                        </label>
                        <input 
                            type="file" 
                            onChange={handleFileUpload}
                            className='file-input file-input-bordered file-input-accent w-full'
                            accept="image/*"
                        />
                        {isUploading && (
                            <div className="mt-2">
                                <progress className="progress progress-primary w-full"></progress>
                                <p className="text-center mt-1">Uploading...</p>
                            </div>
                        )}
                    </div>

                    {uploadedImage && (
                        <div className='mt-6'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-semibold'>Result</h2>
                                <button 
                                    onClick={handleDownload}
                                    className='btn btn-accent'
                                    disabled={isTransforming}
                                >
                                    Download Image
                                </button>
                            </div>
                            
                            <div className='relative border rounded-lg overflow-hidden'>
                                {isTransforming && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                                        <span className="loading loading-bars loading-xl"></span>
                                        <span className="ml-2">Processing...</span>
                                    </div>
                                )}
                                <CldImage
                                    width={960}
                                    height={600}
                                    src={uploadedImage}
                                    ref={imageRef}
                                    removeBackground
                                    onLoad={() => setIsTransforming(false)}
                                    alt="Processed image"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    
    );
}