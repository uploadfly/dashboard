import axios from "axios";

const Dashboard = () => {
  return (
    <div>
      <button
        onClick={() => {
          axios
            .post("http://localhost:1112/logout", null, {
              withCredentials: true,
            })
            .then((data) => {
              console.log("logged out");
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
