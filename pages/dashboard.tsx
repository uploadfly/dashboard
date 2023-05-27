import axios from "axios";

const Dashboard = () => {
  return (
    <div>
      <button
        onClick={() => {
          axios.post("http://localhost:1112/logout").then(() => {
            window.location.href = "/";
            console.log("logged out");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
