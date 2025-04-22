import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg absolute">
      <div className="navbar-start">
        <div className="dropdown">
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Blog</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>

        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Blog Post
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-2">
        <SignedOut>
          <div className="btn btn-primary">
            <SignInButton>Login</SignInButton>
          </div>
          <div className="btn btn-primary">
            <SignUpButton>Register</SignUpButton>
          </div>
        </SignedOut>
        <div className="mr-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
