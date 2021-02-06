import React from "react"
import "./ModelView.css"
import SearchPeople from "../SideBar/SearchPeople";
import ProfileSection from "../SideBar/ProfileSection";
import ChatCardsListing from "../SideBar/ChatCardListing"
import ChatSection from "../ChatSection/ChatSection";

function ModelView({authInfo,setCount,setAuthInfo}) {
  return (
    <div className="App" >             
      <div className="left__Side">
        <ProfileSection setCount={setCount} authInfo={authInfo} setAuthInfo={setAuthInfo}/>
          <SearchPeople />
        <ChatCardsListing authInfo={authInfo} /> 
      </div>      
   
      <div className="right__Side">
        <ChatSection authInfo={authInfo} />
      </div>
  </div>
   
  );
}

export default ModelView;
