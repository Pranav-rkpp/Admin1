import './AddNewSubscription.css';
import { Link, useNavigate } from "react-router-dom";
import InputField from '../../fields/InputField';
import { useEffect, useState } from 'react';
import Inventory from '../../image/Inventory.png';
import customerCare from '../../image/customerCare.png';
import AssetManagement from '../../image/AssetManagement.png';
import PointOfSale from '../../image/PointOfSale.png';
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import Header from '../../Components/Header';
import Sidebar from '../../Components/Side';
import Footer from '../../Components/Foot';
import '../../css/App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../../hooks/useAuth';
import api from '../../api/details'

function AddNewSubscription() {

    const { OrganisationName, setOrganisationName, eMail, seteMail, contactNo, setContactNo, licenseTerm, setLicenseTerm, licenseExpiry, setLicenseExpiry, setStatus, address, setAddress, subscriptionDate, setSubscritptionDate, subscriptionFor, setSubscriptionFor, contactPerson, setContactPerson, details, authToken, status, setDetails, setOrgType, isLoggedIn, setLoggedIn } = useAuth();

    const navigate = useNavigate();

    const toggleCheckBox = (event) => {
        event.preventDefault();
        const checkbox = event.currentTarget.querySelector('.hidden-input');
        if (checkbox) {
            checkbox.click(); // Trigger the click event to toggle the checkbox
        }
    };

    const handleCheckboxChange = (event) => {
        const number = parseInt(event.target.value);
        if (event.target.checked) {
            // Add number to array
            setSubscriptionFor([...subscriptionFor, number]);
        } else {
            // Remove number from array
            setSubscriptionFor(subscriptionFor.filter((num) => num !== number));
        }
    };

    const resetButton = () => {
        setSubscriptionFor([])
        setOrganisationName('');
        seteMail('');
        setContactNo('');
        setContactPerson('');
        setAddress('');
        setSubscritptionDate('');
        setOrgType('');
        setLicenseTerm('');
        setLicenseExpiry('');
        setStatus('');
    }

    useEffect(() => {
        calculateExpiry();
    }, [subscriptionDate, licenseTerm]);

    const calculateExpiry = () => {
        const startDateObj = new Date(subscriptionDate);
        const expiryDateObj = new Date(startDateObj.getTime() + licenseTerm * 365 * 24 * 60 * 60 * 1000);
        if (!isNaN(expiryDateObj.getTime())) {
            const year = expiryDateObj.getFullYear();
            const month = (expiryDateObj.getMonth() + 1).toString().padStart(2, '0');
            const day = expiryDateObj.getDate().toString().padStart(2, '0');
            setLicenseExpiry(`${year}-${month}-${day} 00:00:00`);
        } else {
            setLicenseExpiry("");
        }
    };

    const formatStartDate = (date) => {
        const expiryDateObj = new Date(new Date(date).getTime());
        const year = expiryDateObj.getFullYear();
        const month = (expiryDateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = expiryDateObj.getDate().toString().padStart(2, '0');
        console.log(`${year}-${month}-${day} 00:00:00`)
        setSubscritptionDate(`${year}-${month}-${day} 00:00:00`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(details)
        const id = details.length > 0 ? parseInt(details[details.length - 1].id) + 1 : 1;
        console.log(id)
        const extraDetail = {
            location: "banga",
            adminName: "menaga",
            authorizationkey: "u9NQGD5OibY9jL7qbU8WfA==",
            authenticationkey: "QW78GH956",
            adminId: "16",
            orgType: 1,
            orgid: 89,
            userId: "77",
            userName: "menaga",
        };

        console.log(extraDetail);

        const newDetail = {
            ...extraDetail,
            id: id,
            organizationName: OrganisationName,
            email: eMail,
            phoneNumber: contactNo,
            licenceterm: licenseTerm,
            contactPerson: contactPerson,
            expirydatetime: licenseExpiry,
            activationstatus: status,
            createddate: subscriptionDate,
            address: address,
            subscriptionFor: subscriptionFor.sort(),
            token: isLoggedIn
        };

        console.log(newDetail);

        try {
            const response = await api.post("/subscription/addNew", newDetail, {
                headers: {
                    "authToken": isLoggedIn
                }
            });
            const AllDetails = [...details, response.data];
            console.log(AllDetails)
            setDetails(AllDetails);
            setSubscriptionFor([])
            setOrganisationName('');
            seteMail('');
            setContactNo('');
            setContactPerson('');
            setAddress('');
            setSubscritptionDate('');
            setOrgType('');
            setLicenseTerm('');
            setLicenseExpiry('');
            setStatus('');
            navigate('/');
        } catch (err) {
            if (err.response) {
                console.log(`Error: ${err.response.status} - ${err.response.statusText}`);
                console.log('Response data:', err.response.data);
            } else {
                console.log(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div className="App">
            <Header />
            <main className="Main">
                <Sidebar />
                <div className='addNewSubscription'>
                    <h2>ADD SUBSCRIPTION</h2>
                    <form onSubmit={handleSubmit} className='addForm'>
                        <InputField classname="orgname" labelName="Organization Name" type="text" placeholder="Enter Organization Name" value={OrganisationName} setValue={setOrganisationName} />
                        <InputField classname="email" labelName="Email" type='text' placeholder='Enter Your Email' value={eMail} setValue={seteMail} />
                        <InputField classname="contactperson" labelName="Contact Person" type='text' placeholder='Enter Contact Person' value={contactPerson} setValue={setContactPerson} />
                        <InputField classname="contactno" labelName="Contact Number" type='text' placeholder='Enter Your Contact Number' value={contactNo} setValue={setContactNo} />
                        <InputField classname="address" labelName="Address" type='text' placeholder='Enter Your Address' value={address} setValue={setAddress} />
                        <div className='licenseTerm'>
                            <InputField classname="licenseterm" labelName="License Term" type='text' placeholder='License Term' value={licenseTerm} setValue={setLicenseTerm} />
                            <IoIosArrowDown className='downarrow' />
                        </div>
                        <div className="field">
                            <label htmlFor='subscriptionstartdate'>Subscription Start Date<span className='star'>*</span></label>
                            <DatePicker
                                id='subscriptionstartdate'
                                selected={subscriptionDate}
                                onChange={date => formatStartDate(date)}
                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                placeholderText='Enter Start Subscription Date'
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor='licenseexpiry'>License Expiry<span className='star'>*</span></label>
                            <input
                                id='licenseexpiry'
                                type='text'
                                placeholder='License Expiry'
                                value={licenseExpiry}
                                required
                                readOnly
                            />
                        </div>

                        <div className='subscriptionForDivision'>
                            <label>SubscriptionFor<span className='star'>*</span></label>
                            <section className='subscriptionFor'>
                                <div className='box1 box' onClick={(e) => { toggleCheckBox(e) }}>
                                    <img src={Inventory} width={40} height={40} />
                                    <div className='checkBox'>
                                        <input type="checkbox" id="myCheckbox1" className="hidden-input" value="0" onChange={(e) => handleCheckboxChange(e)} checked={subscriptionFor.includes(0)} />
                                        <label htmlFor="myCheckbox1" className='hidden-label'>
                                            <FaRegCircleCheck />
                                        </label>
                                    </div>
                                    <p>Inventory</p>
                                </div>
                                <div className='box2 box' onClick={(e) => { toggleCheckBox(e) }}>
                                    <img src={PointOfSale} width={40} height={40} />
                                    <div className='checkBox'>
                                        <input type="checkbox" id="myCheckbox2" className="hidden-input" value="1" onChange={(e) => handleCheckboxChange(e)} checked={subscriptionFor.includes(1)} />
                                        <label htmlFor="myCheckbox2" className='hidden-label'>
                                            <FaRegCircleCheck />
                                        </label>
                                    </div>
                                    <p>Point Of Sales</p>
                                </div>
                                <div className='box3 box' onClick={(e) => { toggleCheckBox(e) }}>
                                    <img src={AssetManagement} width={40} height={40} />
                                    <div className='checkBox'>
                                        <input type="checkbox" id="myCheckbox3" className="hidden-input" value="2" onChange={(e) => handleCheckboxChange(e)} checked={subscriptionFor.includes(2)} />
                                        <label htmlFor="myCheckbox3" className='hidden-label'>
                                            <FaRegCircleCheck />
                                        </label>
                                    </div>
                                    <p>Asset Management</p>
                                </div>
                                <div className='box4 box' onClick={(e) => { toggleCheckBox(e) }}>
                                    <img src={customerCare} width={40} height={40} />
                                    <div className='checkBox'>
                                        <input type="checkbox" id="myCheckbox4" className="hidden-input" value="3" onChange={(e) => handleCheckboxChange(e)} checked={subscriptionFor.includes(3)} />
                                        <label htmlFor="myCheckbox4" className='hidden-label'>
                                            <FaRegCircleCheck />
                                        </label>
                                    </div>
                                    <p>Customer Relationship</p>
                                </div>
                            </section>
                        </div>

                        <div className='Buttons'>
                            <Link to='/'><button type='reset' onClick={resetButton}>Cancel</button></Link>
                            <button type='submit' onClick={(e) => handleSubmit(e)}>Save</button>
                        </div>

                        <div className='selectStatusDivision'>
                            <label>Subscription Status<span className='star'>*</span></label>
                            <div className='selectStatus'>
                                <input required type="radio" name="options" id="option1" onChange={(e) => setStatus("NEW")} />
                                <label htmlFor="option1" >New</label>
                                <input type="radio" name="options" id="option2" onChange={(e) => setStatus("ACTIVE")} disabled />
                                <label htmlFor="option2">Active</label>
                                <input type="radio" name="options" id="option3" onChange={(e) => setStatus("SUSPENDED")} disabled />
                                <label htmlFor="option3">Suspended</label>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default AddNewSubscription;