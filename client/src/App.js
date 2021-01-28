import SearchPeople from "./SideBar/SearchPeople";
import ProfileSection from "./SideBar/ProfileSection";
import ChartCardsListing from "./SideBar/ChartCardListing"
import './App.css';
import ChartSection from "./ChatSection/ChatSection";
import Login from "./LoginPage/Login"

function App() {
  return (
    <>
        { true ? (
          <Login />
        ):  
        (
          <div className="App">
          <div className="left__Side">
            <ProfileSection />
            <SearchPeople />
            <ChartCardsListing />
          </div>

          <div className="right__Side">
            <ChartSection />
          </div>
        </div>
        )
    }
  
    </>
  );
}

export default App;
