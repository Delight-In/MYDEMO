import UserProfile from '../Profile/UserProfile.jsx';
import './Dashboard.css';

const Dashboard = ({ user, logout }) => {
  
  return (
    <div className="dashboard">
      {/* <div className="dashboard-header">
        <div className="welcome-section">
           <h1>Welcome back, {user?.name}!</h1> 
        </div>
      </div> */}

      <UserProfile />
    </div>
  );
};

export default Dashboard;