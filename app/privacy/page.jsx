// app/privacy/page.jsx
import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>Effective Date: 3/18/2025</p>

      <div className="">
        <ol className="list-decimal pl-5">
          <li>
            <strong>Introduction</strong>
            <p>Welcome to Shortlix.art (the “Website”), accessible at https://shortlix.art URL. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our Website.</p>
          </li>

          <li>
            <strong>Information We Collect</strong>
            <p>We may collect the following information:</p>
            <ul className="list-disc pl-5">
              <li><strong>Log Data:</strong> IP addresses, browser type, and access times for security and analytics.</li>
              <li><strong>Cookies:</strong> We use cookies to improve user experience (see Section 6).</li>
              <li><strong>Account Information:</strong> When you create an account, we collect your pi username</li>
              <li><strong>Payment Information:</strong> When you purchase credits, we don't collect payment your information</li>
              <li><strong>Voluntary Information:</strong> If you contact us, we may store your email address and any provided details.</li>
            </ul>
          </li>

          <li>
            <strong>How We Use Your Information</strong>
            <p>We use collected data for the following purposes:</p>
            <ul className="list-disc pl-5">
              <li>To operate and maintain Shortlix.art.</li>
              <li>To improve our services based on usage patterns.</li>
              <li>To personalize your experience.</li>
              <li>To process payments.</li>
              <li>To ensure security and prevent fraudulent activities.</li>
              <li>To respond to inquiries and support requests.</li>
            </ul>
          </li>

          <li>
            <strong>AI Generated Content</strong>
            <p>Shortlix.art does not claim ownership of the videos generated. All data displayed on the Website  is  not considered private information.</p>
          </li>

          <li>
            <strong>Sharing of Information</strong>
            <p>We do not sell or share your personal data, except in the following cases:</p>
            <ul className="list-disc pl-5">
              <li><strong>Legal Requirements:</strong> If required by law or regulatory authorities.</li>
              <li><strong>Security Measures:</strong> To prevent fraud or unauthorized activity.</li>
              <li><strong>Service Providers:</strong> We may share anonymized data with analytics providers and payment processors.</li>
            </ul>
          </li>

          <li>
            <strong>Cookies and Tracking</strong>
            <p>We use cookies to improve user experience. You can disable cookies in your browser settings, but some features of Shortlix.art may not function properly.</p>
          </li>

          <li>
            <strong>Data Security</strong>
            <p>We implement security measures to protect against unauthorized access, but no method of transmission over the internet is 100% secure.</p>
          </li>

          <li>
            <strong>Third-Party Links</strong>
            <p>Shortlix.art may contain links to third-party websites. We are not responsible for their privacy policies or practices.</p>
          </li>

          <li>
            <strong>Updates to This Policy</strong>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page, and continued use of Shortlix.art after updates constitutes your acceptance.</p>
          </li>

          <li>
            <strong>Contact Us</strong>
            <p>If you have any questions about this Privacy Policy, please contact us at: shortlix.contact@gmail.com.</p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PrivacyPage;
