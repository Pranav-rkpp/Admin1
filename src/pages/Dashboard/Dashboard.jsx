import './Dashboard.css';
import { useEffect, useState } from "react";
import TableData from "./TableData";
import { Link, Outlet } from "react-router-dom";
import { LuArrowRightCircle } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import Footer from '../../Components/Footer/Foot';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Side/Side';
import useAuth from '../../hooks/useAuth';
import api from '../../api/details'


const Dashboard = () => {
    let { details, setDetails } = useAuth();
    const [search, setSearch] = useState('');

    details = details.filter(detail => (detail.organizationName &&
        ((detail.organizationName).toLowerCase()).includes(search.toLowerCase())))

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(7);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = details.slice(firstPostIndex, lastPostIndex);

    const totalPosts = details.length;
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) pages.push(i);

    const { setLoggedIn } = useAuth();

    //Read Operation
    useEffect(() => {
        const fetchDetails = async () => {
            const AuthToken = JSON.parse(localStorage.getItem('AuthToken'))
            try {
                const response = await api.get("/subscription/getAll", {
                    headers: {
                        "authToken": AuthToken.AuthorizationToken
                    }
                });
                console.log(response.data);
                const TempDetails = response.data
                console.log(JSON.parse(localStorage.getItem('AuthToken')))
                if (TempDetails.length > 0) {
                    setDetails(TempDetails);
                }
                else {
                    localStorage.removeItem('AuthToken')
                    setLoggedIn(false)
                }
            }
            catch (err) {
                if (err.message) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
                else {
                    console.log(`Error : ${err.message}`);
                }
            }
        }
        fetchDetails();
    }, []);

    const handleLogout = () => {
        const userConfirmed = confirm("Are you sure you want to log out?");
        if (userConfirmed) {
            localStorage.removeItem('AuthToken');
            setLoggedIn(false);
        }
    }

    return (
        <div className="App">
            <Header />
            <main className="Main">
                <Sidebar />
                <main className="Content">
                    <h2>Subscription</h2>
                    <section className='functionality'>
                        <div className="searchBar">
                            <IoSearch />
                            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            <LuArrowRightCircle />
                        </div>
                        <div className='statusMessage'>
                            <span>All({details.length})</span>
                            <span style={{ backgroundColor: '#9A619B', borderRadius: '3px', color: '#E0E5EC' }}>New({
                                (details.filter(detail => detail.activationstatus === "NEW")).length
                            })</span>
                            <span style={{ backgroundColor: '#649B61', borderRadius: '3px', color: '#E0E5EC' }}>Active({
                                (details.filter(detail => detail.activationstatus === "ACTIVE")).length
                            })</span>
                            <span style={{ backgroundColor: '#E52300', borderRadius: '3px', color: '#E0E5EC' }}>Suspended({
                                (details.filter(detail => detail.activationstatus === "SUSPENDED")).length
                            })</span>
                        </div>
                        <button><Link to='/AddNewSubscription' style={{ color: '#F4F4F4', textDecoration: 'none' }}>Add New Subscription</Link></button>
                        <button onClick={() => handleLogout()}>Export</button>
                    </section>
                    <TableData
                        details={currentPosts}
                    />
                    <div className="Pagination">
                        {
                            pages.map((page, index) => {
                                return <button style={{ border: 'none', marginLeft: '2px', marginRight: '2px', cursor: "pointer" }} key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                            })
                        }
                    </div>
                </main>
            </main>

            <Footer />
        </div>
    );
}

export default Dashboard;