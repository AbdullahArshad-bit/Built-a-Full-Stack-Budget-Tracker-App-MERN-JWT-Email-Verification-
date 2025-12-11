import { Link } from "react-router-dom";
import { 
  CurrencyDollarIcon, 
  ArrowLeftIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const AboutUs = () => {
  const features = [
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Track Everything",
      description: "Monitor all your income and expenses in one place with detailed analytics.",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and stored securely. We never share your information.",
    },
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: "User-Focused",
      description: "Built with simplicity and user experience in mind. Easy to use, powerful features.",
    },
  ];

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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            About Budget Tracker
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Your trusted companion for managing personal finances and achieving financial goals
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
            At Budget Tracker, we believe that everyone deserves to have control over their
            finances. Our mission is to provide a simple, secure, and powerful tool that helps you
            understand your spending habits, track your income, and achieve your financial goals.
          </p>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            We're committed to making financial management accessible to everyone, regardless of
            their financial knowledge or background. With Budget Tracker, you can take control of
            your money and build a better financial future.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
            >
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
            What We Offer
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2">
                📊 Comprehensive Tracking
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Track all your income and expenses with detailed categorization. Get insights into
                your spending patterns and identify areas where you can save.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2">
                🔒 Security First
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Your financial data is encrypted and stored securely. We use industry-standard
                security practices to protect your information. Your privacy is our priority.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2">
                📱 Easy to Use
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Our intuitive interface makes it easy to add transactions, view your balance, and
                understand your financial situation at a glance. No complicated setup required.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2">
                📈 Visual Analytics
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Beautiful charts and visualizations help you understand your finances better. See
                your income vs expenses, category breakdowns, and spending trends.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 text-white mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Why Choose Budget Tracker?
          </h2>
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-base sm:text-lg text-indigo-100">
                <strong>Free to Use:</strong> No hidden fees, no premium tiers. All features are
                available to everyone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-base sm:text-lg text-indigo-100">
                <strong>Privacy Focused:</strong> Your data belongs to you. We don't sell or share
                your information with third parties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-base sm:text-lg text-indigo-100">
                <strong>Always Improving:</strong> We continuously update and improve our platform
                based on user feedback.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-base sm:text-lg text-indigo-100">
                <strong>User Support:</strong> We're here to help. If you have questions or need
                assistance, we're just a message away.
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Get Started Today
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
            Join thousands of users who are taking control of their finances with Budget Tracker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Create Free Account
            </Link>
            <Link
              to="/home"
              className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base border-2 border-indigo-600 hover:bg-indigo-50 transition-all shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;


