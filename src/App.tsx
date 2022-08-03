import React, { useState, useEffect} from 'react';
import './App.css';
import * as AWS from 'aws-sdk';
require('dotenv').config()
import Card from './Component/Card';


function App() {
  const [fichier, setFichier] = useState<any>("");
  const [file, setFile] = useState<any>(null)
  const [dataList, setDataList] = useState<any>()
  const [source, setSource] = useState<any>()

  const previewFile = (event: any) => {
    setFile(event.target.files[0])

    const reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    
    reader.addEventListener("load", function () {
      setFichier(reader.result)
    }, false);   
  }

  const DetectFaces = (imageData: ArrayBuffer) => {
    AWS.config.region = process.env.REACT_CREDENTIAL_REGION; 
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId:  `${process.env.REACT_CREDENTIAL_IDENTITY}`,
    
    });
    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
        Bytes: imageData
      },
      Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err, data) {
      if (err) {
      }
      else {
        setDataList(data.FaceDetails)
      }
    });
  };

useEffect(() => {
  //  files
}, [fichier]);

useEffect(() => {
 if(file){
  const read = new FileReader();
  read.readAsDataURL(file)
  read.addEventListener('load', function(){
    setSource(read.result);
  })
 } 
 

}, [file])  

  return (
  <>
    <input id='fileToUpload' type="file" accept='image/*' onChange={(e)=>{previewFile(e); }} />
    <div className='contenaire'> <br />
      <div className='photo'>
        <img src={source} alt="" id='img' />
      </div>
      {dataList?
        <Card datas={dataList}></Card> : ""
      }
        <Card/>
    </div>
  </>
  );
}

export default App;