import React, { useState } from 'react'

export const Filters = ({ fetchUsers }) => {
    const [startingId, setStartingId] = useState('')
    const [resultsPerPage, setResultsPerPage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchUsers(startingId, resultsPerPage)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-12 col-sm-6">
                    <label htmlFor="startingId">Starting ID</label>
                    <input
                        className="form-control"
                        type="number"
                        value={startingId}
                        onChange={(e) => setStartingId(e.target.value)}
                        placeholder="Starting ID"
                        id="startingId"
                    />
                </div>

                <div className="form-group col-12 col-sm-6">
                    <label htmlFor="resultsPerPage">Results Per Page</label>
                    <select
                        className="form-control"
                        value={resultsPerPage}
                        onChange={(e) => setResultsPerPage(e.target.value)}
                        id="resultsPerPage"
                    >
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>45
                    </select>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">
                Fetch
            </button>
        </form>
    )
}
