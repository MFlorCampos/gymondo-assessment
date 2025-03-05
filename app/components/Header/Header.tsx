import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#ff7f66] shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-[100%]">
              <Image
                src="/logo.png"
                alt="Gymondo Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>

            <span className="text-xl font-semibold text-white">Gymondo</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
