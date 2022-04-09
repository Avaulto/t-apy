import React, { useState } from 'react'
import { FaArrowDown, FaBook, FaBookOpen, FaBoxOpen } from 'react-icons/fa';



const pStyle = {
    textAlign: 'left' as const,
    fontSize: '14px',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '10px',
    textTransform: 'capitalize' as const
}
const ToolGuide = () => {
    const [guideOpen, setguideOpen] = useState(false)
    return (
        <div>            <div style={pStyle}>
            this tool intend to provide a wallet history reward base on account address(not wallet address).
            that means, when you provide a stake/vote account you will be able to fetch all staking reward history per selected epoch, with accurate APY, data history, and more.
            <br /><br />
            <h4 style={{ color: '#32bcd2', cursor: 'pointer' }} onClick={() => setguideOpen(!guideOpen)}>how to use:
                {!guideOpen && <FaBook />}
                {guideOpen && <FaBookOpen />}
            </h4>
            {guideOpen && <span id='how-to-use'>

                there are 2 ways to import reward history.
                <ul>
                    <li>providing a stake/vote account address mannualy </li>
                    <li> fetch stake/vote account address via connecting your wallet using the wallet adapter</li>
                </ul><br />
                after you select your way for providing an account address, the steps to fetch data are as the following:
                <ol>
                    <li>provide/select the desired address</li>
                    <li> select a starting epoch</li>
                    <li>select ending epoch</li>
                </ol>
            </span>}
        </div></div>
    )
}

export default ToolGuide