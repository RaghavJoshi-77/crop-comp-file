"use client"
import axios from "axios"
import { CldVideoPlayer } from "next-cloudinary"
import { useState } from "react"
import { saveAs } from 'file-saver'

export default function VideoSub() {
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [watermarkImage, setWatermarkImage] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadResult, setUploadResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    
    const MAX_VIDEO_SIZE = 80 * 1024 * 1024 // 80 MB
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5 MB

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!videoFile || !watermarkImage) {
            setError("Please select both video and image files")
            return
        }
        
        if (videoFile.size > MAX_VIDEO_SIZE) {
            setError(`Video file exceeds the maximum size of ${MAX_VIDEO_SIZE / (1024 * 1024)} MB`)
            return
        }
        
        if (watermarkImage.size > MAX_IMAGE_SIZE) {
            setError(`Image file exceeds the maximum size of ${MAX_IMAGE_SIZE / (1024 * 1024)} MB`)
            return
        }   
        
        setIsUploading(true)
        const formData = new FormData()
        formData.append("video", videoFile)
        formData.append("image", watermarkImage)

        try {
            const response = await axios.post("/api/add-logo", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 300000, // 5 minutes timeout for large files
            })
            
            console.log(response.data)
            
            if (response.status === 200 && response.data.success) {
                setUploadResult(response.data)
                setError(null)
                alert("Files uploaded successfully")
            } else {
                setError(response.data.error || "Failed to upload files")
            }
        } catch (error: any) {
            console.error("Upload error:", error)
            
            if (error.code === 'ECONNABORTED') {
                setError("Upload timeout - file too large or connection too slow")
            } else if (error.response) {
                setError(error.response.data.error || `Upload failed with status ${error.response.status}`)
            } else if (error.request) {
                setError("Network error - please check your connection")
            } else {
                setError("An unexpected error occurred")
            }
        } finally {
            setIsUploading(false)
        }
    }

    const handleDownload = async () => {
        if (!uploadResult?.downloadUrl && !uploadResult?.videoUrl) {
            setError('No video available to download')
            return
        }

        try {
            const downloadUrl = uploadResult.downloadUrl || uploadResult.videoUrl;
            const filename = `watermarked-video-${Date.now()}.mp4`;
            
            // Try direct download first
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Fallback to saveAs
            // saveAs(downloadUrl, filename);
        } catch (error) {
            console.error("Download error:", error);
            setError("Failed to download video");
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Upload Video with Watermark</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 font-medium">
                        Video File (max 80MB):
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {videoFile && (
                        <p className="text-sm text-gray-600 mt-1">
                            Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </p>
                    )}
                </div>
                
                <div>
                    <label className="block mb-2 font-medium">
                        Watermark Image (max 5MB):
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setWatermarkImage(e.target.files?.[0] || null)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {watermarkImage && (
                        <p className="text-sm text-gray-600 mt-1">
                            Selected: {watermarkImage.name} ({(watermarkImage.size / (1024 * 1024)).toFixed(2)} MB)
                        </p>
                    )}
                </div>
                
                <button
                    type="submit"
                    disabled={isUploading}
                    className={`px-4 py-2 rounded text-white ${
                        isUploading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isUploading ? 'Processing... This may take a while' : 'Upload Video with Watermark'}
                </button>
            </form>
            
            {uploadResult && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Upload Result</h2>
                    <div className="mb-4">
                        <CldVideoPlayer
                            width="100%"
                            height="auto"
                            src={uploadResult.publicId}
                            controls
                        />
                    </div>
                    <div className="flex gap-4 items-center flex-wrap">
                        <div className="flex items-center">
                            <strong>Watermark used:</strong>
                            <img 
                                src={uploadResult.watermarkUrl} 
                                alt="Watermark" 
                                className="h-12 inline-block ml-2 border"
                            />
                        </div>
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Download Video
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}