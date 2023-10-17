import React from "react";
import { Route, Routes } from "react-router-dom";
import Assesment from "./components/Assesment";
import Dashboard from "./components/Dashboard";
import EmailSent from "./components/EmailSent";
import ForgotPass from "./components/ForgotPass";
import Form from "./components/Form";
import Logs from "./components/Logs";
import ResetPass from "./components/ResetPass";
import Verify from "./components/Verify";
import ViewWafr from "./components/ViewWafr";
import Wafr from "./components/Wafr";
import ChangePassword from "./components/settings/ChangePassword";
import CloudAccounts from "./components/settings/CloudAccounts";
import MyProfile from "./components/settings/MyProfile";
import TeamMembers from "./components/settings/TeamMembers";
import EditAccount from "./components/settings/addNewAccount/EditAccount";
import ManageAccount from "./components/settings/addNewAccount/ManageAccount";
import "./styles/scss/app.scss";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/emailsent" element={<EmailSent />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wafr" element={<Wafr />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/viewwafr" element={<ViewWafr />} />
          <Route path="/assesment/:id/:lensAlias" element={<Assesment />} />
          <Route path="/settings/cloudAccounts" element={<CloudAccounts />} />
          <Route path="/settings/manageAccount" element={<ManageAccount />} />
          <Route path="/settings/editAccount/:id" element={<EditAccount />} />
          <Route path="/settings/teamMembers" element={<TeamMembers />} />
          <Route path="/settings/myProfile" element={<MyProfile />} />
          <Route path="/settings/changePassword" element={<ChangePassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
