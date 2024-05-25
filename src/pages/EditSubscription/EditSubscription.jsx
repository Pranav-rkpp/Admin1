import './EditSubscription.css';
import { Link, useNavigate, useParams } from "react-router-dom";
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
import '../../css/App.css'
import useAuth from '../../hooks/useAuth';
import api from '../../api/details'

function EditSubscription() {

    const { id } = useParams();
    const { details, setDetails, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const detail = details.find(info => (info.id).toString() === id);

    const [editOrganisationName, setEditOrganisationName] = useState('');
    const [editeMail, setediteMail] = useState('');
    const [editcontactNo, seteditcontactNo] = useState('');
    const [editContactPerson, setEditContactPerson] = useState('');
    const [editlicenseTerm, seteditlicenseTerm] = useState('');
    const [editlicenseExpiry, seteditlicenseExpiry] = useState('');
    const [editstatus, seteditstatus] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editSubscriptionStartDate, setEditSubscriptionStartDate] = useState('');
    const [editSubscriptionFor, setEditSubscriptionFor] = useState('');

    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        if (detail) {
            setEditOrganisationName(detail.organizationName);
            setediteMail(detail.email);
            seteditcontactNo(detail.phoneNumber);
            setEditContactPerson(detail.contactPerson);
            seteditlicenseTerm(detail.licenceterm);
            seteditlicenseExpiry(detail.expirydatetime);
            seteditstatus(detail.activationstatus);
            setEditAddress(detail.address);
            setEditSubscriptionStartDate(detail.createddate);
            setEditSubscriptionFor(detail.subscriptionFor)
            setSelectedStatus(detail.activationstatus);
        }
        console.log(detail)
    }, [detail, setEditOrganisationName, setediteMail, seteditcontactNo, seteditlicenseTerm, seteditlicenseExpiry, setEditContactPerson, setEditAddress, setEditSubscriptionStartDate, setEditSubscriptionFor])

    //Edit Operation function
    const handleEdit = async (id) => {

        seteditstatus(selectedStatus);
        const oldDetail = (details.filter(info => info.id === id))[0];
        const newDetail = { ...oldDetail, organizationName: editOrganisationName, email: editeMail, phoneNumber: editcontactNo, contactPerson: editContactPerson, licenceterm: editlicenseTerm, expirydatetime: editlicenseExpiry, activationstatus: selectedStatus, address: editAddress, createddate: editSubscriptionStartDate, subscriptionFor: editSubscriptionFor, token: isLoggedIn };
        console.log(newDetail)
        try {
            const response = await api.put("/subscription/update", newDetail, {
                headers: {
                    "authToken": isLoggedIn
                }
            });
            setDetails(details.map(info => (info.id).toString() === id ? { ...response.data } : info));
            setEditOrganisationName('');
            setediteMail('');
            seteditcontactNo('');
            setEditContactPerson('');
            seteditlicenseTerm('');
            seteditlicenseExpiry('');
            seteditstatus('');
            setEditAddress('');
            setEditSubscriptionStartDate('');
            setEditSubscriptionFor([]);
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

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
            setEditSubscriptionFor([...editSubscriptionFor, number]);
        } else {
            // Remove number from array
            setEditSubscriptionFor(editSubscriptionFor.filter((num) => num !== number));
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
    }, [editSubscriptionStartDate, editlicenseTerm]);

    const calculateExpiry = () => {
        const startDateObj = new Date(editSubscriptionStartDate);
        const expiryDateObj = new Date(startDateObj.getTime() + editlicenseTerm * 365 * 24 * 60 * 60 * 1000);
        const formattedExpiryDate = `${expiryDateObj.getFullYear()}-${(expiryDateObj.getMonth() + 1).toString().padStart(2, '0')}-${expiryDateObj.getDate().toString().padStart(2, '0')} ${expiryDateObj.getHours().toString().padStart(2, '0')}:${expiryDateObj.getMinutes().toString().padStart(2, '0')}:${expiryDateObj.getSeconds().toString().padStart(2, '0')}`;

        seteditlicenseExpiry(formattedExpiryDate);
    };

    return (
        <div className="App">
            <Header />
            <main className="Main">
                <Sidebar />
                <div className='addNewSubscription'>
                    <h2>EDIT SUBSCRIPTION</h2>
                    <form className='addForm' onSubmit={(e) => e.preventDefault()}>
                        <div className="field">
                            <label htmlFor='orgname'>Organization Name<span className='star'>*</span></label>
                            <input
                                id='orgname'
                                type='text'
                                placeholder='Enter Organization Name'
                                value={editOrganisationName}
                                required
                                onChange={(e) => setEditOrganisationName(e.target.value)}
                                disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor='email'>Email<span className='star'>*</span></label>
                            <input
                                id='email'
                                type='text'
                                placeholder='Enter Your Email'
                                value={editeMail}
                                required
                                onChange={(e) => setediteMail(e.target.value)}
                                disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'}
                            />
                        </div>

<div className="field">
                            <label htmlFor='contactperson'>Contact Person<span className='star'>*</span></label>
                            <input
                                id='contactperson'
                                type='text'
                                placeholder='Enter Contact Person'
                                value={editContactPerson}
                                required
                                onChange={(e) => setEditContactPerson(e.target.value)}
                                disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor='contactno'>Contact Number<span className='star'>*</span></label>
                            <input
                                id='contactno'
                                type='text'
                                placeholder='Enter Your Contact Number'
                                value={editcontactNo}
                                required
                                onChange={(e) => seteditcontactNo(e.target.value)}
                                disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'}
                            />
                        </div>
                        
                        <div className="field">
                            <label htmlFor='address'>Address<span className='star'>*</span></label>
                            <input
                                id='address'
                                type='text'
                                placeholder='Enter Your Address'
                                value={editAddress}
                                required
                                onChange={(e) => setEditAddress(e.target.value)}
                                disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'}
                            />
                        </div>
                        <div className='licenseTerm'>
                            <div className="field">
                                <label htmlFor='licenseterm'>License Term<span className='star'>*</span></label>
                                <input
                                    id='licenseterm'
                                    type='text'
                                    placeholder='License Term'
                                    value={editlicenseTerm}
                                    required
                                    onChange={(e) => seteditlicenseTerm(e.target.value)}
                                    disabled={editstatus === 'SUSPENDED'}
                                />
                            </div>
                            <IoIosArrowDown className='downarrow' />
                        </div>
                        <div className="field">
                            <label htmlFor='subscriptionstartdate'>Subscription Start Date<span className='star'>*</span></label>
                            <input
                                id='subscriptionstartdate'
                                type='text'
                                placeholder='Subscription Start Date'
                                value={editSubscriptionStartDate}
                                required
                                readOnly
                                disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'}
                            // onChange={(e)=>setEditSubscriptionStartDate(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor='licenseexpiry'>License Expiry<span className='star'>*</span></label>
                            <input
                                id='licenseexpiry'
                                type='text'
                                placeholder='License Expiry'
                                value={editlicenseExpiry}
                                required
                                // onChange={(e) => seteditlicenseExpiry(calculateExpiryDate(editSubscriptionStartDate,editlicenseTerm))}
                                readOnly
                                disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'}
                            />
                        </div>

                        <div className='subscriptionForDivision'>
                            <label>SubscriptionFor<span className='star'>*</span></label>
                            <section className='subscriptionFor'>
                                <div className='box1 box' onClick={(e) => { toggleCheckBox(e) }}>
                                    <img src={Inventory} width={40} height={40} />
                                    <div className='checkBox'>
                                        <input type="checkbox" id="myCheckbox1" className="hidden-input" value="0" onChange={(e) => handleCheckboxChange(e)} checked={editSubscriptionFor.includes(0)} disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'} />
                                        <label htmlFor="myCheckbox1" className='hidden-label'>
                                            <FaRegCircleCheck />
                                        </label>
                                    </div>
                                    <p>Inventory</p>
                                </div>
                                <div className='box2 box' onClick={(e) => { toggleCheckBox(e) }}>
                                    <img src={PointOfSale} width={40} height={40} />
                                    <div className='checkBox'>
                                        <input type="checkbox" id="myCheckbox2" className="hidden-input" value="1" onChange={(e) => handleCheckboxChange(e)} checked={editSubscriptionFor.includes(1)} disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'} />
                                        <label htmlFor="myCheckbox2" className='hidden-label'>
                                            <FaRegCircleCheck />
                                        </label>
                                    </div>
                                    <p>Point Of Sales</p>
                                </div>
                                <div className='box3 box' onClick={(e) => { toggleCheckBox(e) }}>
                                    <img src={AssetManagement} width={40} height={40} />
                                    <div className='checkBox'>
                                        <input type="checkbox" id="myCheckbox3" className="hidden-input" value="2" onChange={(e) => handleCheckboxChange(e)} checked={editSubscriptionFor.includes(2)} disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'} />
                                        <label htmlFor="myCheckbox3" className='hidden-label'>
                                            <FaRegCircleCheck />
                                        </label>
                                    </div>
                                    <p>Asset Management</p>
                                </div>
                                <div className='box4 box' onClick={(e) => { toggleCheckBox(e) }}>
                                    <img src={customerCare} width={40} height={40} />
                                    <div className='checkBox'>
                                        <input type="checkbox" id="myCheckbox4" className="hidden-input" value="3" onChange={(e) => handleCheckboxChange(e)} checked={editSubscriptionFor.includes(3)} disabled={editstatus === 'ACTIVE' || editstatus === 'SUSPENDED'} />
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
                            <button type='submit' onClick={() => handleEdit(detail.id)}>Save</button>
                        </div>

                        <div className='selectStatusDivision'>
                            <label>Subscription Status<span className='star'>*</span></label>
                            <div className='selectStatus'>
                                <input
                                    required
                                    type="radio"
                                    checked={selectedStatus === 'NEW'}
                                    name="options"
                                    id="option1"
                                    onChange={() => setSelectedStatus("NEW")}
                                    disabled={editstatus == 'ACTIVE' || editstatus == 'SUSPENDED'}
                                />
                                <label htmlFor="option1">New</label>

                                <input
                                    type="radio"
                                    checked={selectedStatus === 'ACTIVE'}
                                    name="options"
                                    id="option2"
                                    onChange={() => setSelectedStatus("ACTIVE")}
                                    disabled={editstatus == 'SUSPENDED'}
                                />
                                <label htmlFor="option2">Active</label>

                                <input
                                    type="radio"
                                    checked={selectedStatus === 'SUSPENDED'}
                                    name="options"
                                    id="option3"
                                    onChange={() => setSelectedStatus("SUSPENDED")}
                                    disabled={editstatus === 'NEW'}
                                />
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
export default EditSubscription;