🌐 Next.js ETH Wallet

Your gateway to seamless ETH wallet creation and management using cutting-edge technologies.

🚀 About the Project
The Next.js ETH Wallet project lets users generate Ethereum wallets and manage seed phrases directly in their browser. It's built on modern web technologies, ensuring performance, security, and user-friendliness.

Features
🔒 Generate Secure Seed Phrases using BIP39.
📂 Create and Manage Ethereum Wallets with Ethers.js.
⚡ Responsive UI built with Next.js 14.
🛠️ Polyfilled for Browser Compatibility.
🛠️ Tech Stack
Category	Technology
Framework	Next.js
Ethereum SDK	Ethers.js
Mnemonics	BIP39
Styling	Tailwind CSS
Polyfills	Node Polyfills with vite-plugin-node-polyfills
🔧 Installation and Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-repo/nextjs-eth-wallet.git  
cd nextjs-eth-wallet  
2. Install Dependencies
bash
Copy
Edit
npm install  
3. Run the Development Server
bash
Copy
Edit
npm run dev  
Open http://localhost:3000 in your browser.

🌀 How It Works
Seed Phrase Generation
Generate a secure seed phrase using BIP39 and display it in an input box.

javascript
Copy
Edit
import { generateMnemonic } from "bip39";  
const [mnemonic, setMnemonic] = useState("");  

<button onClick={async () => setMnemonic(await generateMnemonic())}>  
  Create Seed Phrase  
</button>  

<input type="text" value={mnemonic} readOnly />  
ETH Wallet Creation
Generate an Ethereum wallet with a derived address using the provided mnemonic.

javascript
Copy
Edit
import { mnemonicToSeed } from "bip39";  
import { Wallet, HDNodeWallet } from "ethers";  

<button onClick={async () => {  
  const seed = await mnemonicToSeed(mnemonic);  
  const hdNode = HDNodeWallet.fromSeed(seed);  
  const childWallet = hdNode.derivePath("m/44'/60'/0'/0");  
  console.log("ETH Address:", childWallet.address);  
}}>  
  Create Wallet  
</button>  
🌟 Features in Action
Generate a 12-word seed phrase in a single click.
Derive Ethereum wallet addresses from seed phrases.
Simple, user-friendly UI for wallet management.
🎨 Screenshot Preview
🌐 Seed Phrase Generation

🔗 Ethereum Wallet Management

📚 Learn More
Check out these resources to dive deeper:

Next.js Documentation
BIP39 Mnemonics
Ethers.js Documentation
🌍 Deployment
Deploy your wallet on Vercel in seconds:


🤝 Contributing
We welcome contributions!

Fork the repository.
Create a new branch: git checkout -b feature-name.
Commit your changes: git commit -m "Added feature".
Push your changes: git push origin feature-name.
Create a Pull Request.
📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

🎉 Let's Build the Future Together!
Have questions or suggestions? Feel free to open an issue or connect with us!
