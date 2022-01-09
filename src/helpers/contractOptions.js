import etherprintJson from "../contracts/Etherprint.json";
import distributorJson from "../contracts/Distributor.json";
import ajaxPowlPair from "../contracts/avaxPowlPair.json";
import ajaxUsdcPair from "../contracts/avaxUsdcPair.json";

const getOptions = (json) => ({
    contractAddress: json.contractAddress,
    abi: json.abi,
})

const etherprintOptions = getOptions(etherprintJson);
const distributorOptions = getOptions(distributorJson);
const avaxPowlPairOptions = getOptions(ajaxPowlPair);
const avaxUsdcPairOptions = getOptions(ajaxUsdcPair);

export {etherprintOptions, distributorOptions, avaxPowlPairOptions, avaxUsdcPairOptions}