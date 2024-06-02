import LoginPage from "../loginPage/LoginPage";
import PageNavigation from "../pageNavigation/PageNavigation";
import Link from "next/link";
import VotingPage from "../votingPage/VotingPage";

interface WrapperProps {
  loginWithNEAR: () => void;
  logoutNEAR: () => void;
  isLoggedIn: boolean;
  userAccountId: string;
  registerVoter: () => Promise<boolean | undefined>;
}

export default function HomePageWrapper({
  loginWithNEAR,
  logoutNEAR,
  isLoggedIn,
  userAccountId,
  registerVoter,
}: WrapperProps) {
  return (
    <div className="h-screen bg-neutral-950 text-base antialiased pt-2 flex flex-col">
      <div className="w-full bg-white rounded-t-[40px] py-12 flex-1">
        <PageNavigation
          loginWithNEAR={loginWithNEAR}
          logoutNEAR={logoutNEAR}
          isLoggedIn={isLoggedIn}
          userAccountId={userAccountId}
        />
        <div className="flex justify-center items-center pt-32">
        {isLoggedIn && userAccountId ? (
          <VotingPage registerVoter={registerVoter} />
        ) : (
          <LoginPage />
        )}
        </div>
      
      </div>
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[40px] bg-black px-52 h-20 py-8 flex justify-between items-center">
        <Link href={"https://github.com/frdomovic/e-voting-frontend"}>
          <h3 className="text-white hover:text-blue-400 cursor-pointer">
            Repository
          </h3>
        </Link>
        <h3 className="text-white">
          Project: Blockchain, E-Government - Anonymous Blockchain Voting
          Implementation
        </h3>
      </div>
    </div>
  );
}
