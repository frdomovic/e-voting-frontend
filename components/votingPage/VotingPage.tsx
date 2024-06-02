import axios from "axios";
import { useState, useEffect } from "react";
import Registration from "../registration/Registration";
import VotePopup from "../votePopup/VotePopup";
import Header from "./Header";
import VotingComponent from "./VotingComponent";
import * as crypto from "crypto";
import cryptoRandomString from "crypto-random-string";

export interface Option {
  name: string;
  vote_count: number;
}

interface VotingPageProps {
  registerVoter: () => Promise<boolean | undefined>;
}

interface castVoteResponse {
  response: string;
}
interface addKeyResponse {
  response: boolean;
  error?: string;
}

const RELAYER_URL = process.env.NEXT_PUBLIC_RELAYER_ADDRESS ?? "";

export default function VotingPage({ registerVoter }: VotingPageProps) {
  const [switchTabs, setSwitchTabs] = useState(false);

  const [votingOptions, setVotingOptions] = useState<Option[]>([]);

  const [voteCount, setVoteCount] = useState(0);

  const [timeToVote, setTimeToVote] = useState("");

  const [timeToRegister, setTimeToRegister] = useState("");

  const [votePopupProps, setVotePopupProps] = useState({
    option: "",
    show: false,
  });

  const [secretKey, setSecretKey] = useState("");

  function resetAllStates() {
    setRegistrationLoading(false);
    setRegistrationStep(false);
    setRegistrationError("");
    setGeneratedVotingKey("");
    setVotingError("");
    setDidVoteSuceeded(false);
    setVotingLoading(false);
    setSecretKey("");
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${RELAYER_URL}/viewVotingOptions`);
      const options = JSON.parse(response.data.response);
      const totalVotes = options.reduce(
        (total: number, option: Option) => total + option.vote_count,
        0
      );
      setVoteCount(totalVotes);
      setVotingOptions(options);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(`${RELAYER_URL}/viewTimeLimits`);
      const limits = JSON.parse(response.data.response);
      if (limits.voteTime && limits.registerTime) {
        setTimeToVote(timestampToDate(limits.voteTime * 1));
        setTimeToRegister(timestampToDate(limits.registerTime * 1));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}.`;
  }

  const [votingError, setVotingError] = useState("");
  const [didVoteSuceeded, setDidVoteSuceeded] = useState(false);
  const [votingLoading, setVotingLoading] = useState(false);

  async function castVote() {
    setVotingError("");
    setVotingLoading(true);
    const votingOption = votePopupProps.option;

    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const response = await fetch("/api/castVote", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        voting_option: votingOption,
        key: secretKey,
      }),
    });
    const result: castVoteResponse = await response.json();
    setVotingLoading(false);
    await fetchData();
    // @ts-ignore
    if (result.response.error) {
      // @ts-ignore
      setVotingError(result.response.error);
    } else {
      setDidVoteSuceeded(true);
    }
  }

  const encodeSecretKey = (plainKey: string) => {
    try {
      const encodedText = Buffer.from(plainKey, "utf-8");
      const hash = crypto.createHash("sha256").update(encodedText).digest();
      // @ts-expect-error
      const hexHash = Buffer.from(hash, "hex");
      const uint8ArrayHashString = new Uint8Array(hexHash).toString();
      return uint8ArrayHashString;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [generatedVotingKey, setGeneratedVotingKey] = useState("");

  async function addKey(encodedKey: string) {
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const response = await fetch("/api/addSecretKey", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        key: encodedKey,
      }),
    });
    const result: addKeyResponse = await response.json();
    if (result.error) {
      console.error(result.error);
      return result.error;
    } else {
      return result.response;
    }
  }

  function resetRegistrationState() {
    setRegistrationError("");
    setGeneratedVotingKey("");
    setRegistrationStep(false);
  }

  async function startRegistration() {
    try {
      resetRegistrationState();
      setRegistrationLoading(true);
      const response = await registerVoter();

      if (response) {
        const plainKey = cryptoRandomString({ length: 64, type: "url-safe" });
        const encodedKey = encodeSecretKey(plainKey);

        const addKeyReponse = await addKey(encodedKey);

        if (addKeyReponse) {
          setRegistrationStep(true);
          setGeneratedVotingKey(plainKey);
        } else {
          setGeneratedVotingKey("");
        }
      } else {
        setRegistrationError("Voter already registered.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRegistrationLoading(false);
    }
  }

  return (
    <div className="rounded-3xl bg-black p-4 flex flex-col w-[700px]">
      {votePopupProps.show && (
        <VotePopup
          castVote={castVote}
          votePopupProps={votePopupProps}
          setVotePopupProps={setVotePopupProps}
          setSecretKey={setSecretKey}
          votingError={votingError}
          didVoteSuceeded={didVoteSuceeded}
          votingLoading={votingLoading}
          secretKey={secretKey}
          setVotingError={setVotingError}
          resetAllStates={resetAllStates}
          fetchAgain={() => fetchData()}
        />
      )}
      <Header
        switchTabs={switchTabs}
        setSwitchTabs={setSwitchTabs}
        timeToRegister={timeToRegister}
        timeToVote={timeToVote}
        resetAllStates={resetAllStates}
      />
      {switchTabs ? (
        <Registration
          startRegistration={startRegistration}
          registrationLoading={registrationLoading}
          registrationStep={registrationStep}
          registrationError={registrationError}
          generatedVotingKey={generatedVotingKey}
          resetRegistrationState={resetRegistrationState}
        />
      ) : (
        <VotingComponent
          votingOptions={votingOptions}
          setVotePopupProps={setVotePopupProps}
          voteCount={voteCount}
        />
      )}
    </div>
  );
}
