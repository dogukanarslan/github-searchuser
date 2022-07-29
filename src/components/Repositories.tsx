import { Row, Col } from 'reactstrap'
import { Repository } from './Repository'
import { IRepository } from '../models'

interface RepositoriesProps {
    repositories: IRepository[] | null
    count: number | undefined
    status: string
}

export const Repositories = (props: RepositoriesProps) => {
    const { repositories, count } = props

    return (
        <>
            <p className="lead">{count} results</p>
            <Row xs="2" sm="4" md="6">
                {repositories?.map((repository) => (
                    <Col key={repository.id}>
                        <Repository repository={repository} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
