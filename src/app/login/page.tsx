import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 pt-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="py-6 mx-5">
                Welcome back! Please login to your account.
              </p>
            </div>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label"></label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Login</button>
              </div>
              <div className="text-center mt-4">
                <p>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="link link-hover text-primary"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
