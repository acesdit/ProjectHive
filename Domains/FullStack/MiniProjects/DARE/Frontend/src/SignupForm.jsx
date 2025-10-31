import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { name, email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.data.error) {
        // Set specific error message based on backend response
        switch (response.data.error) {
          case "Please provide all required fields":
            setError(
              "Missing required fields. Please fill out the form completely."
            );
            break;
          case "Please enter a valid 10-digit contact number":
            setError(
              "Invalid phone number. Please enter a valid 10-digit number."
            );
            break;
          case "Please enter a valid email address":
            setError(
              "Invalid email address. Please enter a valid email format."
            );
            break;
          case "Password must be at least 8 characters long":
            setError(
              "Password is too short. Please enter at least 8 characters."
            );
            break;
          default:
            setError(
              "An error occurred during signup. Please try again later."
            );
        }
      } else {
        navigate("/"); // Redirect to dashboard on successful signup
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Enhanced error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      console.error("Config:", error.config);

      setError("An error occurred while signing up. Please try again later.");
    }
  };
  return (
    <>
      {/* <div className="hero min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-primary">Sign up now!</h1>
            <p className="py-6 text-lg text-gray-700">
              Sign up and join DARE - your one-step platform for help during
              disasters!
            </p>
          </div>
          <div className="card  w-full max-w-md shadow-2xl bg-white">
            <form className="card-body" onSubmit={handleSignup}>
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="organization"
                />
              </div>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  id="email"
                  className="input input-bordered"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="input input-bordered"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full mt-4">
                Signup
              </button>
            </form>

            {error && <div className="text-red-500 mt-4">{error}</div>}
            <div className="mt-4 text-center ">
              <span className="mr-2"> Already have an account? </span>
              <Link to="/login" className="text-blue-500 link link-hover">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      <div className="hero min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-primary">Sign up now!</h1>
            <p className="py-6 text-lg text-gray-700">
              Sign up and join DARE - your one-stop platform for help during
              disasters!
            </p>
          </div>
          <div className="card w-full max-w-md shadow-lg bg-white">
            <form className="card-body" onSubmit={handleSignup}>
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="organization"
                />
              </div>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  id="email"
                  className="input input-bordered"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="input input-bordered"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full mt-4">
                Signup
              </button>
              {error && <div className="text-red-500 mt-4">{error}</div>}
              <div className="mt-4 text-center">
                <span className="mr-2">Already have an account?</span>
                <Link to="/login" className="link link-hover text-blue-500">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
