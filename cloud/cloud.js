Moralis.Cloud.define("get24HrVolume", async () => {
    const web3 = Moralis.web3ByChain("0xa86a");
    return await get24HrVolume(web3);
})

Moralis.Cloud.define("getAvaxPriceUsd", async () => {
    const web3 = Moralis.web3ByChain("0xa86a");
    return await quoteAvaxToUsd(web3, 1);
})

Moralis.Cloud.define("getPowlPriceAvax", async () => {
    const web3 = Moralis.web3ByChain("0xa86a");
    return await quotePowlToAvax(web3, 1);
})

Moralis.Cloud.define("getPowlPriceUsd", async () => {
    const web3 = Moralis.web3ByChain("0xa86a");
    return await quotePowlToAvax(web3, 1);
})

Moralis.Cloud.job("getMarketStats", async () => {

    const MarketStats = Moralis.Object.extend("MarketStats");
    const marketStats = new MarketStats();

    const web3 = Moralis.web3ByChain("0xa86a");
    const volume24HrPowl = await get24HrVolume(web3);
    await marketStats.save({
        volume24HrPowl,
        volume24HrUsd: await quotePowlToUsd(web3, volume24HrPowl),
        avaxPriceUsd: await quoteAvaxToUsd(web3, 1),
        powlPriceAvax: await quotePowlToAvax(web3, 1),
        powlPriceUsd: await quotePowlToUsd(web3, 1),
        blockNumber: await web3.eth.getBlockNumber(),
        timestamp: Math.round(new Date().getTime() / 1000),
    })
})