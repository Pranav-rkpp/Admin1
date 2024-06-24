import { FaRegEdit } from "react-icons/fa";
import './TableData.css';
import { Link } from "react-router-dom";


function TableData({ details }) {

    return (
        <table className='tableData' style={{ borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Organization Name</th>
                    <th>e-Mail</th>
                    <th>Contact No</th>
                    <th>Org Type</th>
                    <th>License Term</th>
                    <th>License Expiry</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {details.map((detail, index) => (
                    <tr key={index}>
                        <td>{detail.organizationName}</td>
                        <td>{detail.email}</td>
                        <td>{detail.phoneNumber}</td>
                        <td>{detail.orgType}</td>
                        <td>
                            {
                                detail.licenceterm === '30' ? "Trail" :
                                    detail.licenceterm === '90' ? "Quater-yearly" :
                                        detail.licenceterm === '180' ? "Half-yearly" : "Yearly"
                            }
                        </td>
                        <td>{detail.expirydatetime}</td>
                        <td style={{ textAlign: 'center' }}>
                            {
                                detail.activationstatus === "SUSPENDED" ? <span className="status" style={{ backgroundColor: 'rgb(229, 35, 0)' }}>{detail.activationstatus}</span>
                                    : (
                                        detail.activationstatus === "NEW" ?
                                            <span className="status" style={{ backgroundColor: 'rgb(154, 97, 155)' }}>{detail.activationstatus}</span>
                                            : <span className="status">{detail.activationstatus}</span>
                                    )
                            }
                        </td>
                        <td><Link to={`/EditSubscription/${detail.id}`}><FaRegEdit /></Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default TableData;