import React, { useEffect, useState } from 'react'
import { createContext } from "react";


export let UserContext = createContext();

export default function UserContextProvider({children}) {

    const [userData, setUserData] = useState(null)

  return <UserContext.Provider value={{userData , setUserData}}>
    {[children]}
  </UserContext.Provider>
}
