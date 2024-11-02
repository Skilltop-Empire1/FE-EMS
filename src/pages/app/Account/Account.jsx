import React, { useState, useEffect } from "react";
import style from "./accountStyle.module.css";
import Button from "../../../components/Button/Button";
import Table3 from "@src/components/dataTable3/Table3";
import AddAccount from "@src/modals/AccountModals/AddAcount";
import ConfirmationModal from "@src/modals/ConfirmationModal/ConfirmationModal";
import ViewAccount from "@src/modals/AccountModals/ViewAccount";
import { useFetchResourceQuery, useDeleteResourceMutation } from "@src/redux/api/departmentApi";
import AccountInfo from "@src/modals/AccountModals/AccountInfo";

const Account = () => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [accountIdToDelete, setAccountIdToDelete] = useState();
  const [accountToUpdate, setAccountToUpdate] = useState(null);
  const [accountToView, setAccountToView] = useState(null);

  const { data: accountData = [], error: accountError, isLoading: accountLoading } = useFetchResourceQuery('/account');
  const [deleteResource] = useDeleteResourceMutation();

  useEffect(() => {
    // Initialize filteredPatients with accountData when data is fetched
    setFilteredPatients(accountData);
  }, [accountData]);

  const handleAccountDelete = (id) => {
    setAccountIdToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteResource(`/account/${accountIdToDelete}`).unwrap();
      alert("Account detail deleted successfully");
      setShowConfirm(false);
      setFilteredPatients(filteredPatients.filter(account => account.id !== accountIdToDelete));
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  const toggleForm = () => setShowForm(!showForm);
  const toggleConfirm = () => setShowConfirm(!showConfirm);
  const toggleView = (account) => {
    setAccountToUpdate(account);
    setShowView(!showView);
  };
  const toggleInfo = (account) => {
    setAccountToView(account);
    setShowInfo(!showInfo);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    if (searchValue === "") {
      setFilteredPatients(accountData); // Reset to original data when search is cleared
    } else {
      const filteredData = accountData.filter((account) =>
        account.patName?.toLowerCase().includes(searchValue)
      );
      setFilteredPatients(filteredData);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.top}>
        <h2 className={style.header}>Account</h2>
      </div>
      <div className={style.info}>
        <div className={style.work}>
          <input
            type="text"
            placeholder="Search Account"
            className={style.filter}
            value={searchText}
            onChange={handleSearch}
          />
          <Button onClick={toggleForm} disabled={showForm} add="Add Account" />
        </div>

        {accountLoading ? (
          <div>Loading...</div>
        ) : accountError ? (
          <div>Failed to load account data</div>
        ) : filteredPatients?.length > 0 ? (
          <Table3
            Role="Organization"
            data={filteredPatients}
            staff="none"
            patients=""
            runToggle={handleAccountDelete}
            runView={toggleView}
            runInfo={toggleInfo}
          />
        ) : (
          <div>No data yet</div>
        )}
      </div>

      {showForm && <AddAccount toggleForm={toggleForm} />}
      {showConfirm && <ConfirmationModal page="Account" toggle={toggleConfirm} runDelete={handleDelete} />}
      {showView && <ViewAccount toggleForm={toggleView} account={accountToUpdate} />}
      {showInfo && <AccountInfo toggleInfo={toggleInfo} infoData={accountToView} />}
    </div>
  );
};

export default Account;
