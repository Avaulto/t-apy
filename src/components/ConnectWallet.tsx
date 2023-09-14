import React, { useCallback, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletError } from '@solana/wallet-adapter-base';
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { toast } from 'react-toastify';
import RewardTable from './RewardTable';
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
const ConnectWallet = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = 'https://evocative-aged-wish.solana-mainnet.discover.quiknode.pro/a9aa5c76f9878b168043cc3452d267e0bda9dfdb/' //WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => network, [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(() => [
        getPhantomWallet(),
        getSlopeWallet(),
        getSolflareWallet(),
        getLedgerWallet(),
    ], [network]);
    const onError = useCallback(
        (error: WalletError) =>
            toast(error.message),
        []
    );
    return (
        <ConnectionProvider endpoint={network}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <RewardTable/>
                    { /* Your app's components go here, nested within the context providers. */}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default ConnectWallet