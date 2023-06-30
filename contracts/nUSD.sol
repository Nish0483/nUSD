// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";  //using oppen zepplin erc20 library
import "./AggregatorV3Interface.sol";
contract nUSD is ERC20 {
    
    AggregatorV3Interface public priceFeed;
    uint256 public ethPrice;
    
   
    constructor() ERC20("newStablecoin", "nUSD") 
    {
        _mint(msg.sender, 10000000 * (10**decimals()));  // initial supply minting using constructor
        priceFeed=AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        updateEthPrice();
    } 


    function updateEthPrice() internal {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid ETH price");
        ethPrice = uint256(price)/1e8;
    }


    function depositETH(uint ethAmount) public payable {
        
        ethAmount=ethAmount/1000000000000000000;
        require(ethAmount> 0, "Amount must be greater than zero");
         uint256 nusdAmount = (ethAmount * ethPrice)/2;          //token logic
        _mint(msg.sender, nusdAmount * (10**decimals()));   //openzepplin mint function
        
        
    }

    function redeemETH(uint256 nusdAmount) public payable {
        require(nusdAmount > 0, "Amount must be greater than zero");
        uint256 ethAmount = (nusdAmount/ethPrice);   //token logic
        require(address(this).balance >= ethAmount, "Insufficient nUSD balance");
         _burn(msg.sender, nusdAmount * (10**decimals())); //openzepplin burn function
        uint ethToUser=ethAmount*1000000000000000000;
        payable(msg.sender).transfer(ethToUser);
        
    }
   
}