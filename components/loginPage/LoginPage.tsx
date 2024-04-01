import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="px-52 pt-52 flex">
      <div>
        <h1
          className="font-display text-5xl font-medium
        w-1/2
        tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"
        >
          Anonymous blockchain voting on NEAR Protocol
        </h1>
        <p className="mt-6 text-xl text-neutral-600">
          Built with NexJS, tailwindCSS, near-sdk-js, near-api-js, nodeJS
        </p>
      </div>
      <Image src={"/voting.png"} height={500} width={700} />
    </div>
  );
}
