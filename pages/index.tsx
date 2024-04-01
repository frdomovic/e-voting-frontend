import { useRouter } from "next/router";
import HomePageWrapper from "../components/homePageWrapper/HomePageWrapper";
import getNearObjects from "../utils/getNearObjects";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const router = useRouter();
  const { loginWithNEAR, logoutNEAR, isLoggedIn, getLoggedInAccount, registerVoter } = getNearObjects();
 
  const [userAccountId, setUserAccountId] = useState("");

  useEffect(()=>{
      const setAccountId = async() => {
          const accountId = await getLoggedInAccount();
          if(accountId) {
              setUserAccountId(accountId);
          }
      }
      if (isLoggedIn) {
          setAccountId();
      } else {
          setUserAccountId("");
      }
      
  },[isLoggedIn])
  
  return (
    <HomePageWrapper
      loginWithNEAR={loginWithNEAR}
      logoutNEAR={logoutNEAR}
      isLoggedIn={isLoggedIn}
      userAccountId={userAccountId}
      registerVoter={registerVoter}
    />
  );
}
