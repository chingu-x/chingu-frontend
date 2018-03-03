import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <h1>Privacy Policy</h1>
      <section>
        <h4>Privacy Notice</h4>
        <p>
          This privacy notice discloses the privacy practices for Chingu.io.
          This privacy notice applies solely to information collected by this website.
          It will notify you of the following:
        </p>
        <ol>
          <li>What personally identifiable information is collected from you through the website,
            how it is used and with whom it may be shared.</li>
          <li>What choices are available to you regarding the use of your data.</li>
          <li>The security procedures in place to protect the misuse of your information.</li>
          <li>How you can correct any inaccuracies in the information.</li>
        </ol>
      </section>
      <section>
        <h4>Information Collection, Use, and Sharing</h4>
        <p>
          We are the sole owners of the information collected on this site.
          We only have access to/collect information that you voluntarily give us via
          email or other direct contact from you.
        </p>
        <p>
          We will use your information to respond to you, regarding the reason you contacted
          us. We will not share your information with any third party outside of our organization,
          other than as necessary to fulfill requests from you, and we will not sell your information
          to anyone.
        </p>
      </section>
      <section>
        <h4>Your Access to and Control Over Information</h4>
        <p>
          You may opt out of any future contacts from us at any time by terminating your account.
          You can do the following at any time by contacting us via the email address given on our website:
        </p>
        <ul>
          <li>See what data we have about you, if any.</li>
          <li>Change/correct any data we have about you.</li>
          <li>Express any concern you have about our use of your data.</li>
        </ul>
      </section>
      <section>
        <h4>Security</h4>
        <p>
          We take precautions to protect your information. When you submit
          sensitive information via the website, your information is protected
          both online and offline.
        </p>
        <p>
          Wherever we collect information it is encrypted and transmitted to us
          in a secure way. You can verify this by looking for a lock icon in the
          address bar and looking for “https” at the beginning of the address of
          the Web page.
        </p>
        <p>
          While we use encryption to protect sensitive information transmitted
          online, we also protect your information offline. Only staff members who
          need the information to perform a specific job (for example, processing
          support tickets) are granted access to personally identifiable information.
        </p>
        <p>
          If you you have questions about this privacy policy contact us
          at <a href="mailto:admin@chingu.io">admin@chingu.io</a>.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;