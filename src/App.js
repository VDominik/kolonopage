import './App.css';
import { createClient } from "@supabase/supabase-js";
import QRCode from "qrcode";
import React, { useState, useEffect } from 'react';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import image5 from './image5.png';

const supabaseUrl = 'https://eeqyelxcdbfzmecbzofh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcXllbHhjZGJmem1lY2J6b2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NDQ1NTksImV4cCI6MjAyMzMyMDU1OX0.kvpIhHj901jd2z7jpSTaq6c0NLcZdpnBR64Z66_C78w';
const supabase = createClient(supabaseUrl, supabaseKey);


function App() {
  const [text, setUrl] = useState('');
  const [qrcode, setQRcode] = useState('');

  const createQRCode = async (event) => {
    event.preventDefault();
    try {
      QRCode.toDataURL(text, (err, text) => {
        if (err) return console.log(err)
        console.log(text)
        setQRcode(text)
      })
      console.log(text)
    } catch (error) {
      console.error("Error uploading image to Supabase:", error);
    }
  };

  useEffect(() => {
    const incrementVisitCount = async () => {
      try {
      const { data, error } = await supabase.from('visits').select('visits');
      let counter = data[0].visits;
      counter++;
      const { error: updateError } = await supabase
        .from('visits')
        .update({ visits: counter })
        .eq('visits', data[0].visits);
        console.log(counter);
        console.log(data[0].visits);

      if (error) {
        console.error('Error updating visit count:', error);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    };

    incrementVisitCount();
  }, []);

  return (
    // <div className="App">
    //       <input type="text" placeholder="Enter data to encode" value={text} onChange={(evt) => setUrl(evt.target.value)}></input>
    //       {/* <input type="file" id="imageUpload" ref={imageUpload}></input> */}
    //       <button onClick={createQRCode}>Generate QR Code</button>
    //     <img src={qrcode} alt=''/>
    // </div>
    <div className="App">
    <img src={image1} alt="image1" />
    <img src={image2} alt="image2" />
    <img src={image3} alt="image3" />
    <img src={image4} alt="image4" />
    <img src={image5} alt="image5" />
    </div>
  );
}

export default App;