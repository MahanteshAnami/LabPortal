import React from 'react';

function ContactUs() {
  return (
    <div className=' h-96 flex justify-center items-center'>
      <div className='max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold mb-4 text-gray-800'>Contact Us</h2>
        <p className='text-lg text-gray-700 mb-4'>
          If you have any questions or inquiries, feel free to reach out to us using the contact information below:
        </p>
        <ul className='text-lg text-gray-700 mb-4'>
          <li className='mb-2'>Email: <a href="mailto:info@hspathology.com" className='text-blue-500 hover:underline'>info@hspathology.com</a></li>
          <li>Phone: <a href="tel:+442071002727" className='text-blue-500 hover:underline'>020 7100 2727</a></li>
        </ul>
        <p className='text-lg text-gray-700 mb-4'>
          Our office hours are Monday to Friday, 9am to 5pm.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          We look forward to hearing from you!
        </p>
      </div>
    </div>
  );
}

export default ContactUs;