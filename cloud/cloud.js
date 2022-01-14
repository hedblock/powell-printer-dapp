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