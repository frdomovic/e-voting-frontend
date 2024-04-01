interface PageNavigationProps {
    loginWithNEAR: () => void;
    logoutNEAR: () => void;
    isLoggedIn: boolean;
    userAccountId: string;
}

export default function PageNavigation({
    loginWithNEAR,
    logoutNEAR,
    isLoggedIn,
    userAccountId
}: PageNavigationProps) {
    
    return (
        <div className="flex justify-between items-center px-36">
            <div className="flex justify-center items-center">
                <h3 className="text-2xl font-black cursor-pointer">Blockchain Voting.</h3>
            </div>
            <div id="near-options">
                {isLoggedIn && userAccountId ? (
                    <p
                        className="text-black hover:text-blue-500 cursor-pointer text-xl"
                        onClick={logoutNEAR}>{userAccountId}</p>
                ) : (
                    <button
                        className="bg-black hover:bg-gray-700 text-white py-2 px-8 rounded-full text-center flex items-center cursor-pointer text-lg"
                        onClick={loginWithNEAR}>
                     Login
                    </button>
                )}
            </div>
        </div>
    )
}