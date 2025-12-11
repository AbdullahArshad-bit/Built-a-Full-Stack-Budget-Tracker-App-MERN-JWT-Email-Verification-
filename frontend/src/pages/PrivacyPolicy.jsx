import { Link } from "react-router-dom";
import { CurrencyDollarIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link to="/home" className="flex items-center min-w-0">
              <CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <span className="ml-1 sm:ml-2 text-base sm:text-xl lg:text-2xl font-bold text-slate-900">
                Budget Tracker
              </span>
            </Link>
            <Link
              to="/home"
              className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-medium transition-colors text-sm sm:text-base"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-slate max-w-none space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Welcome to Budget Tracker. We are committed to protecting your privacy and ensuring
                the security of your personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3">
                2.1 Personal Information
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                When you create an account, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 ml-4">
                <li>Your name</li>
                <li>Email address</li>
                <li>Password (encrypted and hashed)</li>
              </ul>

              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3 mt-6">
                2.2 Financial Information
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                We collect and store your financial transaction data, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 ml-4 mt-2">
                <li>Income and expense records</li>
                <li>Transaction categories</li>
                <li>Transaction dates and amounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 ml-4">
                <li>Provide and maintain our service</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you verification emails and important updates</li>
                <li>Improve our service and user experience</li>
                <li>Ensure the security of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                4. Data Security
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 ml-4 mt-2">
                <li>All passwords are encrypted using bcrypt hashing</li>
                <li>Data is stored securely in MongoDB Atlas with encryption</li>
                <li>We use JWT tokens for secure authentication</li>
                <li>Regular security audits and updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                5. Data Sharing
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. Your
                financial data is private and only accessible to you through your authenticated
                account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                6. Your Rights
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-slate-700 ml-4">
                <li>Access your personal data</li>
                <li>Update or correct your information</li>
                <li>Delete your account and data</li>
                <li>Export your transaction data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                7. Cookies and Tracking
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                We use authentication tokens stored in your browser's localStorage to maintain your
                login session. These tokens are secure and only used for authentication purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                8. Contact Us
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-base sm:text-lg text-indigo-600 font-medium mt-2">
                hussanbhi143@gmail.com
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              to="/home"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


