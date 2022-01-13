import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

function getLibrary(provider) {
  return new Web3(provider)
}

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if(!APP_ID || !SERVER_URL) throw new Error("Missing Moralis Application ID or Server URL. Make sure to set your .env file.");
  if (isServerInfo)
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <App isServerInfo />
        </MoralisProvider>
      </Web3ReactProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Not server Info
      </div>
    );
  }
};

ReactDOM.render(
  <Application />,
  document.getElementById("root")
);
