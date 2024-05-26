
interface HeaderProps {
    switchTabs: boolean;
    setSwitchTabs: (switchTabs: boolean) => void;
    timestampToDate: (timestamp: number) => string;
    timeToRegister: number;
    timeToVote: number;
    resetAllStates: () => void;
}

export default function Header({
    switchTabs,
    setSwitchTabs,
    timestampToDate,
    timeToRegister,
    timeToVote,
    resetAllStates
}: HeaderProps) {
    return (
        <div className="w-full flex justify-between items-center px-10">
        <h4 className="text-white">
          {switchTabs ? `Registration available until: ${timestampToDate(timeToRegister)}` : `Voting available until: ${timestampToDate(timeToVote)}`}
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