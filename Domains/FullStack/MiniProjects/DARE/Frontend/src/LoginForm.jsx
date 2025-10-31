// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./App.css";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address.");
//       setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8081/login", {
//         email,
//         password,
//       });
//       if (response.data.message === "Login successful") {
//         navigate("/home");
//       } else {
//         setError(response.data.error);
//         setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("An error occurred while logging in");
//       setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
//     }
//   };

//   return (
//     <>
//       <div className="wrapper">
//         <div className="form-box login">
//           <h2 className="formh2">Login</h2>
//           <form onSubmit={handleLogin}>
//             <div className="input-box">
//               <span className="icon">
//                 <ion-icon name="mail"></ion-icon>
//               </span>
//               <input
//                 type="text"
//                 className="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label>Email</label>
//             </div>
//             <div className="input-box">
//               <span className="icon">
//                 <ion-icon name="lock-closed"></ion-icon>
//               </span>
//               <input
//                 type="password"
//                 className="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="off"
//               />
//               <label>Password</label>
//             </div>
//             <button type="submit" className="btn">
//               Login
//             </button>
//             <div className="login-register">
//               <p>
//                 Don&apos;t have an account?{" "}
//                 <Link to="/signup" className="register">
//                   Register
//                 </Link>
//               </p>
//             </div>
//             <div className="admin-login">
//               <p>
//                 <Link to="/adminlogin" className="register">
//                   Login as Admin
//                 </Link>
//               </p>
//             </div>
//             {error && (
//               <div className="err">
//                 <p>{error}</p>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginForm;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/login", {
        email,
        password,
      });
      if (response.data.message === "Login successful") {
        navigate("/home");
      } else {
        setError(response.data.error);
        setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in");
      setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
    }
  };

  return (
    // <div className="hero min-h-screen bg-cover">
    //   <div className="hero-content flex-col lg:flex-row-reverse justify-center items-center">
    //     <div className="text-center lg:text-left max-w-lg">
    //       <h1 className="text-5xl font-bold text-white">Login now!</h1>
    //       <p className="py-6 text-white">
    //         Login and use DARE - your one-step platform for help during
    //         disasters!
    //       </p>
    //     </div>
    //     <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
    //       <form className="card-body" onSubmit={handleLogin}>
    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text">Email</span>
    //           </label>
    //           <input
    //             type="email"
    //             placeholder="Email"
    //             className="input input-bordered"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label className="label">
    //             <span className="label-text">Password</span>
    //           </label>
    //           <input
    //             type="password"
    //             placeholder="Password"
    //             className="input input-bordered"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <div className="form-control mt-6">
    //           <button className="btn btn-primary">Login</button>
    //         </div>
    //         {error && <div className="text-red-500 mt-4">{error}</div>}
    //         <div className="form-control mt-4">
    //           <Link to="/signup" className="label-text-alt link link-hover">
    //             Don't have an account? Register
    //           </Link>
    //         </div>
    //         <div className="form-control mt-2">
    //           <Link to="/adminlogin" className="label-text-alt link link-hover">
    //             Login as Admin
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="hero min-h-screen bg-cover bg-blue-50 flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse justify-center items-center">
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-5xl font-bold text-primary">Login now!</h1>
          <p className="py-6 text-gray-500">
            Login and use DARE - your one-step platform for help during
            disasters!
          </p>
        </div>
        <div className="card w-full max-w-md shadow-lg bg-white">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary w-full mt-4">
                Login
              </button>
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            <div className="mt-4 text-center">
              Don't have an account?&nbsp;
              <Link to="/signup" className="text-blue-500 link link-hover">
                Register
              </Link>
            </div>
            <span className=" flex justify-center">
              <Link
                to="/adminlogin"
                className="text-violet-500 link link-hover"
              >
                Login as Admin
              </Link>
            </span>
            {/* <span className=" flex justify-center">
              <Link to="/v" className="text-blue-500 link link-hover">
                Login as Volunteer
              </Link>
            </span> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
