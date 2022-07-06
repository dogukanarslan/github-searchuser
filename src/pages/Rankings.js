import React, { useEffect, useState } from 'react'
import { User } from '../components'
import { getUsers } from '../constants'
import ContentLoader from 'react-content-loader'

const MyLoader = () => (
    <ContentLoader
        height={446}
        width={350}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="0" y="0" rx="0" ry="0" width="350" height="348" />
        <rect x="20" y="380" rx="0" ry="0" width="80" height="10" />
        <rect x="20" y="400" rx="5" ry="5" width="100" height="25" />
    </ContentLoader>
)

export const Rankings = () => {
    const [allData, setAllData] = useState([])
    const [istanbulData, setIstanbulData] = useState([])
    const [ankaraData, setAnkaraData] = useState([])

    useEffect(() => {
        getUsers('', '', '', 'followers', 1, 3)
            .then((res) => res.json())
            .then((res) => setAllData(res))
        getUsers('', 'istanbul', '', 'followers', 1, 3)
            .then((res) => res.json())
            .then((res) => setIstanbulData(res))
        getUsers('', 'ankara', '', 'followers', 1, 3)
            .then((res) => res.json())
            .then((res) => setAnkaraData(res))
    }, [])

    if (
        allData.length !== 0 &&
        istanbulData.length !== 0 &&
        ankaraData.length !== 0 &&
        !allData.hasOwnProperty('message') &&
        !istanbulData.hasOwnProperty('message') &&
        !ankaraData.hasOwnProperty('message')
    ) {
        return (
            <div className="rankings">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Top 3 Developers</h1>
                        <p className="lead">
                            Most followed developers around the world and
                            various cities of Turkey
                        </p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2 text-center">
                                <h4 className="display-2">World</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {allData.items.map((item) => {
                            return (
                                <User
                                    key={item.id}
                                    page={'rankings'}
                                    {...item}
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2 text-center">
                                <h4 className="display-2">Istanbul</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {istanbulData.items.map((item) => {
                            return (
                                <User
                                    key={item.id}
                                    page={'rankings'}
                                    {...item}
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2 text-center">
                                <h4 className="display-2">Ankara</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {ankaraData.items.map((item) => {
                            return (
                                <User
                                    key={item.id}
                                    page={'rankings'}
                                    {...item}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="rankings">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Top 3 Developers</h1>
                        <p className="lead">
                            Most followed developers around the world and
                            various cities of Turkey
                        </p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2 text-center">
                                <h4 className="display-2">World</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2 text-center">
                                <h4 className="display-2">Istanbul</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2 text-center">
                                <h4 className="display-2">Ankara</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card mb-4">
                                <MyLoader />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
