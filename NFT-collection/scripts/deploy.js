const { ethers } = require("ethers");
const hre = require("hardhat");

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("NFTee");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("nftContract address: ", nftContract.address);
};

const runMain = (async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
