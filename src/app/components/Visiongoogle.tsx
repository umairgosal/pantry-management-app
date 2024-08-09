'use client'
import { useEffect, useState } from 'react';
import { getServar } from '../../utils/Vision.getServar';
import React from "react"
// import { filePath } from './cam';


interface VisiongoogleProps {
  text?: string;
  error?: string;
}
interface Proptype {
  filePath: string
  fileType: Boolean
}
let res: string | undefined;
let myArray: string[];
let ress: string | undefined;

const Visiongoogle = ({filePath, fileType}: Proptype) => {
  if(filePath != null){
    useEffect(()=>{
      const resltfrmserver = getDataFromServer();
      resltfrmserver.then((value)=>{
        res = value;
      })
    }, []);
  }

  const getDataFromServer = async () => {
    const textDataa = getServar(filePath, fileType);
    await textDataa.then((value)=>{
      ress = value;
    })
    // if(ress != undefined){
      //   myArray = ress.split('\\n');
      //   console.log("myArray",myArray);
      // }
      console.log("ress:"+ress)
      return ress;
    }
  return(
    <>
    </>
  );
}

export default Visiongoogle
export { res } 