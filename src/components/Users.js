import React, { useEffect, useState } from 'react'
import User from './User'
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

export const Users = ({ users }) => {
    if (users.length !== 0) {
        return (
            <>
                <p className="lead">{users.length} results</p>
                <div className="row">
                    {users.map((item, index) => {
                        return <User key={item.id} page={'home'} {...item} />
                    })}
                </div>
            </>
        )
    } else {
        return (
            <div className="row">
                {[1, 2, 3, 4].map((item) => {
                    return (
                        <div key={item} className="col-6 col-md-3">
                            <div className="card my-5">
                                <MyLoader />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
