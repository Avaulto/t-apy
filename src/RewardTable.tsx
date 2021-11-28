import React, { useState } from 'react';
import { Connection, clusterApiUrl, PublicKey, InflationReward } from '@solana/web3.js'
import 'bootstrap/dist/css/bootstrap.css';
import { CSVLink } from "react-csv";


const RewardTable = () => {

    const [loading, setloading] = useState(false)
    const [voteAccount, setvoteAccount] = useState('')
    const [startEpoch, setstartEpoch] = useState('')
    const [endEpoch, setendEpoch] = useState('')
    const [csvContent, setcsvContent] = useState([])

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
    const buildForm = async (reward: any) => {
        const htmlRewrdBody: any = document.getElementById('reward-body');

        const tr = `<tr>
            <th>${reward.epoch}</th>
            <th>${reward.effectiveSlot}</th>
            <th>${reward.amount / 1000000000}</th>
            <th>${reward.date}</th>
            <th>${reward.solPrice}</th>
            </tr>`
        htmlRewrdBody.innerHTML += tr;
        setloading(false)
    }

    const resetRewardState = () => {
        const htmlRewrdBody: any = document.getElementById('reward-body');
        setcsvContent([]);
        htmlRewrdBody.innerHTML = ''
    }
    const fetchRewards = async () => {
        const connection = await new Connection(clusterApiUrl('mainnet-beta'))
        resetRewardState()
        const htmlRewrdBody: any = document.getElementById('reward-body');
        const csvObj: any = []
        try {
            const voteAcc = new PublicKey(voteAccount)
            // const rewardPromise = [];
            const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
            for (let index = Number(startEpoch); index <= Number(endEpoch); index++) {
                setloading(true)
                const epoch = index;
                const rewardRes: (InflationReward | null)[] = await connection.getInflationReward([voteAcc], epoch)
                await sleep(800)
                const reward: any = rewardRes[0];
                // get date
                const unixTimestamp: any = await connection.getBlockTime(reward.effectiveSlot)
                const date = new Date(unixTimestamp * 1000)
                const dateObject = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
                reward.date = dateObject

                // get price
                const solPrice = await fetchSolPrice(reward.date)
                reward.solPrice = solPrice;
                csvObj.push(reward)
                buildForm(reward)
            }
            setcsvContent(csvObj);

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <div className="input-group">
                <input id='VA' onChange={e => setvoteAccount(e.target.value)} className="form-control" placeholder='vote account' />
                <input id='SE' onChange={e => setstartEpoch(e.target.value)} className="form-control" placeholder='start epoch' />
                <input id='EE' onChange={e => setendEpoch(e.target.value)} className="form-control" placeholder='end epoch' />
                <button type="button" onClick={fetchRewards} className="btn btn-primary">fetch reward</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">epoch</th>
                        <th scope="col">effectiveSlot</th>
                        <th scope="col">amount</th>
                        <th scope="col">date</th>
                        <th scope='col'>SOL price</th>
                    </tr>
                </thead>
                <tbody id='reward-body'>

                </tbody>
            </table>
            {loading && <span>fetching data...</span>}
            {csvContent.length > 0 &&
                <CSVLink style={{position:'fixed',bottom:'50px'}} className="btn btn-success" {...csvReport}>Export to CSV</CSVLink>
            }
        </div>
    )
}

export default RewardTable
