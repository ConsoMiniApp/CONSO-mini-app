import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Miner() {
  return (
    <div className="min-h-screen bg-[#5C6E7E]">
      <div className="max-w-md mx-auto bg-black min-h-screen flex flex-col">
        {/* Top Status Card */}
        <div className="relative bg-black p-4 rounded-3xl m-4 border-2 border-neutral-800">
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-2xl text-white tracking-widest">
              CONSO
            </span>
            <Wallet className="text-white h-5 w-5" />
          </div>

          <div className="flex items-center gap-1 mb-4">
            <Image
              src="/placeholder.svg?height=20&width=20"
              width={20}
              height={20}
              alt=""
              className="inline-block"
            />
            <span className="text-yellow-400 text-xl font-bold">4,000,000</span>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="bg-yellow-200 rounded px-3 py-1 text-sm flex items-center gap-1">
              <Image
                src="/placeholder.svg?height=16&width=16"
                width={16}
                height={16}
                alt="Key"
                className="inline-block"
              />
              1
            </div>
            <div className="bg-gray-300 rounded px-3 py-1 text-sm flex items-center gap-1">
              <Image
                src="/placeholder.svg?height=16&width=16"
                width={16}
                height={16}
                alt="Key"
                className="inline-block"
              />
              4
            </div>
            <div className="bg-gray-500 rounded px-3 py-1 text-sm flex items-center gap-1">
              <Image
                src="/placeholder.svg?height=16&width=16"
                width={16}
                height={16}
                alt="Key"
                className="inline-block"
              />
              9
            </div>
          </div>

          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=20&width=20"
                width={20}
                height={20}
                alt="Lightning"
                className="inline-block"
              />
              <span className="text-pink-500">Total Boost:</span>
              <span className="text-white">x4.5</span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=20&width=20"
                width={20}
                height={20}
                alt="Token"
                className="inline-block"
              />
              <span className="text-pink-500">Tap Bonus:</span>
              <span className="text-white">23,456.23</span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=20&width=20"
                width={20}
                height={20}
                alt="Controller"
                className="inline-block"
              />
              <span className="text-pink-500">All Consoles:</span>
              <div className="text-white">
                Play Station 4
                <br />
                Xbox 360
              </div>
            </div>
          </div>

          <div className="bg-pink-500 rounded-lg p-2 text-center text-white">
            <Image
              src="/placeholder.svg?height=16&width=16"
              width={16}
              height={16}
              alt="Token"
              className="inline-block mr-2"
            />
            10 Token added for the ad play
          </div>
        </div>

        {/* Connect Section */}
        <div className="bg-slate-600 flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-bold tracking-wider">
              CONNECT TO EARN
            </span>
            <button className="text-yellow-400 flex items-center">
              LESS
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* PlayStation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="PlayStation"
                  className="inline-block"
                />
                <span className="text-white">PlayStation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">4.5x</span>
                <button className="bg-emerald-500 text-white px-4 py-1 rounded">
                  Mining...
                </button>
              </div>
            </div>

            {/* Xbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="Xbox"
                  className="inline-block"
                />
                <span className="text-white">Xbox</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">3.5x</span>
                <button className="bg-yellow-400 text-black px-4 py-1 rounded">
                  Connect
                </button>
              </div>
            </div>

            {/* Steam */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="Steam"
                  className="inline-block"
                />
                <span className="text-white">Steam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">2.5x</span>
                <button className="bg-yellow-400 text-black px-4 py-1 rounded">
                  Connect
                </button>
              </div>
            </div>

            {/* Nintendo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="Nintendo"
                  className="inline-block"
                />
                <span className="text-white">Nintendo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">2.5x</span>
                <button className="bg-yellow-400 text-black px-4 py-1 rounded">
                  Connect
                </button>
              </div>
            </div>

            {/* Bitboy */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="Bitboy"
                  className="inline-block"
                />
                <span className="text-white">Bitboy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">2.5x</span>
                <button className="bg-gray-700 text-white px-4 py-1 rounded">
                  Soon...
                </button>
              </div>
            </div>

            {/* SuiPlayOx1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="SuiPlayOx1"
                  className="inline-block"
                />
                <span className="text-white">SuiPlayOx1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">2.5x</span>
                <button className="bg-gray-700 text-white px-4 py-1 rounded">
                  Soon...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
