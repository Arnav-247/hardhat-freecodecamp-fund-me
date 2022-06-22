const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Funding...")
    transactionResponse = fundMe.cheaperWithdraw()
    await transactionResponse.wait(1)
    console.log("Got it back!")
}
