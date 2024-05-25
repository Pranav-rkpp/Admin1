import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [details, setDetails] = useState([]);
    const [OrganisationName, setOrganisationName] = useState('');
    const [eMail, seteMail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [orgType, setOrgType] = useState('');
    const [licenseTerm, setLicenseTerm] = useState('');
    const [licenseExpiry, setLicenseExpiry] = useState('');
    const [status, setStatus] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [address, setAddress] = useState('');
    const [subscriptionDate, setSubscritptionDate] = useState('');
    const [subscriptionFor, setSubscriptionFor] = useState([]);
    
    const [authToken, setAuthToken] = useState('');
    
    const authorizationToken = JSON.parse(localStorage.getItem('AuthToken')) || []
    // console.log(authorizationToken.AuthorizationToken)
    const [isLoggedIn, setLoggedIn] = useState(authorizationToken.AuthorizationToken || false)

    return (
        <AuthContext.Provider value={{ details, setDetails, username, setUsername, password, setPassword, authToken, setAuthToken, OrganisationName, setOrganisationName, eMail, seteMail, contactNo, setContactNo, licenseTerm, setLicenseTerm, licenseExpiry, setLicenseExpiry, setStatus, address, setAddress, subscriptionDate, setSubscritptionDate, subscriptionFor, setSubscriptionFor, contactPerson, setContactPerson, status, orgType, setOrgType, isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;