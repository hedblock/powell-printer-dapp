// printer utils

const get24HrVolume = async (web3) => {
    const powellContract = getPrinter();
    const powellPrinter = new web3.eth.Contract(powellContract.abi, powellContract.contractAddress);

    let volume = 0;
    let feeExempt = {};
    const options = {
        fromBlock: await getStartBlock(web3),
        toBlock: "latest"
    }
    const events = await powellPrinter.getPastEvents("Transfer", options);
    events.forEach(event => {
        // if(feeExempt[event.returnValues.from] === undefined){
        //     feeExempt[event.returnValues.from] = await printerContract.methods._shouldTakeFee(event.returnValues.from).call();
        // }
        volume += feeExempt[event.returnValues.from] ? 0 : Number(event.returnValues.value) / 10 ** 6;
    })
    return volume;
}

const getStartBlock = async (web3) => {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const latestBlockWrapper = await getBlockWrapper(web3, latestBlockNumber);
    const firstBlockWrapper = await getBlockWrapper(web3, 1);
    const blocktime = (latestBlockWrapper.timestamp - firstBlockWrapper.timestamp) / (latestBlockNumber - 1);
    return parseInt(latestBlockNumber - (24 * 60 * 60) / blocktime, 10);
}

const getBlockWrapper = async (web3, block) => {
    let { timestamp } = await web3.eth.getBlock(block);
    return { timestamp, block};
}

// pair utils

const quotePowlToUsd = async (web3, amountPowl) => {
    return quoteAvaxToUsd(web3, await quotePowlToAvax(web3, amountPowl));
}

// Need to update this if token0 and token1 change
const quotePowlToAvax = async (web3, amountPowl) => {
    const avaxPowlPairContract = getAvaxPowlPair();
    const avaxPowlPair = new web3.eth.Contract(avaxPowlPairContract.abi, avaxPowlPairContract.contractAddress);

    const reserves = await avaxPowlPair.methods.getReserves().call();
    return amountPowl * reserves._reserve1 / (reserves._reserve0 * 10 ** 12);
}

const quoteAvaxToUsd = async (web3, amountAvax) => {
    const avaxUsdcPairContract = getAvaxUsdcPair();
    const avaxUsdcPair = new web3.eth.Contract(avaxUsdcPairContract.abi, avaxUsdcPairContract.contractAddress);

    const reserves = await avaxUsdcPair.methods.getReserves().call();
    return amountAvax * (reserves._reserve0 * 10 ** 12) / reserves._reserve1;
}

