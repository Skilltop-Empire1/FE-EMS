import React, { useState, useEffect } from "react";
import style from "./accountStyle.module.css";
import Button from "../../../components/Button/Button";
import Table3 from "@src/components/dataTable3/Table3";
import AddAccount from "@src/modals/AccountModals/AddAcount";
import { listPatients, deletePatient } from "../../../hooks/Api";
import ConfirmationModal from "@src/modals/ConfirmationModal/ConfirmationModal";
import ViewAccount from "@src/modals/AccountModals/ViewAccount";
import { useFetchResourceQuery } from "@src/redux/api/departmentApi";

const Account = () => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  //fetching the account data
  const {data: accountData, error: accountError, isLoading: accountLoading} = useFetchResourceQuery('/api/v1/account')

  // Unified toggleForm function with confirmation when closing
  const toggleForm = () => {
    setShowForm(!showForm);
  }
  const toggleconfirm = () => {
    setShowConfirm(!showConfirm);
  };
   const toggleView = () => {
    setShowView(!showView);
  };



 const handleSearch = (event) => {
  const searchValue = event.target.value;
  setSearchText(searchValue);
  if (searchValue === "") {
    setFilteredPatients(patients); // Reset filtered list when search is cleared
  } else {
    filterData(searchValue);
  }
};

  
  

  const filterData = (searchValue) => {
    const filteredData = randomUsers.filter((item) => {
      // Check if firstname exists
      const matchesSearch = item?.name?.toLowerCase().includes(
        searchText.toLowerCase()
      );
      return matchesSearch;
    });
    setFilteredPatients(filteredData);
  };

  return (
    <div className={style.body}>
      <div>
        <div className={style.top}>
          <h2 className={style.header}>Account</h2>
         
        </div>
      </div>
      <div className={style.info}>
        <div>
          <div className={style.work}>
              <input
                type="text"
                placeholder="Search Account"
                className={style.filter}
                value={searchText}
                onChange={handleSearch}
              />
              <div className={style.sticky}>
                  <Button
                    onClick={toggleForm}
                    disabled={showForm}
                    add={"Add Account"}
                  />
                </div>
          </div>
        </div>
        {accountLoading ? (
          <div>Loading...</div>
        ) :
        accountError ? (
          <div>Failed to load account data</div>
        ) :
         ( accountData.length > 0 ? (
         <Table3
            Role={"Organization"}
            data={accountData}
            staff={"none"}
            patients={""}
            deleteFunction={deletePatient}
            refreshList={listPatients}
            runToggle={toggleconfirm}
            runView={toggleView}
          />) :
          <div>no data yet</div>
          )}
      </div>

      {showForm && (
        <div>
          <AddAccount toggleForm={toggleForm} />
        </div>
      )}

        { showConfirm && (
          <ConfirmationModal page={'Account'} toggle={toggleconfirm}/>
        )}

        {showView && (
          <div>
            <ViewAccount toggleForm={toggleView}/>
          </div>
        )}
    </div>
  );
};

export default Account;