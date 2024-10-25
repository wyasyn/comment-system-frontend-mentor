import Image from "next/image";

export default function Avatar({ src }: { src: string }) {
  return (
    <div className="w-[40px] h-[40px] rounded-full overflow-clip shrink-0">
      <Image
        src={src}
        alt="profile pic"
        width={40}
        height={40}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
