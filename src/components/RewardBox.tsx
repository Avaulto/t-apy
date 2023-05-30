import React, { FC, useEffect, useState } from 'react'
import { FaCalendarAlt,FaQuestionCircle, FaAngleDown, FaAngleUp, FaCoins, FaPercent, FaSlackHash, FaAlgolia, FaDollarSign } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';
interface RewardData {
  reward: {
    epoch: number,
    effectiveSlot: number,
    amount: number,
    date: Date,
    solPrice: number,
    APY: number,
    postBalance: number
  }
}

const rewardDataStyle = {
  background: 'rgb(174 95 202)',
  borderRadius: '8px',
  marginBottom: '10px',
  padding: '5px 20px',
  fontSize: '14px'
}
const infoItem = {
  // display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1
}
const extraData = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  justifyContent: 'space-between',
  color: 'white',
  textTransform: 'capitalize' as const
}
const btnStyle = {
  width: '100%',
  borderBottom: '1px solid white',
  background: '0',
  border: '0',
  color: 'white'
}
const RewardBox: FC<RewardData> = ({ reward }) => {
  useEffect(() => {

  })
  const [expandInfo, setexpandInfo] = useState(false)
  return (
    <div id='reward-data' style={rewardDataStyle}>
      <div style={extraData}>
        <div style={infoItem}>
          epoch:
          <div>
            <FaSlackHash />
            {reward.epoch}
          </div>
        </div>
        <div style={infoItem}>
          amount:
          <div>
            <FaCoins />
            {reward.amount}
          </div>
        </div>
        <div style={infoItem}>
          true APY:
          <FaQuestionCircle style={{ width: '16px' }} data-tip="base on 55h epoch" />
                        
                        <ReactTooltip place="right"
                            border
                            backgroundColor='#fff'
                            textColor='black'
                        />
          <div>
            <FaPercent />
            {reward.APY}
          </div>
        </div>
        <button style={btnStyle} onClick={() => setexpandInfo(!expandInfo)}>
          {!expandInfo && <FaAngleDown />}
          {expandInfo && <FaAngleUp />}
        </button>
      </div>
      {expandInfo && <div style={extraData}>
        <div style={infoItem}>
          date
        <div>
          <FaCalendarAlt />
          {reward.date}
          </div>
        </div>
        <div style={infoItem}>
          effective slot
          <div>
          <FaAlgolia />
          {reward.effectiveSlot}
          </div>
        </div>
        <div style={infoItem}>
          SOL price
        <div>
          <FaDollarSign />
          {reward.solPrice}
          </div>
        </div>
        <div style={infoItem}>
          post balance 
        <div>
          <FaCoins />
          {reward.postBalance}
          </div>
        </div>
      </div>}

    </div>
  )
}

export default RewardBox