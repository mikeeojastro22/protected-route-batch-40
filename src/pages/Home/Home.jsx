import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../components/Post/Post.jsx";

function Home() {
    const [userList, setUserList] = useState([]);

    const getUsers = async () => {
      // try-catch - statement used for error handling. Assuming that we always have an error. Executes a specific code block if "try" block fails
      try {
        const response = await axios.get("https://dummyjson.com/users");
        // getting data from response
        const { data } = response;
        setUserList(data.users);
      } catch (error) {
        if(error) {
          return alert("Cannot get users!");
        }
      }
    }

    // react hook that automatically runs as soon as the component is rendered
    // runs if it detects a change in dependency
    // useEffect(callback function, array of dependencies)
    useEffect(() => {
      if(userList.length === 0){
        getUsers();
      }
    });

    return (
      <div className="home">
          <h1>Home</h1>
          {
            userList && 
            userList.map((user) => {
              const { id, firstName, lastName } = user;
              return (
                <div key={id}>
                  <p>ID: {id}</p>
                  <p>Name: {`${firstName} ${lastName}`}</p>
                </div>
              )
            })
          }
          {
            !userList && <div>No users available...</div>
          }
          <Post />
      </div>
    );
  }
  
  export default Home;
  
