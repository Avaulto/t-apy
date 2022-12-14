import React, { FC, useEffect, useState } from 'react'
import btnBG from '../assets/btn-bg.png';
import Select from 'react-select'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AccountInfo, PublicKey } from '@solana/web3.js';
import { FaExchangeAlt } from "react-icons/fa";

const searchBoxStyle = {
    flex: '1',
    background: '#ffffff61',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    padding: '25px',
    borderRadius: '10px'
}
const inputStyle = {
    textAlign: 'center' as const,
    textTransform: 'capitalize' as const,
    margin: '5px 0',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderColor: '#9a61d2',
    zIndex: 2,
    height: '40px',
    background: 'white',
    outline: 0,
    display: 'flex',
    flex: '1',
    // textAlign:'center'
}
const accountInputWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}
const switchBtn = {
    height: '40px',
    borderRadius: '8px',
    border: ' 1px solid white',
    background: '#9f5fcd',
    color: 'white',
    width: '40px',
    marginLeft: '16px'
}
const btnStyle = {
    backgroundImage: 'url(' + btnBG + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    // te: 'capitalize',
    opacity: '0.9',
    borderRadius: '8px',
    transition: '0.3s ease',
    zIndex: 0
}

interface SearchBoxData {
    currentEpoch: number;
    fetchRewards: Function;
}
const SearchBox: FC<SearchBoxData> = ({ currentEpoch, fetchRewards }) => {
    const { connected, publicKey }: any = useWallet();
    const { connection } = useConnection();
    const [stakeAccount, setstakeAccount]: any = useState([])
    const [useFetchBtn, setuseFetchBtn] = useState(false)
    const customStyles = {
        control: () => (inputStyle)
    }
    useEffect(() => {
        if (connected) {
            setTimeout(() => {
                fetchAttachedStakeAccounts()
            }, 1000);
        }
    }, [connected])

    const fetchAttachedStakeAccounts = async () => {
        setstakeAccount([])
        const stakeProgram: PublicKey = new PublicKey("Stake11111111111111111111111111111111111111");
        const voteProgram: PublicKey = new PublicKey("Vote111111111111111111111111111111111111111");
        try {
            const fetchedStakeAccounts: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
                await connection.getProgramAccounts(stakeProgram, {
                    filters: [{
                        memcmp: {
                            offset: 12,
                            bytes: publicKey?.toBase58()
                        }
                    }
                    ]
                })
            const fetchedVoteAccounts: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
                await connection.getProgramAccounts(voteProgram, {
                    filters: [{
                        memcmp: {
                            "offset": 12,
                            "bytes": publicKey.toBase58()
                        }
                    }
                    ]
                })
            const fetchAccounts = fetchedStakeAccounts.concat(fetchedVoteAccounts);

            fetchAccounts.forEach((AccountInfo: { pubkey: PublicKey; account: AccountInfo<Buffer> }) => {
                // console.log(AccountInfo.pubkey.toBase58())
                setstakeAccount((stakeAccount: any) => [...stakeAccount,
                { value: AccountInfo.pubkey.toBase58(), label: AccountInfo.pubkey.toBase58() }
                ])
            });

        } catch (error) {
            alert('failed to fetch attached stake account')
        }
    }
    const calcEpochOpt = () => {

        const options = []
        for (let index = 1; index < currentEpoch; index++) {
            options.push({ value: index, label: index });
        }
        return options
    }
    const [voteAccount, setvoteAccount] = useState('')
    const [startEpoch, setstartEpoch]: any = useState(0)
    const [endEpoch, setendEpoch]: any = useState(0);
    return (
        <div style={searchBoxStyle}>

            <div className="input-group" style={{ flexDirection: 'column', height: 'inherit', justifyContent: 'space-around' }}>
                <div id='account-input-wrapper' style={accountInputWrapper}>

                    {!useFetchBtn && <input style={inputStyle} onChange={e => setvoteAccount(e.target.value)} placeholder='vote/stake account' />}
                    {useFetchBtn && <Select styles={customStyles} placeholder='fetched accounts' options={stakeAccount} onChange={(option: any) => setvoteAccount(option?.value)} />}

                    {connected &&
                        <button style={switchBtn} onClick={() => setuseFetchBtn(!useFetchBtn)}><FaExchangeAlt /></button>

                    }
                </div>
                <Select styles={customStyles} placeholder='start epoch' options={calcEpochOpt()} onChange={(option: any) => setstartEpoch(option?.value)} />
                <Select styles={customStyles} placeholder='end epoch' options={calcEpochOpt()} onChange={(option: any) => setendEpoch(option?.value)} />
                <button type="button" style={btnStyle} onClick={() => fetchRewards(voteAccount, startEpoch, endEpoch)} className="btn">fetch reward</button>
            </div>
        </div>
    )
}

export default SearchBox