import { Button } from "antd";
import { AvaxLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
  },
};

const chainId_const = 43114;
const chainName = "Avalanche Mainnet";
const currencyName = "AVAX";
const currencySymbol = "AVAX";
const rpcUrl = "https://api.avax.network/ext/bc/C/rpc";
const blockExplorerUrl = "https://cchain.explorer.avax.network/";

const avalancheChain = {
  key: "0xa86a",
  value: "Avalanche",
  icon: <AvaxLogo />,
}

function Chains() {
  const { switchNetwork, chainId } = useChain();
  const { Moralis } = useMoralis();

  const handleClick = async (e) => {
    try {
      await switchNetwork(avalancheChain.key);
    } catch (err) {
      await Moralis.addNetwork(
        chainId_const,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
      )
    }
  };

  if (!chainId) return null;

  return (
    <div>
      {
        chainId === avalancheChain.key
        ? <Button
                key={avalancheChain.key}
                icon={avalancheChain.icon}
                style={{ ...styles.button, ...styles.item }}
            >
            <span style={{ marginLeft: "5px" }}>{avalancheChain.value}</span>
          </Button>
        : <Button
                key={avalancheChain.key}
                style={{ ...styles.button, ...styles.item }}
                onClick={handleClick}
            >
            <span style={{ marginLeft: "5px" }}>Switch Network</span>
          </Button>
      }
    </div>
  );
}

export default Chains;
