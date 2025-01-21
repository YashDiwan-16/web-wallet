"use client";
import { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copying, setCopying] = useState<number | null>(null);

  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  const handleCreateWallet = async () => {
    if (!mnemonic) return;
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(child.privateKey);
    setAddresses([...addresses, wallet.address]);
    setCurrentIndex(currentIndex + 1);
  };

  const copyToClipboard = async (text: string, index?: number) => {
    await navigator.clipboard.writeText(text);
    setCopying(index ?? -1);
    setTimeout(() => setCopying(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <Card className="border-none bg-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-white">
              Ethereum Wallet Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button
                onClick={handleGenerateMnemonic}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generate New Seed Phrase
              </Button>

              <div className="relative">
                <Input
                  value={mnemonic}
                  readOnly
                  className="w-full bg-gray-700/50 text-white border-gray-600"
                />
                {mnemonic && (
                  <Button
                    onClick={() => copyToClipboard(mnemonic)}
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Copy
                      className={`h-4 w-4 ${
                        copying === -1 ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                  </Button>
                )}
              </div>

              <Button
                onClick={handleCreateWallet}
                disabled={!mnemonic}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
              >
                Create New Wallet
              </Button>
            </div>

            <motion.div layout className="space-y-4">
              {addresses.map((addr, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative group"
                >
                  <Card className="bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                    <CardContent className="py-4 pr-12">
                      <p className="text-sm font-medium text-gray-300">
                        Wallet {idx + 1}
                      </p>
                      <p className="text-white font-mono text-sm truncate">
                        {addr}
                      </p>
                    </CardContent>
                    <Button
                      onClick={() => copyToClipboard(addr, idx)}
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy
                        className={`h-4 w-4 ${
                          copying === idx ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
