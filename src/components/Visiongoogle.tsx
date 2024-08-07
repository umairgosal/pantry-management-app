'use client'
import { useEffect } from 'react';
import { getServar } from '../utils/Vision.getServar';
import React from "react"
// import { filePath } from './cam';


interface VisiongoogleProps {
  text?: string;
  error?: string;
}
interface Proptype {
  filePath: string
}
let res: string | undefined;
let myArray: string[];

const Visiongoogle = ({filePath}: Proptype) => {
  useEffect(()=>{
    res = getDataFromServer();
  }, []);

  const getDataFromServer = () => {
    console.log("filepath in tsx", filePath)
    const textDataa = getServar(filePath);
    textDataa.then((value)=>{
      res = value;
      // console.log(res)
      })
      return res;
    }

    if(res != undefined){
      myArray = res.split('\\n');
      console.log("myArray",myArray);
    }
  // console.log(textDataa)
  // if(error) {
  //   return <div>Error: {error}</div>
  // }
  return(
    <div>
      {/* <p className='text-black'>{res}</p> */}
      {/* {res ? (
        <p>Extracted Text: {res}</p>
        ) : (
        <p>Loading...</p>
      // )} */}
    </div>
  )
}

export default Visiongoogle
export { res } 