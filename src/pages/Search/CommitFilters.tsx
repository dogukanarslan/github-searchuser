import { useState, FormEvent } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useAppDispatch } from '../../app/store'
import { fetchSearchCommit } from '../../features/search/searchCommitSlice'

export const CommitFilters = () => {
    const [commitMessage, setCommitMessage] = useState('')

    const dispatch = useAppDispatch()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(fetchSearchCommit({ type: 'commits', q: commitMessage }))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xs="12">
                    <FormGroup>
                        <Label for="commitMessage">Commit Message</Label>
                        <Input
                            type="text"
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                            placeholder="Username"
                            id="commitMessage"
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Button color="dark" type="submit">
                Fetch
            </Button>
        </Form>
    )
}
