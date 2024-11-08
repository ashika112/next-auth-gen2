"use client";

import { downloadData, uploadData } from "aws-amplify/storage";
import React, { useState } from "react";

const Storage = () => {
  const [path, setPath] = useState(`folder1/abc.txt`);
  return (
    <div>
      <button
        onClick={async () => {
          const res = uploadData({
            data: "heloooo",
            path: () => path,
            options: {
              bucket: {
                bucketName:
                  "amplify-nextaythgen2-akas-amplifydataamplifycodege-2jq3qrnlne5r ",
                region: "us-east-1",
              },
            },
          });
          console.log("upload", await res.result);
        }}
      >
        Upload
      </button>
      <button
        onClick={async () => {
          const res = downloadData({
            path: () => path,
          });
          console.log("download", await res.result);
        }}
      >
        Download
      </button>
    </div>
  );
};
