import {useCallback} from "react";
import {useMoralis} from "react-moralis";

import * as options from '../helpers/contractOptions';

const EventEmitter = require('events');

const optionsMap = {
    "Etherprint": options.etherprintOptions,
    "Distributor": options.distributorOptions,
    "PowlPair": options.avaxPowlPairOptions,
    "USDCPair": options.avaxUsdcPairOptions
}

const useExecuteFunction = () => {

    const {Moralis, account} = useMoralis();

    const executeFunction = useCallback(async ({
       contractName,
       functionName,
       params = {},
       msgValue = 0,
       awaitReceipt = true
   }) => {

        let web3 = await Moralis.enableWeb3();

        const {abi, contractAddress} = optionsMap[contractName];

        const contractOptions = {};

        const functionData = abi.find(x => x.name === functionName);

        if (!functionData) throw new Error('Function does not exist in abi');

        const stateMutability = functionData?.stateMutability;

        const isReadFunction = stateMutability === 'view' || stateMutability === 'pure';

        if (!isReadFunction) {
            if (!params.from) {
                const currentAddress = account;
                if (!currentAddress) throw new Error('From address is required');
                contractOptions.from = currentAddress;
            }
        }

        const errors = [];

        for (const input of functionData.inputs) {
            const value = params[input.name];
            if (!(typeof value !== 'undefined')) {
                errors.push(`${input.name} is required`);
            }
        }

        if (errors.length > 0) {
            throw errors;
        }

        const parsedInputs = functionData.inputs.map(x => {
            return params[x.name];
        });

        const contract = new web3.eth.Contract(abi, contractAddress, contractOptions);

        const customFunction = contract.methods[functionName];

        const response = isReadFunction
            ? customFunction(...Object.values(parsedInputs)).call()
            : customFunction(...Object.values(parsedInputs)).send(msgValue ? { value: msgValue } : null);

        if (awaitReceipt) return response;

        const contractExecuteEvents = new EventEmitter();

        response
            .on('transactionHash', hash => {
                contractExecuteEvents.emit('transactionHash', hash);
            })
            .on('receipt', receipt => {
                contractExecuteEvents.emit('receipt', receipt);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                contractExecuteEvents.emit('confirmation', (confirmationNumber, receipt));
            })
            .on('error', error => {
                contractExecuteEvents.emit('error', error);
                throw error;
            });

        return contractExecuteEvents;

    }, [Moralis, account]);

    const call = useCallback(async (contractName, functionName, params = {}) => {
        return executeFunction({
            contractName,
            functionName,
            params
        })
    }, [executeFunction]);

    return {executeFunction, call}
}

export default useExecuteFunction;