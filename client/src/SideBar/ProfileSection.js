import React from 'react'
import "./ProfileSection.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
 
function ProfileSection({setCount,setAuthInfo,authInfo}) {

    const logout=()=>{
        toast.dark("Logging out !!")
        setCount(0)
        setAuthInfo([]) 
    }   
 
    return (
        <div className="profile__Section">
            <div  className="img__Container">
                    <img alt="image" src={authInfo[0].user?.photoURL} />
            </div>
             {authInfo[0].additionalUserInfo?.profile.given_name }
            <div className="action__Items"  onClick={logout}>
                Logout  <ExitToAppIcon  color="error" fontSize="large"/>
            </div>
        </div>
    )
}

export default ProfileSection
