
interface HeaderProps {
    switchTabs: boolean;
    setSwitchTabs: (switchTabs: boolean) => void;
    timeToRegister: string;
    timeToVote: string;
    resetAllStates: () => void;
}

export default function Header({
    switchTabs,
    setSwitchTabs,
    timeToRegister,
    timeToVote,
    resetAllStates
}: HeaderProps) {
    return (
        <div className="w-full flex justify-between items-center px-10">
        <h4 className="text-white">
          {switchTabs ? `Registration available until: ${timeToRegister}` : `Voting available until: ${timeToVote}`}
        </h4>
        <h4
          className="text-white hover:text-blue-500 cursor-pointer"
          onClick={() => {
            resetAllStates();
            setSwitchTabs(!switchTabs);
          }}
        >
          {switchTabs ? "Vote" : "Register"}
        </h4>
      </div>
    );
};