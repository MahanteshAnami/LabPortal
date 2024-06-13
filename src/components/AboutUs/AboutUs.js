import React from 'react';

function AboutUs() {
  return (
    <div className=' h-96 flex justify-center items-center'>
      <div className='max-w-4xl  mx-auto p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold mb-4'>About Us</h2>
        <p className='text-lg mb-4'>
          We are Harley Street Pathology Services, providing top-notch pathology services to our clients.
        </p>
        <p className='text-lg mb-4'>
          Our mission is to deliver accurate and timely results to assist healthcare professionals in patient care.
        </p>
        <p className='text-lg mb-4'>
          For more information, please feel free to contact us at <a href="mailto:info@hspathology.com" className='text-blue-500 hover:underline'>info@hspathology.com</a>.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;