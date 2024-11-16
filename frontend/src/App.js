import { useEffect, useState } from "react";
import { app } from "./firebaseConfig";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import axios from "axios"
import "./App.css";
import InfoList from "./component/InfoList";

const auth = getAuth(app)
const provider = new GoogleAuthProvider();



const App = () => {

    const [user, setUser] = useState(null);
    const [name, setName] = useState("")
    const [domain, setDomain] = useState("")
    const [error, setError] = useState(null);
    const [info, setInfo] = useState("")
    console.log(info)

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                console.log(result.user)
            })
            .catch((error) => console.log(error));
    };
    const handleLogout = () => {
        setUser(null);
        auth.signOut();
    }

    const handleSubmit = async() => {
        try {
            if(domain.length !== 0){
                const response = await axios.get(`/api/domain?domain=${domain}`);
                const data = JSON.stringify(response.data)
                setInfo(data);
                setError(null);
            } else {
                setError('Domain field cannot be empty')
                setInfo(null)
            }
            
        } catch (err) {
            setError('Failed to fetch company data');
            setInfo(null);
        }
    }

    useEffect(()=>{
        console.log(user)
    },[user])

    return (
        <div className="container">
            {!user && (
                <button>
                 <img
                    className="btn"
                    onClick={() => handleLogin()}
                    src="https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg"
                    alt="NA"
                    
                />
                
                </button>

            )}
            {user  && (
                <>
                    <div className="user">
                        
                        <label htmlFor="companyName">Company Name</label>
                       
                        <input 
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          id="companyName"/>

<br />
                        
                        <label htmlFor="companyDomain">Company Domain</label>
                        <input
                          type="text"
                          value={domain}
                          onChange={(e) => setDomain(e.target.value)}
                          id="companyDomain" />
                           <br/>
                        <button type="submit" onClick={() => handleSubmit()} className="send">submit</button> 
                        <button onClick={() => handleLogout()} className="logout">Log Out</button>
                        
                        <InfoList data={info} />
                        {/* <pre>{JSON.stringify(info, null, 2)}</pre> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
