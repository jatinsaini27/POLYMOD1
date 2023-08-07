// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/ImageNFTCollection.sol/ImageNFTCollection.json");
require('dotenv').config()

const tokenAddress = "0xC9F59Bf91973B635F92d76348759ce70aC99Dd5d"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x67eA8EEAee6442F8542e51017d7aE6e2D94CBdf0"; 

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    for(let i=1;i<=5;i++)
    {
      const tokenID = i;
      const tx = await token.mintNFT(walletAddress,"NFT GENERATED","https://gateway.pinata.cloud/ipfs/QmUSqLZhzrde18pkzZkCusjteu52DReYf21KK315JuecQi?_gl=1*1dy98vb*_ga*MTE0MjA2MTk2NS4xNjg5MzE1NzYx*_ga_5RMPXG14TE*MTY5MTI1NjcxMi45LjEuMTY5MTI1Njc0My4yOS4wLjA.");
      await tx.wait();
    }

    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
