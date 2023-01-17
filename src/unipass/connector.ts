import { UniPassTheme } from "@unipasswallet/popup-types";
import { initializeConnector } from "@web3-react/core";
import { UniPass } from "@unipasswallet/web3-react";

export const [uniPassWallet, hooks] = initializeConnector<UniPass>(
  (actions) =>
    new UniPass({
      actions,
      options: {
        chainId: 5,
        returnEmail: true,
        appSettings: {
          appName: "web3-react test for unipass",
          theme: UniPassTheme.DARK,
        },
      },
    })
);
