import React from "react";
import { Nav } from "react-bootstrap";
import { AiOutlineLock } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

function RightNav(props) {
  return (
    <>
      <div>
        <div className="px-2 py-3" style={{ background: "#f8f8f9" }}>
          <p className="settings-title ">Profile settings</p>
        </div>
        <div className="px-2 py-2 sidebar rounded " >
          <Nav
            defaultActiveKey={props.defaultActiveKey}
            className="flex-column gap-2"
          >
            <Nav.Link href="/settings/cloudAccounts" className="bg-light py-3 my-1 rounded-2">
              <BsBox /> Cloud Accounts
            </Nav.Link>
            {/* <Nav.Link href="/settings/teamMembers">
              <AiOutlineTeam /> Team members
            </Nav.Link>
            <hr className="mx-2" /> */}
            <Nav.Link href="/settings/myProfile" className=" bg-light py-3 my-1 rounded-2">
              <FiUser /> My profile
            </Nav.Link>
            <Nav.Link href="/settings/changePassword" className=" bg-light py-3 my-1 rounded-2">
              <AiOutlineLock /> Change password
            </Nav.Link>
          </Nav>
        </div>
      </div>

    </>
  );
}

export default RightNav;
