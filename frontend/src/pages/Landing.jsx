import { Link } from "react-router-dom";
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const Landing = () => {
  const features = [
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Track Your Spending",
      description: "Monitor your expenses and income in one place. Get detailed insights into your spending habits with beautiful charts and analytics.",
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: "Manage Your Budget",
      description: "Set budgets for different categories and track your progress. Stay on top of your finances with real-time balance updates.",
    },
    {
      icon: <DocumentTextIcon className="h-8 w-8" />,
      title: "Transaction History",
      description: "Keep a complete record of all your transactions. Add, edit, and delete entries with ease. Organize by categories for better insights.",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and stored securely. We use industry-standard security practices to protect your information.",
    },
  ];

  const benefits = [
    "Free to use - No hidden fees",
    "Easy to set up and use",
    "Real-time balance tracking",
    "Category-wise expense analysis",
    "Beautiful charts and visualizations",
    "Secure data storage",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center min-w-0">
              <div className="flex-shrink-0 flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                <span className="ml-1 sm:ml-2 text-base sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">
                  Budget Tracker
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
              <Link
                to="/login"
                className="text-xs sm:text-sm lg:text-base text-slate-700 hover:text-indigo-600 font-medium transition-colors px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
            Take Control of Your
            <span className="text-indigo-600 block mt-2">Financial Future</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Track your income, manage expenses, and achieve your financial goals with our 
            intuitive budget tracker. All your money management in one secure place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 px-2">
            Everything You Need to Manage Your Money
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-2">
            Powerful features designed to help you understand and control your finances
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
            >
              <div className="text-indigo-600 mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                Why Choose Budget Tracker?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
                Join thousands of users who are taking control of their finances. 
                Our platform makes money management simple, secure, and accessible.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm sm:text-base lg:text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Start Today</h3>
              <p className="text-indigo-100 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                Create your free account and start tracking your expenses in minutes. 
                No credit card required.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-white text-indigo-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Join Budget Tracker today and start your journey towards better financial management.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              Sign Up Free
              <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to="/login"
              className="bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl border-2 border-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
              <span className="ml-2 text-base sm:text-lg font-semibold">Budget Tracker</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Link
                to="/about-us"
                className="text-sm sm:text-base text-slate-400 hover:text-indigo-400 transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/privacy-policy"
                className="text-sm sm:text-base text-slate-400 hover:text-indigo-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <p className="text-sm sm:text-base text-slate-400 text-center">
                © 2025 Budget Tracker. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;




