/**
 * Contact Form Component with EmailJS Integration
 * 
 * To configure EmailJS:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a service (Gmail, Outlook, etc.)
 * 3. Create an email template with variables: from_name, from_email, company, message, reply_to, subject
 * 4. Set environment variables or update the constants below:
 *    - VITE_EMAILJS_SERVICE_ID
 *    - VITE_EMAILJS_TEMPLATE_ID  
 *    - VITE_EMAILJS_PUBLIC_KEY
 * 
 * The form will work without EmailJS (logs to console) but won't send actual emails.
 */

import React from 'react';
import { Card } from '../ui';



const Contact: React.FC = () => {

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6 text-shadow-lg">
            Get In Touch
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-12">
            Interested in collaborating or just want to chat about opportunities?
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Contact */}
            <Card className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                <p className="text-white/70 text-sm mb-4">Send me a direct email</p>
                <a
                  href="mailto:prasath1196@gmail.com"
                  className="text-blue-300 hover:text-blue-200 transition-colors font-medium"
                >
                  prasath1196@gmail.com
                </a>
              </div>
            </Card>

            {/* LinkedIn Contact */}
            <Card className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
                <p className="text-white/70 text-sm mb-4">Connect with me professionally</p>
                <a
                  href="https://www.linkedin.com/in/prasath-rajasekaran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 transition-colors font-medium"
                >
                  linkedin.com/in/prasath-rajasekaran
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Form commented out for future use */}
        {/*
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <Form onSubmit={handleSubmit}>
              // Form fields would go here
            </Form>
          </CardContent>
        </Card>
        */}
      </div>
    </section>
  );
};

export default Contact;