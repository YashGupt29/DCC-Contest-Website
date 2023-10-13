import React, { useEffect, createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

const MyContext = createContext(null);

export function useMyContext() {
  return useContext(MyContext);
}

export default function MyContextProvider({ children }) {
  const loginState = useSelector((state) => state.login);
  const [serverData, setServerData] = useState({
    points: null,
    url: null,
    anotherString: null,
  });

  useEffect(() => {
    if (loginState.loggedIn) {
      const requestData = "Anurag";

      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/21days/userDetails",
            {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            }
          );
          debugger;

          if (!response.ok) {
            throw new Error("Failed to post the username to the backend");
          }

          const responseData = await response.json();

          console.log("Username posted to the backend successfully");
          console.log("Server Response:", responseData);

          const { points, url, anotherString } = responseData;
          setServerData({ points, url, anotherString });
        } catch (error) {
          console.error("Failed to post the username to the backend", error);
        }
      };

      fetchData();
    }
  }, [loginState.loggedIn]);

  const contextValue = {
    username: loginState.username,
    ...serverData,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}
