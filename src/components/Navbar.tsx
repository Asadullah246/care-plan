import { useContext, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { ImHome } from "react-icons/im";
import { Link } from "react-router-dom";
import { AppContext } from "../states/app.context";

export const Navbar = () => {
  const { setUser } = useContext(AppContext);
  const [modal, setModal] = useState(false);
  const handleMenu = () => {
    setModal(!modal);
  };
  const logoutUser = () => {
    setUser({});
    localStorage.clear();
  };
  return (
    <>
      <header className="header">
        <nav>
          <div className="main_menu">
            <div>
              <Link to={"/"}>
                <ImHome />
              </Link>
            </div>

            <div>
              Dr. Shane Davidson <AiFillSetting onClick={handleMenu} />
            </div>
          </div>
          {modal && (
            <div className="drop_menu">
              <div>
                <Link to="/user-settings">User settings</Link>
                <Link to="/patient-list">Patient List</Link>
                <Link to="/fee-schedule">Fee Schedule</Link>
                <Link to="/care-plans-builder">Care Plans Builder</Link>
                <button onClick={logoutUser}>Logout</button>
              </div>
            </div>
          )}
        </nav>
      </header>
      {/* {modal && (
        <Modal onClose={() => setModal(false)}>
          <UserSettings />
        </Modal>
      )} */}
    </>
  );
};
