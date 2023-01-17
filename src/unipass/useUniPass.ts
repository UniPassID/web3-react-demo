import { useEffect } from "react";
import { hooks, uniPassWallet } from "./connector";

export default function useUniPass() {
  const { useProvider, useAccount } = hooks;

  const provider = useProvider();
  const account = useAccount();

  const connect = () => {
    return uniPassWallet.activate().catch((e) => {
      console.log(e);
    });
  };

  const connectEagerly = () => {
    return uniPassWallet.connectEagerly();
  };

  const disconnect = () => {
    return uniPassWallet.resetState();
  };

  useEffect(() => {
    uniPassWallet.provider?.on("connect", (value: any) => {
      console.log(`useUniPass connect`);
      console.log(value);
    });
  }, []);

  return {
    connect,
    connectEagerly,
    disconnect,
    provider,
    account,
  };
}
