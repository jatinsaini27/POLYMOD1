# Bridging the NFT Tokens

In this project, we have to make an ERC721 contract, deploy it on the Goerli network, and transfer the NFT to the Polygon Mumbai using  FxPortal Bridge. We have to mint the NFT and deploy it over the goerli network then transfer the NFT to the Mumbai network.

## Description

In this project, firstly we will make an ERC721 contract and then use open Zeppelin from github. In ERC721 contract we will use pragma, a compiler directive that tells us about the solidity version. Then create a contract in which we will make a constructor for assigning name and symbol for the NFT and initialize the token id variable to 1. Then we will create a function of minting which will mint the NFT at the specified address and also return a prompt. Basically this function takes three parameters address to which tokens is minted and prompt which is the description and the ipfs hash which will be the address of the NFT image need to minted. After this we will have a prompt description function which will return the description of the NFT. In gitpod we will import files and then run the scripts to deploy the  contract on the goerli network and transfer it to the polygon network by running the scripts.

## Getting Started

### Executing program

1. Generate a 5-item collection 
2.Store items on IPFS using pinata.cloud
3. Deploy an ERC721 or ERC1155 to the Goerli Ethereum Testnet. We should have a prompt description function on the contract that returns the prompt you used to generate the images
4. Run the command npx hardhat run scripts/deploy.js --network goerli.
5. Write a hardhat script to batch-mint all NFTs. 
6. Write a hardhat script to batch transfer all NFTs from Ethereum to Polygon Mumbai using the FxPortal Bridge
7. Approve the NFTs to be transferred
8. Deposit the NFTs to the Bridge
9. Test balance on Mumbai 
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImageNFTCollection is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter=1;
    mapping(uint256 => string) private _tokenIdToPrompt;

     constructor() ERC721("hello", "h") {
        _tokenIdCounter = 1; 
    }

   

   
    function mintNFT(address recipient, string memory prompt, string memory ipfsHash) external onlyOwner {
        require(_tokenIdCounter <= 5, "All tokens minted");
        uint256 tokenId = _tokenIdCounter;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, ipfsHash);
        _tokenIdToPrompt[tokenId] = prompt;
        _tokenIdCounter++;
    }

    
    function promptDescription(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenIdToPrompt[tokenId];
    }
}


```
Run the below commands and you will get the following output:--


gitpod /workspace/polygonModules/fxPortalStarter (main) $ npx hardhat run scripts/deploy.js --network goerli
Compiled 17 Solidity files successfully
Token address: 0xC9F59Bf91973B635F92d76348759ce70aC99Dd5d
gitpod /workspace/polygonModules/fxPortalStarter (main) $ npx hardhat run scripts/mint.js --network goerli
You now have: 5 tokens
gitpod /workspace/polygonModules/fxPortalStarter (main) $ npx hardhat run scripts/approveDeposit.js --network goerli
Approval confirmed
Tokens deposited
gitpod /workspace/polygonModules/fxPortalStarter (main) $ npx hardhat run scripts/getBalance.js --network goerli
You now have: 5 tokens



## Authors

JATIN SAINI


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
