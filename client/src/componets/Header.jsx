import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-[#4C4B63] ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
        <img className="object-content hover:opacity-80 " src="QUIZNEST.svg" alt="" />
        </Link>
        <ul className="flex gap-4 text-white font-medium">
            <li className="hover:opacity-80"><Link to="/">Home</Link></li>
            <li className="hover:opacity-80"><Link to="/features">Features</Link></li>
            <li className="hover:opacity-80"><Link to="/about">About Us</Link></li>
            <li className="hover:opacity-80"><Link to="/signin">Sign In</Link></li>
        </ul>
      </div>
    </div>
  );
}
