"use client"
import React, { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { error } from 'console'



export default function VideoUpload() {

  const [title,setTitle] = useState("")
  const [file , setFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  
  const router = useRouter()

  //to define max file size 
  const MAX_FILE_SIZE = 80 * 1024 * 1024

  const handelSubmit = async (e:React.FormEvent) =>{
    e.preventDefault()
    if (!file) {
      return 
    }
    if (MAX_FILE_SIZE < file.size) {
      alert ("file is beyond the size of 80 mb")
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("orignalSize", file.size.toString())

    try {
      const response = await axios.post("/api/video-upload", formData)
      console.log(response);
      if (response.status != 200) {
        return "file upoload response failed"
      }
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setIsUploading(false)
    }
  }

  return (
           <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handelSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Video File</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
      );
  
}
