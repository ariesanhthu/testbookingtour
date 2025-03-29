// 'use client';
//  
// import * as React from 'react';
// import { useEdgeStore } from '@/lib/edgestore';
//  import { useState } from "react";

// export default function Page() {
//   const [file, setFile] = React.useState<File>();
//   const { edgestore } = useEdgeStore();

//   const [urls, setUrls] = useState<
//     string  | undefined
//   >();
//  
//   return (
//     <div>
//       <input
//         type="file"
//         onChange={(e) => {
//           setFile(e.target.files?.[0]);
//         }}
//       />
//       <button
//         onClick={async () => {
//           if (file) {
//             const res = await edgestore.publicFiles.upload({
//               file,
//               onProgressChange: (progress) => {
//                 // you can use this to show a progress bar
//                 console.log(progress);
//               },
//             });
//             // you can run some server action or api here
//             // to add the necessary data to your database
//             console.log(res);

//             setUrls(
//                 res.url
//               );
//           }
//         }}
//       >
//         Upload
//       </button>
//         <div>
//             {urls ? (
//             <img src={urls} alt="uploaded image" />
//             ) : null}
//         </div>
//     </div>
//   );
// }

// -------------------------------------
'use client';

import {
  MultiImageDropzone,
  type FileState,
} from '@/app/components/uploadFile/MultiImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

export default function MultiImageDropzoneUsage() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  const [urls, setUrls] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  if (isSubmitted) {
    return <div className="flex flex-col items-center m-6">COMPLETE!!!</div>;
  }
  if (isCancelled) {
    return <div className="flex flex-col items-center m-6">CANCELLED!!!</div>;
  }


  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  

  return (
    <div className='my-10 h-full w-full'>

      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload(
                  {
                  file: (addedFileState.file as File),
                  options:{
                    temporary: true
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });

                setUrls((prev) => [...prev, res.url]);
                console.log(res);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
 <button
              className="bg-white text-black rounded px-3 py-1 hover:opacity-80"
              onClick={async () => {
                for (const url of urls) {
                  await edgestore.publicFiles.confirmUpload({
                    url,
                  });
                }
                setIsSubmitted(true);
              }}
            >
              Submit
            </button>
    </div>
  );
}