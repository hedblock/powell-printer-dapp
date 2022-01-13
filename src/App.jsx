import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import { Layout } from "antd";
import NativeBalance from "components/NativeBalance";
import "./style.less";
import Dashboard from "./components/Dashboard/Dashboard";
import logo from "./assets/logo-100x100.png";

const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (!isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto", background: "#fff" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          {
            window.innerWidth > 650 && <h2 style={{marginRight: "auto", marginLeft: "32px"}}>Powell Printer</h2>
          }
          <div style={styles.headerRight}>
            <Chains />
            {
              window.innerWidth > 500 && <NativeBalance />
            }
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img src={logo} style={{height: 50, width: 50, borderRadius: "50%"}} alt={"Powell Printer"}/>
  </div>
);

export default App;
