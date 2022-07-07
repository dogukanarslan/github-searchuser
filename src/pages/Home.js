import React from 'react'
import { Users } from '../components'

const Home = (props) => {
    return (
        <Users
            allData={props.allData}
            istanbulData={props.istanbulData}
            ankaraData={props.ankaraData}
            izmirData={props.izmirData}
        />
    )
}

export default Home
