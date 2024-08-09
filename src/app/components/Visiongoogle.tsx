'use client'
import { useEffect, useState } from 'react';
<<<<<<< HEAD:src/app/components/Visiongoogle.tsx
import { getServar } from '../../utils/Vision.getServar';
import React from "react"
// import { filePath } from './cam';

=======
import { getServar } from '../utils/Vision.getServar';
import React from "react";
>>>>>>> fcf584d (camera component refactor):src/components/Visiongoogle.tsx

interface VisiongoogleProps {
  filePath: string;
  fileType: Boolean;
  onTextGenerated: (text: string) => void;
}

const Visiongoogle: React.FC<VisiongoogleProps> = ({ filePath, fileType, onTextGenerated }) => {
  useEffect(() => {
    if (filePath) {
      getDataFromServer();
    }
  }, [filePath]);

  const getDataFromServer = async () => {
    try {
      const textData = await getServar(filePath, fileType);
      if (textData) {
        const cleanedTextGenerated = textData.replace(/^["']|["']$/g, ''); // Removes leading and trailing quotes
        onTextGenerated(cleanedTextGenerated);
      }
    } catch (error) {
      console.error("Error fetching data from server:", error);
      onTextGenerated("Error generating text from image.");
    }
  };

  return <></>;
};

export default Visiongoogle;
