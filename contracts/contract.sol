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

