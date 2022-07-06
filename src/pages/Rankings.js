import React from 'react'
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

export default class Rankings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            istanbulData: [],
            ankaraData: [],
        }
    }

    componentDidMount() {
        getUsers('', '', '', 'followers', 1, 3)
            .then((res) => res.json())
            .then((res) =>
                this.setState({
                    allData: res,
                })
            )
        getUsers('', 'istanbul', '', 'followers', 1, 3)
            .then((res) => res.json())
            .then((res) =>
                this.setState({
                    istanbulData: res,
                })
            )
        getUsers('', 'ankara', '', 'followers', 1, 3)
            .then((res) => res.json())
            .then((res) =>
                this.setState({
                    ankaraData: res,
                })
            )
    }

    render() {
        if (
            this.state.allData.length !== 0 &&
            this.state.istanbulData.length !== 0 &&
            this.state.ankaraData.length !== 0 &&
            !this.state.allData.hasOwnProperty('message') &&
            !this.state.istanbulData.hasOwnProperty('message') &&
            !this.state.ankaraData.hasOwnProperty('message')
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
                            {this.state.allData.items.map((item) => {
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
                            {this.state.istanbulData.items.map((item) => {
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
                            {this.state.ankaraData.items.map((item) => {
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
}
