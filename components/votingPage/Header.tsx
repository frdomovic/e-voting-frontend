
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
          {switchTabs ? `Registration available until: 23.1.2024.` : `Voting available until: 24.1.2024`}
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