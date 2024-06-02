import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="px-52 flex">
      <div className="w-1/2">
        <h1
          className="font-display text-5xl font-medium
        w-1/2
        tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"
        >
          Anonymous blockchain voting on NEAR Protocol
        </h1>
        <p className="mt-6 text-xl text-neutral-600">
          Built with NextJS, tailwindCSS, near-sdk-js, near-api-js, nodeJS
        </p>
      </div>
      <Image src={"/voting.png"} width={700} height={400}/>
    </div>
  );
}
