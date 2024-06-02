import { VotePopupOptions } from "../votePopup/VotePopup";
import { Option } from "./VotingPage";

interface VotingComponentProps {
  votingOptions: Option[];
  setVotePopupProps: (option: VotePopupOptions) => void;
  voteCount: number;
}

export default function VotingComponent({
  votingOptions,
  setVotePopupProps,
  voteCount,
}: VotingComponentProps) {
  return (
    <div className="px-10 py-10">
      <h2 className="text-lg text-white font-bold">Voting Options</h2>
      <div>
        <div className="flex justify-start gap-10 items-center text-white w-full my-2  border-b border-gray-400 mb-8">
          <div className="w-1/2">Name</div>
          <div className="w-1/2 text-end">
            <p>Vote Count</p>
          </div>
          <div className="bg-white rounded-xl px-10 text-black hover:bg-gray-400 cursor-pointer"></div>
        </div>
        {votingOptions.map((option, id) => (
          <div
            key={id}
            className="flex justify-start gap-10 items-center text-white w-full my-2"
          >
            <div className=" w-1/2">
              <div className="flex items-center gap-4">
                <div className="rounded-full w-5 h-5"></div>
                {option.name}{" "}
              </div>
            </div>
            <div className="w-1/2 text-end">
              <p className="text-xl font-black">{option.vote_count}</p>
            </div>
            <button
              className="bg-white rounded-xl px-10 text-black hover:bg-gray-400 cursor-pointer"
              onClick={() =>
                setVotePopupProps({ option: option.name, show: true })
              }
            >
              Vote
            </button>
          </div>
        ))}
        <div className="flex w-full pt-8 gap-8">
          {votingOptions.map((option, index) => {
            const percentage =
              voteCount > 0 ? (option.vote_count / voteCount) * 100 : 0;

            const widthClass = `w-[${percentage}%]`;
            return (
              <div key={index} className="w-1/2">
                <p className="text-white">{option.name}</p>
                <div className="bg-gray-300 overflow-hidden rounded-xl">
                  {percentage > 0 ? <div className={`bg-green-400 rounded-xl ${widthClass}`}>
                    <div className="pl-4">{Math.round(percentage)}%</div>
                  </div> :  <div className="pl-4">{percentage}%</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
