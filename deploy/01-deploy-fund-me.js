// function deployFunc()
// {

// }

// module.exports.default = deployFunc

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments} = hre

// }
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network, deployments, getNamedAccounts } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const ethUsdPriceFeedAddress = networkConfig[chainId].ethUsd
    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        console.log("AGGREGATORR")
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
        log(ethUsdPriceFeedAddress)
    } else {
        console.log(" NO AGGREGATORR")

        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsd"]
    }

    //when localhost or hardhat network, need to make mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
    })
}
module.exports.tags = ["all", "fundme"]
