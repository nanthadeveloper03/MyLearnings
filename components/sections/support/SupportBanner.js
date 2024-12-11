import React from 'react';
import Link from "next/link";
import { useState } from 'react';

const SupportBanner = () => {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);   // Set the file name when a file is selected
    } else {
      setFileName(null);  // Reset if no file is selected
    }
  };
  return (
    <>
      <section className="bonan_bann1 support_ban1">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-7 col-sm-6 col-12">
              <div className="bon_cnb1">
                <div className="cban_hd text-uppercase finter text-white fw600">Ticket</div>
                <h1 className="title finter fw600">Raise your Query!</h1>
                <p>For any issues, please raise a support ticket through our dedicated system. Our team will review and respond to your concerns as quickly as possible.</p>
              </div>
            </div>
            <div className='col-md-5 col-sm-6 col-12'>
              <div className='soc_bim suprt_frm'>
                <h4>Submit a Request</h4>
                <form className="reqst_form">
                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="Your email address" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Account issue" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="API Related" />
                  </div>
                 
                   <div className="form-group brd-custom position-relative">
                    <input 
                      type="file" 
                      placeholder="Upload" 
                      className="w-100 opacity-0 form-control" 
                      onChange={handleFileChange} // Handle file input change
                    />
                    
                    {/* Conditionally display the file name or default text */}
                    <p className="position-absolute upld">
                      {fileName ? fileName : 'Upload Image'}
                    </p>
                    <span className='d-block position-absolute'></span>
                  </div>

                  <button type="submit" className="btn text-white btn-action w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportBanner;
