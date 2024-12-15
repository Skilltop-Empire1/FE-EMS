import React, { useState, useEffect } from 'react'
import style from './addAccountStyle.module.css'
import { usePostResourceMutation } from 'src/redux/api/departmentApi';
import { useFetchResourceQuery } from 'src/redux/api/departmentApi';

const AddAccount = ({ toggleForm }) => {
    const [keepOpen, setKeepOpen] = useState(false);
    const [postResource, { isSuccess, isLoading, error }] = usePostResourceMutation()
    const { data: patientData, error: patientError, isLoading: patientLoading } = useFetchResourceQuery('/patient/list')
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [formError, setFormError] = useState()

    // Filter patient options
    useEffect(() => {
        if (patientData) setFilteredOptions(patientData);
    }, [patientData]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredOptions(
            patientData.filter((option) =>
                option.firstName.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleOptionSelect = (option) => {
        setSelectedPatient(option);
        setSearchTerm(`${option.firstName} ${option.lastName}`);
        setIsDropdownOpen(false);
    };

    const handleCheckboxChange = (e) => {
        setKeepOpen(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accountData = {
            // acctId: e.target.acctId.value,
            patName: selectedPatient ? `${selectedPatient.firstName}  ${selectedPatient.lastName}` : '',
            patId: selectedPatient ? selectedPatient.patId : '',
            paymentMethod: e.target.paymentMethod.value,
            paymentProvider: e.target.paymentProvider.value,
            outstandBal: parseFloat(e.target.outstandBal.value),
            amount: parseFloat(e.target.amount.value),
            total: parseFloat(e.target.outstandBal.value + e.target.amount.value),
            paymentRefNo: e.target.paymentRefNo.value,
            address: e.target.address.value,
            desc: e.target.description.value,
            treatmentType: e.target.treatmentType.value,
            paymentStatus: e.target.paymentStatus.value,
            nextPayDueDate: e.target.nextPayDueDate.value,
        };

        // console.log('Form Data:', accountData);

        try {
            const result = await postResource({
                url: '/account/create',
                method: 'POST',
                data: accountData,
            }).unwrap();
            // console.log('Account created successfully:', result);
            alert('Account created successfully');
            e.target.reset();
            window.location.reload()
            if (!keepOpen) {
                toggleForm();
            }

        } catch (error) {
            console.error('Error creating account:', error.data.error);
            // alert(`Error creating account: ${error.message}`);
            // setFormError(error.error)
            if ( error.data) {
                // If the error message is in the response
                const errorMessage = error.data.error;
                setFormError(errorMessage);
            } else {
                // Generic fallback for other errors
                setFormError("An unexpected error occurred");
            }
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        const confirmation = window.confirm('Are you sure you want to close the form?');
        if (confirmation) {
            toggleForm();
        }
    };

    return (
        <div className={` fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-40`}>
            <div className={`${style.addInfo} fixed bg-gray-800 bg-opacity-50 z-50`}>
                <div className={style.addInfoTop}>
                    <h3>Add Account</h3>
                    <button onClick={handleClose} className={style.close}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    
                    <div className={style.form}>
                        <div className={style.formChild}>
                            <label htmlFor="searchTerm">Patient Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    placeholder='Search patient'
                                    className={`${style.input}`}
                                    required
                                />
                                {isDropdownOpen && (
                                    <ul className="absolute w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg mt-1">
                                        {filteredOptions?.length > 0 ? (
                                            filteredOptions.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleOptionSelect(option)}
                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                >
                                                    {option.firstName} {option.lastName}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="px-4 py-2 text-gray-500">No patients found</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className={style.formChild}>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" className={style.input} />
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select id="paymentMethod" name="paymentMethod" className={style.input} required>
                                <option value="">Select Payment Method</option>
                                <option value="Direct">Direct</option>
                                <option value="NHIS">NHIS</option>
                                <option value="Insurance">Insurance</option>
                                <option value="HMO">HMO</option>
                            </select>
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="nextPayDueDate">Next Payment Date</label>
                            <input type="date" id="nextPayDueDate" name="nextPayDueDate" className={style.input}  />
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="paymentProvider">Payment Provider</label>
                            <select id="paymentProvider" name="paymentProvider" className={style.input} required>
                                <option value="">Select Payment Provider</option>
                                {/* <option value="Direct">Direct</option> */}
                                <option value="Hires">Hires</option>
                                <option value="Federal Health Care">Federal Health Care</option>
                                <option value="HMO">HMO</option>
                            </select>
                        </div>
                        <div className={style.formChild}>
                        <label htmlFor="paymentRefNo">Payment Reference Number</label>
                        <input type="text" id="paymentRefNo" name="paymentRefNo" className={style.input}/>
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="amount">Amount Paid</label>
                            <input type="number" id="amount" name="amount" className={style.input} required />
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="outstandBal">Outstanding Balance</label>
                            <input type="number" id="outstandBal" name="outstandBal" className={style.input}  />
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="treatmentType">Service/Treatment Type</label>
                            <input type="text" id="treatmentType" name="treatmentType" className={style.input} required />
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="paymentStatus">Payment Status</label>
                            <select id="paymentStatus" name="paymentStatus" className={style.input} required>
                                <option value="">Select Payment Status</option>
                                <option value="completed">complete</option>
                                <option value="incomplete">Incomplete</option>
                            </select>
                        </div>
                        <div className={style.formChild}>
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" className={style.input}/>
                        </div>
                    </div>

                    <div className={style.addAnother}>
                        <input type="checkbox" checked={keepOpen} onChange={handleCheckboxChange} className="accent-blue-500 hover:accent-blue-700 focus:ring-2 focus:ring-blue-500" />
                        <label className="text-emsBlue"> Create another account</label>
                    </div>
                    <div className='flex gap-3 justify-center'>
                        <button type="submit" className={`text-white bg-emsBlue ${style.submit}`}>{isLoading ? 'Saving' : 'Save'}</button>
                        <button onClick={handleClose} className={`text-white bg-emsRed ${style.submit}`}>Cancel</button>
                    </div>
                    <span className='text-red-500'>{formError}</span>
                </form>
            </div>
        </div>
    );
};

export default AddAccount;
