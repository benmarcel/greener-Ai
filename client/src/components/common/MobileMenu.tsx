import { NavLink } from "react-router-dom"

import { useAuth } from '../../hooks/useAuth';
interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  handleLogout: () => void;
 
}
const MobileMenu = ({ isOpen, toggleMenu, handleLogout }: MobileMenuProps) => {
    const { user } = useAuth();
  return (
    <>{isOpen && (
      <div className="relative bg-white w-full p-4 shadow-lg z-50">
      <button type="button" onClick={toggleMenu} className=" absolute top-0 right-0 mt-4 mr-4">
        <i className="fas fa-times"></i>
      </button>
        <div className="flex flex-col space-y-4">
            <NavLink
          to="/dashboard"
          className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/community"
          className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
        >
          Community
        </NavLink>
        <NavLink
          to="/actions"
          className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
        >
          Actions
        </NavLink>
        <NavLink
          to="/ai-chat"
          className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
        >
          AI Assistant
        </NavLink>
        <div className="flex items-center text-white space-x-2 w-full px-4 py-2 rounded-md bg-green-700 justify-center">
          {user?.name.toUpperCase()}{" "}
          Lvl-{user?.level}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Logout
        </button>
        </div>
      </div>
    )}</>
  )
}

export default MobileMenu