import { FormEvent, useState } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useAppDispatch } from '../../app/store'
import { fetchUsers } from '../../features/users/usersSlice'

export const Filters = () => {
    const [startingId, setStartingId] = useState('')
    const [resultsPerPage, setResultsPerPage] = useState('')

    const dispatch = useAppDispatch()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(fetchUsers({ startingId, resultsPerPage }))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xs="12" sm="6">
                    <FormGroup>
                        <Label for="startingId">Starting ID</Label>
                        <Input
                            type="number"
                            value={startingId}
                            onChange={(e) => setStartingId(e.target.value)}
                            placeholder="Starting ID"
                            id="startingId"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6">
                    <FormGroup>
                        <Label for="resultsPerPage">Results Per Page</Label>
                        <Input
                            type="select"
                            value={resultsPerPage}
                            onChange={(e) => setResultsPerPage(e.target.value)}
                            id="resultsPerPage"
                        >
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>45
                        </Input>
                    </FormGroup>
                </Col>
            </Row>

            <Button color="dark" type="submit">
                Fetch
            </Button>
        </Form>
    )
}
