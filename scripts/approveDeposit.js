// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/ImageNFTCollection.sol/ImageNFTCollection.json");

const tokenAddress = "0xC9F59Bf91973B635F92d76348759ce70aC99Dd5d";
const tokenABI = tokenContractJSON.abi;
const fxERC721RootAddress = " 0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0x67eA8EEAee6442F8542e51017d7aE6e2D94CBdf0"; 

async function main() {

    const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC721RootAddress);

    const approveTx = await tokenContract.approve(fxERC721RootAddress, 5);
    await approveTx.wait();

    console.log('Approval confirmed');


    const depositTx = await fxContract.deposit(tokenAddress, walletAddress, 5, "0x6556");
    await depositTx.wait();

    console.log("Tokens deposited");
}
  

  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
 });
