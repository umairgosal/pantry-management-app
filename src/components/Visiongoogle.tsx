'use client'
import { useEffect } from 'react';
import { getServar } from '../utils/Vision.getServar';
import React from "react"

interface VisiongoogleProps {
  text?: string;
  error?: string;
}
let res: string | undefined;
let myArray: string[];

const Visiongoogle = () => {
  useEffect(()=>{
    res = getDataFromServer();
  }, []);

  const getDataFromServer = () => {
    const textDataa = getServar();
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
      <p className='text-black'>{res}</p>
      {/* {res ? (
        <p>Extracted Text: {res}</p>
        ) : (
        <p>Loading...</p>
      )} */}
    </div>
  )
}


export default Visiongoogle