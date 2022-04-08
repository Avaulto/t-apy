import React, { FC, useState } from 'react'
import btnBG from '../assets/btn-bg.png';
import Select from 'react-select'
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
    textTransform:'capitalize'  as const,
    margin: '5px 0',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderColor:'#9a61d2',
    zIndex:2,
    height:'40px',
    background:'white',
    outline:0,
    display:'flex'
    // textAlign:'center'
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
    zIndex:0
}

interface SearchBoxData {
    currentEpoch: number;
    fetchRewards: Function;
}
const SearchBox: FC<SearchBoxData> = ({ currentEpoch, fetchRewards }) => {
    const customStyles = {
        control: () => (inputStyle)
      }
    const calcEpochOpt = () => {

        const options = []
        for (let index = 1; index < currentEpoch; index++) {
            options.push({ value: index, label: index },);
        }
        return options
    }
    const [voteAccount, setvoteAccount] = useState('')
    const [startEpoch, setstartEpoch]: any = useState(0)
    const [endEpoch, setendEpoch]: any = useState(0)
    return (
        <div style={searchBoxStyle}>
          
            <div className="input-group" style={{ flexDirection: 'column', height: 'inherit', justifyContent: 'space-around' }}>
                <input  style={inputStyle} onChange={e => setvoteAccount(e.target.value)} placeholder='vote/stake account' />
                <Select  styles={customStyles} placeholder='start epoch' options={calcEpochOpt()} onChange={(option: any) => setstartEpoch(option?.value)} />
                <Select  styles={customStyles} placeholder='last avaliable epoch' options={calcEpochOpt()} onChange={(option: any) => setendEpoch(option?.value)} />
                <button type="button" style={btnStyle} onClick={() => fetchRewards(voteAccount, startEpoch, endEpoch)} className="btn">fetch reward</button>
            </div>
        </div>
    )
}

export default SearchBox