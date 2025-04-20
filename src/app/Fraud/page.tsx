"use client"

import { useState } from "react"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { FraudLoggerAbi } from "@/abi/FraudLoggerAbi"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function FraudLoggerPage() {
  const [pattern, setPattern] = useState("")
  const [scamType, setScamType] = useState("")
  const [fraudAddr, setFraudAddr] = useState("")
  const { address, isConnected } = useAccount()

  // Contract configuration
  const contractConfig = {
    address: "0x4C00C8874e96fC8484F2aD21BF9E093b8208a5eb",
    abi: FraudLoggerAbi,
  }

  // Read fraud logs
  const {
    data: fraudLogs,
    isLoading: isLogsLoading,
    error: logsError,
    refetch: refetchLogs,
  } = useReadContract({
    address: "0x4C00C8874e96fC8484F2aD21BF9E093b8208a5eb",
    abi: FraudLoggerAbi,
    functionName: "getFraudLogs",
  })

  // Write to contract (log fraud)
  const { writeContract, isPending: isLogging, error: loggingError, isSuccess: logSuccess } = useWriteContract()

  const handleLogFraud = async () => {
    if (!pattern || !scamType || !fraudAddr) {
      alert("Please fill all fields")
      return
    }

    writeContract({
      address: "0x4C00C8874e96fC8484F2aD21BF9E093b8208a5eb",
      abi: FraudLoggerAbi,
      functionName: "logFraud",
      args: [pattern, scamType, fraudAddr],
    })
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-[#0ff] text-2xl font-bold">
            <span className="mr-1">V</span>
            <span className="text-sm">|||||||||||||||</span>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#0ff]">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#0ff]">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#0ff]">
                  Protection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#0ff]">
                  Testimonials
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-4 text-[#0ff]">Fraud Logger</h1>
        <p className="text-xl text-gray-400 mb-10">
          Protect yourself from scams, phishing attempts, and fraudulent websites with our cutting-edge AI technology.
        </p>

        {!isConnected && (
          <div className="bg-black border-l-4 border-[#0ff] p-4 mb-8">
            <p className="text-[#0ff]">Please connect your wallet to interact with the Fraud Logger.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Log Fraud Form */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-[#0ff]">Log New Fraud</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pattern</label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="w-full px-3 py-3 bg-black border border-gray-700 rounded-md text-white focus:border-[#0ff] focus:outline-none focus:ring-1 focus:ring-[#0ff]"
                  placeholder="Describe the fraud pattern"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Scam Type</label>
                <input
                  type="text"
                  value={scamType}
                  onChange={(e) => setScamType(e.target.value)}
                  className="w-full px-3 py-3 bg-black border border-gray-700 rounded-md text-white focus:border-[#0ff] focus:outline-none focus:ring-1 focus:ring-[#0ff]"
                  placeholder="Enter scam type (e.g., Phishing, Rug Pull)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fraudulent Address</label>
                <input
                  type="text"
                  value={fraudAddr}
                  onChange={(e) => setFraudAddr(e.target.value)}
                  className="w-full px-3 py-3 bg-black border border-gray-700 rounded-md text-white focus:border-[#0ff] focus:outline-none focus:ring-1 focus:ring-[#0ff]"
                  placeholder="0x..."
                />
              </div>
              <button
                onClick={handleLogFraud}
                disabled={!isConnected || isLogging}
                className={`px-6 py-3 rounded-md text-black font-medium ${
                  isConnected && !isLogging ? "bg-[#0ff] hover:bg-[#00d8d8]" : "bg-gray-700 cursor-not-allowed"
                }`}
              >
                {isLogging ? "Logging..." : "Log Fraud"}
              </button>
              {loggingError && <p className="text-red-400 text-sm mt-2">Error: {loggingError.message}</p>}
              {logSuccess && <p className="text-[#0ff] text-sm mt-2">Fraud logged successfully!</p>}
            </div>
          </div>

          {/* Fraud Logs Display */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#0ff]">Fraud Logs</h2>
              <button
                onClick={() => refetchLogs()}
                className="flex items-center px-4 py-2 bg-black border border-gray-700 rounded-md text-sm text-[#0ff] hover:bg-gray-800"
              >
                <RefreshCw size={16} className="mr-2" /> Refresh
              </button>
            </div>

            {isLogsLoading ? (
              <p className="text-gray-400">Loading fraud logs...</p>
            ) : logsError ? (
              <div className="flex items-center text-red-400">
                <AlertCircle size={16} className="mr-2" />
                <p>Error loading logs: {logsError.message}</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {Array.isArray(fraudLogs) && fraudLogs.length > 0 ? (
                  fraudLogs.map((log: any, index: number) => (
                    <div key={index} className="border-b border-gray-800 pb-4">
                      <div className="flex justify-between">
                        <span className="font-medium text-[#0ff]">{log.scamType}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(Number(log.timestamp) * 1000).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1 text-gray-300">{log.pattern}</p>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 break-all">
                          <span className="font-medium text-gray-400">Fraud Address:</span> {log.fraudAddr}
                        </p>
                        <p className="text-xs text-gray-500 break-all">
                          <span className="font-medium text-gray-400">Reported by:</span> {log.accountAddress}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No fraud logs found.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Feature buttons */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-[#0ff] flex items-center justify-center mb-4">
              <div className="w-8 h-8 rounded-full border border-[#0ff] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#0ff] rounded-full"></div>
              </div>
            </div>
            <span className="text-gray-300">AI Agent</span>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex flex-col items-center">
            <div className="w-16 h-16 border border-[#0ff] flex items-center justify-center mb-4">
              <div className="w-10 h-6 border-t border-[#0ff]"></div>
              <div className="w-10 h-6 border-t border-[#0ff] mt-1"></div>
            </div>
            <span className="text-gray-300">Email Scan</span>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex flex-col items-center">
            <div className="w-16 h-16 border border-[#0ff] flex items-center justify-center mb-4">
              <div className="w-10 h-6 border-t border-[#0ff]"></div>
              <div className="w-6 h-6 border-t border-[#0ff] mt-1"></div>
            </div>
            <span className="text-gray-300">URL Scan</span>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex flex-col items-center">
            <div className="w-16 h-16 border border-[#0ff] flex items-center justify-center mb-4">
              <div className="w-10 h-6 border-t border-[#0ff]"></div>
              <div className="w-10 h-6 border-t border-[#0ff] mt-1"></div>
              <div className="w-10 h-6 border-t border-[#0ff] mt-1"></div>
            </div>
            <span className="text-gray-300">Website Safe Scan</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex gap-4">
          <button className="px-8 py-3 bg-[#0ff] text-black font-medium rounded-md hover:bg-[#00d8d8]">Scan Now</button>
          <button className="px-8 py-3 bg-transparent border border-[#0ff] text-[#0ff] font-medium rounded-md hover:bg-gray-900">
            Learn More
          </button>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>
    </div>
  )
}
