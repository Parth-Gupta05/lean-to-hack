const hre = require("hardhat");

async function main() {
  const Create = await hre.ethers.getContractFactory("Create");

  // Deploy contract
  const create = await Create.deploy();
  await create.waitForDeployment(); // Fix: use waitForDeployment() instead of deployed()

  // Get contract address
  const contractAddress = await create.getAddress();

  console.log("Contract deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
