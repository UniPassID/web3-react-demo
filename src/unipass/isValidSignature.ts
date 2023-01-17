import { Contract, providers } from "ethers";
import { hashMessage } from "ethers/lib/utils";

export const EIP1271_SELECTOR = "0x1626ba7e";

/**
 * @param msg the message to be signed
 * @param sig the signature response returned by UniPass
 * @param account the account who signed the message
 * @param rpcUrl the rpc node url
 * @returns boolean true: pass verification, false: failed verification
 */
export const isValidSignature = async (
  _msg: string,
  _sig: string,
  _account: string,
  _rpcUrl: string
): Promise<boolean> => {
  const provider = new providers.JsonRpcProvider(_rpcUrl);
  const contract = new Contract(
    _account,
    [
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "_hash",
            type: "bytes32",
          },
          {
            internalType: "bytes",
            name: "_signature",
            type: "bytes",
          },
        ],
        name: "isValidSignature",
        outputs: [
          {
            internalType: "bytes4",
            name: "magicValue",
            type: "bytes4",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    provider
  );

  const code = await contract.isValidSignature(hashMessage(_msg), _sig);

  return code === EIP1271_SELECTOR;
};
