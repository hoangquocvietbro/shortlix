// app/terms/page.jsx
import React from 'react';

const TermsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p>Effective Date: 3/18/2025</p>

      <div className="text-gray-700">
        <ol className="list-decimal pl-5">
          <li>
            <strong>Introduction</strong>
            <p>Welcome to Shortlix.art (the “Website”), accessible at https://shortlix.art URL. Shortlix.art is an AI Short Video Generator. By accessing or using our Website, you agree to be bound by these Terms of Service (“Terms”). If you do not agree to these Terms, please do not use the Website.</p>
          </li>

          <li>
            <strong>Use of Services</strong>
            <p>Shortlix.art provides AI Short Video Generator service. You acknowledge and agree that:</p>
            <ul className="list-disc pl-5">
              <li>You are responsible for the content you generate using Shortlix.art.</li>
              <li>You must not use Shortlix.art to create content that is illegal, harmful, or infringes on the rights of others.</li>
              <li>We reserve the right to remove content that violates these Terms.</li>
            </ul>
          </li>

          <li>
            <strong>No Professional Advice</strong>
            <p>Shortlix.art provides AI Short Video Generator for informational purposes only. We do not provide investment, financial, or legal advice. Any actions taken based on videos from Shortlix.art are at your own risk.</p>
          </li>

          <li>
            <strong>Account Usage</strong>
            <p>
              You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized access to or use of your account.
            </p>
          </li>

          <li>
            <strong>Intellectual Property</strong>
            <p>All content on Shortlix.art, including text, graphics, logos, and software, is owned or licensed by Shortlix.art and protected by copyright and trademark laws. You may not copy, modify, distribute, or reproduce any content from Shortlix.art without prior written permission.</p>
          </li>

          <li>
            <strong>Limitation of Liability</strong>
            <p>Shortlix.art is provided “as is” without warranties of any kind. We are not responsible for:</p>
            <ul className="list-disc pl-5">
              <li>Errors or inaccuracies in AI generated videos.</li>
              <li>Losses or damages arising from reliance on videos from Shortlix.art.</li>
              <li>Unauthorized access to or use of our Website.</li>
            </ul>
          </li>

          <li>
            <strong>Third-Party Links</strong>
            <p>Shortlix.art may contain links to third-party websites. We do not endorse or assume responsibility for any content, products, or services offered by third parties.</p>
          </li>

          <li>
            <strong>Modifications to Terms</strong>
            <p>We may update these Terms from time to time. Continued use of Shortlix.art after changes are posted constitutes your acceptance of the revised Terms.</p>
          </li>

          <li>
            <strong>Termination</strong>
            <p>We reserve the right to suspend or terminate access to Shortlix.art for violations of these Terms or for any other reason at our discretion.</p>
          </li>

          <li>
            <strong>Governing Law</strong>
            <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes shall be resolved in the courts of [Your Jurisdiction].</p>
          </li>

          <li>
            <strong>Contact Us</strong>
            <p>If you have any questions regarding these Terms, please contact us at: shortlix.contact@gmail.com</p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermsPage;
