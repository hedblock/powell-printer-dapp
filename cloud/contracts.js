const getPrinter = () => {
    return {
        abi: [...Moralis.Web3.abis.erc20],
        contractAddress: "0x7727cf1c504f660f3a6b8f14106edceb88b73fed",
    }
}

const getAvaxPowlPair = () => {
    return {
        abi: [{
            "inputs": [],
            "name": "getReserves",
            "outputs": [
                {
                    "internalType": "uint112",
                    "name": "_reserve0",
                    "type": "uint112"
                },
                {
                    "internalType": "uint112",
                    "name": "_reserve1",
                    "type": "uint112"
                },
                {
                    "internalType": "uint32",
                    "name": "_blockTimestampLast",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        contractAddress: "0x9D3Ad6e8a82A64665040fB365495aDE07F86BdC8",
    }
}

const getAvaxUsdcPair = () => {
    return {
        abi: [{
            "inputs": [],
            "name": "getReserves",
            "outputs": [
                {
                    "internalType": "uint112",
                    "name": "_reserve0",
                    "type": "uint112"
                },
                {
                    "internalType": "uint112",
                    "name": "_reserve1",
                    "type": "uint112"
                },
                {
                    "internalType": "uint32",
                    "name": "_blockTimestampLast",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }],
        contractAddress: "0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1",
    }
}