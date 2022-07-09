import React from 'react'
import ContentLoader from 'react-content-loader'
import { Row, Col, Card } from 'reactstrap'
import { User } from './User'

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
                <Row xs="2" sm="4" md="6">
                    {users.map((item, index) => {
                        return <User key={item.id} page={'home'} {...item} />
                    })}
                </Row>
            </>
        )
    } else {
        return (
            <Row>
                {[1, 2, 3, 4, 5, 6].map((item) => {
                    return (
                        <Col xs="6" md="2" key={item}>
                            <Card className="my-5">
                                <MyLoader />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )
    }
}
