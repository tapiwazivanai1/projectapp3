import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import Header from "./layout/Header";
import LoginForm from "./auth/LoginForm";
import { useAuth } from "./auth/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout } = useAuth();

  const handleLogin = (values: {
    email: string;
    password: string;
    role: "individual" | "branch" | "admin";
  }) => {
    // Use the auth context login function
    login(values.email, values.password, values.role);
    // Navigate to dashboard after successful login
    navigate("/dashboard");
  };

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoggedIn ? (
        // If logged in, redirect to dashboard
        navigate("/dashboard")
      ) : (
        <div className="min-h-screen flex flex-col">
          {/* Hero Section */}
          <div className="bg-black text-white">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center mr-3">
                  <span className="text-yellow-500 font-bold text-xl">G</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-yellow-500">
                    Guta Ra Mwari
                  </h1>
                  <p className="text-xs text-white/70">Fundraising Hub</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row">
            {/* Left Side - Welcome Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 bg-gradient-to-br from-red-800 to-black p-8 md:p-16 flex items-center justify-center"
            >
              <div className="max-w-md text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-500">
                  Welcome to Guta Ra Mwari Fundraising Hub
                </h1>
                <p className="text-lg mb-8">
                  A platform for church members to contribute to projects, track
                  progress, and collaborate on initiatives.
                </p>
                <div className="space-y-4">
                  {[
                    "Support church projects with easy contributions",
                    "Track your donation history and impact",
                    "Collaborate on the annual magazine",
                    "Stay connected with your church community",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-yellow-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-1/2 bg-white p-8 md:p-16 flex items-center justify-center"
            >
              <LoginForm
                onSubmit={handleLogin}
                onLoginSuccess={handleLoginSuccess}
              />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
