import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin@12345") {
      // If the credentials match, navigate to the admin home page
      navigate("/adminhome");
    } else {
      // If the credentials do not match, set an error message
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    // <div className="admin-login">
    //   <h2>Admin Login</h2>
    //   <form onSubmit={handleLogin}>
    //     <div>
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Login</button>
    //     <div className="login-register">
    //       <p>
    //         Not an Admin?
    //         <Link to="/" className="register">
    //           Login as User
    //         </Link>
    //       </p>
    //     </div>

    //     {error && <p>{error}</p>}
    //   </form>
    // </div>
    <>
      <div className="hero min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-primary">Admin Login</h1>
            <p className="py-6 text-lg text-gray-700">
              Welcome back! Login to continue.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button className="btn btn-primary w-full mt-4">Login</button>
              </div>
              <div className="flex justify-center mt-4">
                Not an Admin?&nbsp;
                <Link to="/login" className="text-blue-500 link-hover ">
                  Login as User
                </Link>
              </div>
              {error && <div className="text-red-500 mt-4">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
