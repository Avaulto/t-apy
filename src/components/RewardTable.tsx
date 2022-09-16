import React, { useEffect, useState } from 'react';
import { Connection, clusterApiUrl, PublicKey, InflationReward, AccountInfo, LAMPORTS_PER_SOL } from '@solana/web3.js'
import 'bootstrap/dist/css/bootstrap.css';
import { CSVLink } from "react-csv";

import SearchBox from './SearchBox';
import RewardBox from './RewardBox';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToolGuide from './ToolGuide';
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment.prod';
import { useConnection } from '@solana/wallet-adapter-react';


const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

const RewardTable = () => {
    const { connection } = useConnection();

    const notify = (msg: string) => toast(msg, {
        position: "bottom-left",
    });
    const [loading, setloading] = useState(false)
    const [csvContent, setcsvContent] = useState([])
    const [currentEpoch, setcurrentEpoch] = useState(0)
    const [rewards, setrewards]: Array<any> = useState([])
    useEffect(() => {    
        getCurrentEpoch()
    })

    const headers = [
        { label: "epoch", key: "epoch" },
        { label: "effectiveSlot", key: "effectiveSlot" },
        { label: "amount", key: "amount" },
        { label: "date", key: "date" },
        { label: "solana price", key: "solPrice" }
    ];
    const csvReport = {
        data: csvContent,
        headers: headers,
        filename: 'solana validator reward.csv'
    };

    const getCurrentEpoch = async () => {
        try {
            
            const currentEpoch =  (await connection.getEpochInfo()).epoch
            setcurrentEpoch(currentEpoch);
        } catch (error) {
            console.error(error)
        }
    }
    const fetchSolPrice = async (date: any) => {

        const reqSolPrice: any = await fetch(`https://api.coingecko.com/api/v3/coins/solana/history?date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const solPrice = await reqSolPrice.json()
        return solPrice.market_data.current_price.usd.toFixed(2)
    }


    const calcAPY = (reward: any) => {
        const epochAPY = isWhatPercentOf(reward.amount, reward.postBalance)
        const averageEpoch = 2.58 // days;
        const trueAPY = epochAPY / averageEpoch * 365;
        return trueAPY.toFixed(2)
    }

    function isWhatPercentOf(numA: number, numB: number): number {
        return (numA / numB) * 100;
    }
    const resetRewardState = () => {
        setcsvContent([]);
        setrewards([]);
    }
    const fetchRewards = async (voteAccount: string, startEpoch: number, endEpoch: number) => {
        logEvent(analytics, 'fetch_data')
        // const connection = await new Connection(clusterApiUrl('mainnet-beta'))
        resetRewardState()
        const csvObj: any = []
        try {
            const account = new PublicKey(voteAccount)
            // const rewardPromise = [];
            const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
            for (let index = Number(startEpoch); index <= Number(endEpoch); index++) {
                setloading(true)
                const epoch = index;
                const rewardRes: (InflationReward | null)[] = await connection.getInflationReward([account], epoch);
                await sleep(600)
                const reward: any = rewardRes[0];
                // get date
                const unixTimestamp: any = await connection.getBlockTime(reward.effectiveSlot)
                const date = new Date(unixTimestamp * 1000)
                const dateObject = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
                reward.date = dateObject
                reward.postBalance = (reward.postBalance / LAMPORTS_PER_SOL).toFixed(3)
                reward.amount = (reward.amount / LAMPORTS_PER_SOL).toFixed(3)
                reward.APY = calcAPY(reward);
                // get price
                const solPrice = await fetchSolPrice(reward.date)
                reward.solPrice = solPrice;
                csvObj.push(reward)
                // buildForm(reward)
                setrewards((rewards: any) => [...rewards, reward])
                setloading(false)
            }
            setcsvContent(csvObj);

        } catch (error) {
            // alert(error + '-----> no result for this epoch')
            notify("no info on given epoch!")
            setloading(false)
        }
    }
    return (
        <div>

            <span id="table-title"> SOL reward history</span>
            <div id='sub-title'>current epoch: {currentEpoch}</div>
            <ToolGuide />

            <div id='rewards-data' style={{ display: 'flex' }}>

                <SearchBox currentEpoch={currentEpoch} fetchRewards={fetchRewards} />

                <div id='reward-box' style={{ flex: 2, padding: '0 20px', maxHeight: '650px', overflowY: 'scroll' }}>
                    {rewards.length > 0 && <h4 style={{ textAlign: 'left' }}>Rewards info</h4>}
                    {rewards.map((reward: any, i: number) => (
                        <RewardBox reward={reward} key={i} />
                        
                    ))}
                    <ToastContainer />
                    {/* <RewardBox reward={rewards[0]}/> */}
                    {loading && <div className='loader'></div>}
                    {rewards.length > 0 && <div id="csv-wrap">

                        <CSVLink onClick={(event: any) => {
                            if (csvContent.length == 0) {

                                return false; // 👍🏻 You are stopping the handling of component
                            }
                        }} style={{ color: 'white', backgroundColor: csvContent.length > 0 ? '#42d4ca' : 'gray' }} className="btn csv-btn" {...csvReport}>Export to CSV</CSVLink>

                    </div>}
                </div>

            </div>
        </div>
    )
}

export default RewardTable
