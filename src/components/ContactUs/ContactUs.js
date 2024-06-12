import React from 'react';

function ContactUs() {
  return (
    <div className='text-center'>
      <h2 className='font-bold text-3xl p-4'>Contact Us</h2>
      <p className='font-semibold text-xl p-4'>If you have any questions or inquiries, feel free to reach out to us using the contact information below:</p>
      <ul className='font-semibold text-xl p-4'>
        <li >Email: <a href="mailto:info@hspathology.com">info@hspathology.com</a></li>
        <li>Phone: <a href="tel:+442071002727">020 7100 2727</a></li>
      </ul>
      <p className='font-semibold text-xl p-4'>Our office hours are Monday to Friday, 9am to 5pm.</p>
      <p className='font-semibold text-xl p-4'>We look forward to hearing from you!</p>
    </div>
  );
}

export default ContactUs;