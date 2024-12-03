import React, { useState, useEffect } from 'react'
import style from './addAccountStyle.module.css'
import { useEditResourceMutation, usePostResourceMutation } from 'src/redux/api/departmentApi';
import { useFetchResourceQuery } from 'src/redux/api/departmentApi';

const ViewAccount = ({ toggleForm, account }) => {
    const [keepOpen, setKeepOpen] = useState(false);
    const [postResource, { isSuccess: postSuccess, isLoading: postLoading, error: postError }] = usePostResourceMutation()
    const [editResource, { isSuccess, isLoading, error }] = useEditResourceMutation()
    const { data: patientData, error: patientError, isLoading: patientLoading } = useFetchResourceQuery('/patient/list')
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState()


    useEffect(() => {
            if (account) {
                setFormData({
                    ...account,
                    nextPayDueDate: account.nextPayDueDate ? account.nextPayDueDate.slice(0, 10) : '', // Formats to YYYY-MM-DD
                });
                // Set searchTerm to patient's name when account data is loaded
                setSearchTerm(account.patName || '');
                
            }
        }, [account]);

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

            // Update formData with selected patient's information
            setFormData((prev) => ({
                ...prev,
                patId: option.patId,
                patName: `${option.firstName} ${option.lastName}`
            }));
        };


    const handleCheckboxChange = (e) => {
        setKeepOpen(e.target.checked);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const accountData = {
        accId: account.acctId,
        patName: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : formData.patName || '',
        patId: selectedPatient ? selectedPatient.patId : formData.patId || '',
        paymentMethod: e.target.paymentMethod.value,
        paymentProvider: e.target.paymentProvider.value,
         total: parseFloat(e.target.outstandBal.value + e.target.amount.value),
        outstandBal: parseFloat(e.target.outstandBal.value),
        amount: parseFloat(e.target.amount.value),
        paymentRefNo: e.target.paymentRefNo.value,
        address: e.target.address.value,
        desc: e.target.desc.value,
        treatmentType: e.target.treatmentType.value,
        paymentStatus: e.target.paymentStatus.value,
        nextPayDueDate: e.target.nextPayDueDate.value,
    };

    try {
        let result;
        if (account?.acctId) {
            // console.log(formData.acctId)
            // Update existing account
            result = await editResource({
                url: `/account/${formData.acctId}`,
                method: 'PUT',
                data: accountData,
            }).unwrap();
            // console.log('Account updated successfully:', result);
            setFormData(null)
            alert('Account updated successfully');
        } else {
            // Create new account
            result = await postResource({
                url: '/account/create',
                data: accountData,
            }).unwrap();
            // console.log('Account created successfully:', result);
            alert('Account created successfully');
        }

        e.target.reset();
        window.location.reload();
        if (!keepOpen) {
            toggleForm();
        }
    } catch (error) {
        console.error('Error saving account:', error.data.error);
        // alert(`Error saving account: ${error.message}`);
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


    //function to handle patient selection
  const handlePatientChange = (e) => {
    const selectedPatientId = e.target.value;
    const selectedPatient = patientData.find((patient) => patient.patId === selectedPatientId);

    if (selectedPatient) {
        setFormData((prev) => ({
            ...prev,
            patId: selectedPatient.patId,
            patName: `${selectedPatient.firstName} ${selectedPatient.lastName}`
        }));
    }
};

    //handles the inut change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={` fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-40`}>
            <div className={`${style.addInfo} fixed bg-gray-800 bg-opacity-50 z-50`}>
                <div className={style.addInfoTop}>
                    <h3>Update Account</h3>
                    <button onClick={handleClose} className={style.close}>X</button>
                </div>
                <form  onSubmit={handleSubmit}>
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
                                                    value={option?.patId}
                                                >
                                                    {option?.firstName} {option?.lastName}
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
                        <input type="text" id="address" name="address" className={style.input} value={formData?.address} />
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select id="paymentMethod" name="paymentMethod" className={style.input} required value={formData?.paymentMethod} onChange={handleInputChange}>
                            <option value="">Select Payment Method</option>
                                <option value="Direct">Direct</option>
                                <option value="NHIS">NHIS</option>
                                <option value="Insurance">Insurance</option>
                                <option value="HMO">HMO</option>
                            </select>
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="nextPayDueDate">Next Payment Date</label>
                            <input type="date" id="nextPayDueDate" name="nextPayDueDate" className={style.input} required  value={formData?.nextPayDueDate} onChange={handleInputChange}/>
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="paymentProvider">Payment Provider</label>
                            
                            <select id="paymentProvider" name="paymentProvider" className={style.input}value={formData?.paymentProvider} required onChange={handleInputChange}>
                                <option value="">Select Payment Provider</option>
                                {/* <option value="Direct">Direct</option> */}
                                <option value="Hires">Hires</option>
                                <option value="Federal Health Care">Federal Health Care</option>
                                <option value="HMO">HMO</option>
                            </select>
                        </div>
                        <div className={style.formChild}>
                        <label htmlFor="paymentRefNo">Payment Reference Number</label>
                        <input type="text" id="paymentRefNo" name="paymentRefNo" className={style.input}  value={formData?.paymentRefNo} onChange={handleInputChange}/>
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="amount">Amount Paid</label>
                            <input type="number" id="amount" name="amount" className={style.input} required value={formData?.amount} onChange={handleInputChange}/>
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="outstandBal">Outstanding Balance</label>
                            <input type="number" id="outstandBal" name="outstandBal" className={style.input} required  value={formData?.outstandBal} onChange={handleInputChange}/>
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="treatmentType">Service/Treatment Type</label>
                            <input type="text" id="treatmentType" name="treatmentType" className={style.input} required value={formData?.treatmentType} onChange={handleInputChange}/>
                        </div>
                        <div className={style.formChild}>
                            <label htmlFor="paymentStatus">Payment Status</label>
                            <select id="paymentStatus" name="paymentStatus" className={style.input} required value={formData?.paymentStatus} onChange={handleInputChange}>
                                <option value="">Select Payment Status</option>
                                <option value="completed">Complete</option>
                                <option value="incomplete">Incomplete</option>
                            </select>
                        </div>
                        <div className={style.formChild}>
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="desc" className={style.input} value={formData?.desc || ''} onChange={handleInputChange}/>
                        </div>
                    </div>                
                    <div className='flex gap-3 justify-center'>
                        <button type="submit" className={`text-white bg-emsBlue ${style.submit}`}>{isLoading ? 'Updating' : 'update'}</button>
                        <button onClick={handleClose} className={`text-white bg-emsRed ${style.submit}`}>Cancel</button>
                    </div>
                    <span className='text-red-500'>{formError}</span>
                </form>
            </div>
        </div>
    );
};

export default ViewAccount;
