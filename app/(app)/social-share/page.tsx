"use client"
import React , {useState, useEffect, useRef} from 'react'

import { CldImage } from 'next-cloudinary';

const socialFormats = {
    "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
    "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
    "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
    "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
    "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
    "LinkedIn Square Post (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
    "LinkedIn Article Banner (1200:627)": { width: 1200, height: 627, aspectRatio: "1200:627" },
    "LinkedIn Profile Picture (400:400)": { width: 400, height: 400, aspectRatio: "1:1" },
    "YouTube Thumbnail (16:9)": { width: 1280, height: 720, aspectRatio: "16:9" },
    "YouTube Channel Cover (2560:1440)": { width: 2560, height: 1440, aspectRatio: "16:9" },
    "YouTube Profile Picture (1:1)": { width: 800, height: 800, aspectRatio: "1:1" }
  };

type SocialFormat = keyof typeof socialFormats

export default  function SocialShare() {


    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    //search about this one useRef hook 
    const imageRef = useRef<HTMLImageElement>(null);

    // useeffect hook if image ka formaat is changed 
    useEffect(()=>{
      if(uploadedImage){
        setIsTransforming(true)
      }
    }, [selectedFormat, uploadedImage])
    //to handel file upload 
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // since user can select multiple files we get first one we do [0]
        const file = event.target.files?.[0];
        if(!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData
            })

            if(!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setUploadedImage(data.publicId);


        } catch (error) {
            console.log(error)
            alert("Failed to upload image");
        } finally{
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        if(!imageRef.current) return;

        fetch(imageRef.current.src)
        .then((response) => response.blob())
        //what should be name of file
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            // this remove child method is raw js stuff not recommended to use in react as it interfares with virtual dom tree will find better way to di it later 
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        })
    }
    return (
            <head>
        <title>Welcome to Crop-Comp-File</title>
        <meta name="description" content="This is website which lets you crop images, remove their background and compress the video with " />
        <meta name="keywords" content="Compression, nextjs , Crop, background remove , clerk, cloudinary"/>
        <div className="container mx-auto p-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Social Media Image Creator
          </h1>

          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Upload an Image</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Choose an image file</span>
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="file-input file-input-bordered file-input-primary w-full"
                />
              </div>

              {isUploading && (
                <div className="mt-4">
                  <progress className="progress progress-primary w-full"></progress>
                </div>
              )}

              {uploadedImage && (
                <div className="mt-6">
                  <h2 className="card-title mb-4">Select Social Media Format</h2>
                  <div className="form-control">
                    <select
                      className="select select-bordered w-full"
                      value={selectedFormat}
                      onChange={(e) =>
                        setSelectedFormat(e.target.value as SocialFormat)
                      }
                    >
                      {Object.keys(socialFormats).map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6 relative">
                    <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                    <div className="flex justify-center">
                      {isTransforming && (
                        <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                          <span className="loading loading-spinner loading-lg"></span>
                        </div>
                      )}
                      <CldImage
                        width={socialFormats[selectedFormat].width}
                        height={socialFormats[selectedFormat].height}
                        src={uploadedImage}
                        sizes="100vw"
                        alt="transformed image"
                        crop="fill"
                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                        gravity='auto'
                        ref={imageRef}
                        onLoad={() => setIsTransforming(false)}
                        />
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button className="btn btn-primary" onClick={handleDownload}>
                      Download for {selectedFormat}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </head>
      );
}

 

// import React , {useState, useEffect, useRef} from 'react'

// import { CldImage } from 'next-cloudinary';


// export default function BgRemove() {
//     const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//     const [isTransforming, setIsTransforming] = useState(false);
//     const [isUploading, setIsUploading] = useState(false);
//     const imageref = useRef<HTMLImageElement>(null)

//     useEffect(()=>{
//         if (isUploading) {
//             setIsTransforming(true)
//         }
//     },[uploadedImage])

//     const handleFileUpload= async(e: React.ChangeEvent<HTMLInputElement>)=>{
//         const file = e.target.files?.[0]
//         if (!file) {
//             return
//         }
//         setIsUploading(true)
//         const formData = new FormData()
//         formData.append("file", file)
//         try {
//             const response = await fetch ("/api/image-upload",{
//                 method:"POST",
//                 body:formData
//             })
//             if (!response.ok) {
//                throw new Error("failed to upload image") 
//             }
//             const data = await response.json()
//             setUploadedImage(data.publicId)
//         } catch (error) {
//             console.log(error);
//             alert("failed to upload ")
//         }
//         finally{
//             setIsUploading(false)
//         }
//     }

//     const handleDownload = () => {
//         if(!imageref.current) return;

//         fetch(imageref.current.src)
//         .then((response) => response.blob())
//         //what should be name of file
//         .then((blob) => {
//             const url = window.URL.createObjectURL(blob)
//             const link = document.createElement("a");
//             link.href = url;
//             link.download = `${"bg_removed"
//           .replace(/\s+/g, "_")
//           .toLowerCase()}.png`;
//             document.body.appendChild(link);
//             link.click();
//             // this remove child method is raw js stuff not recommended to use in react as it interfares with virtual dom tree will find better way to di it later 
//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(url);
//             document.body.removeChild(link);
//         })
//     }

//     return(
//         <div className='container mx-auto p-4 max-w-4xl'>
//             <h1 className='text-3xl font-bold mb-6 text-center'>Background Remover</h1>
//             <div className='card'>
//                 <div className='card-body'>
//                     <h2 className='card-title mb-4'>Upload an Image</h2>
//                     <div className='form-control'>
//                         <label className='label'>
//                             <span className='label-text'>Choose an Image to Upload </span>
//                         </label>
//                         <input 
//                         type="file" 
//                         onChange={handleFileUpload}
//                         className='file-input file-input-bordered file-input-primary w-full'
//                         />
//                         {isUploading && (
//                             <div>
//                                 <progress className="progress progress-primary w-full"></progress>
//                             </div>
//                         )}
//                         {uploadedImage && (
//                         <div className='mt-6'>
//                             <div className='flex justify-between items-center mb-4'>
//                                 <h2 className='text-xl font-semibold'>Result</h2>
//                                 <button 
//                                     onClick={handleDownload}
//                                     className='btn btn-primary'
//                                     disabled={isTransforming}
//                                 >
//                                     Download Image
//                                 </button>
//                             </div>
//                         </div>
//                         )}
//                         <div className='mt-6 relative'>
//                             <h2>Preview:</h2>
//                             <div className='flex justify-center'>
//                                 {isTransforming && (
//                                     <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
//                                         <span className="loading loading-spinner loading-lg"></span>
//                                     </div>
//                                 )}
//                                 <CldImage
//                                 width={960}
//                                 height={600}
//                                 src={uploadedImage}
//                                 ref={imageref}
//                                 onLoad={() => setIsTransforming(false)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )






// }