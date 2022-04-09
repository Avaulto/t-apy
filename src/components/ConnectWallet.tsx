import React, { useCallback, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import {
    getLedgerWallet,
    getPhantomWallet,
    getSolflareWallet,
    getSolletExtensionWallet,
    getSolletWallet,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { toast } from 'react-toastify';
import RewardTable from './RewardTable';
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
const ConnectWallet = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(() => [
        getPhantomWallet(),
        // getSlopeWallet(),
        getSolflareWallet(),
        getLedgerWallet(),
        getSolletWallet({ network }),
        getSolletExtensionWallet({ network }),
    ], [network]);
    const onError = useCallback(
        (error: WalletError) =>
            toast(error.message),
        []
    );
    return (
        <ConnectionProvider endpoint={endpoint}>
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