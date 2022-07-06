import React from 'react'
import { Link } from 'react-router-dom'

export default function User(props) {
    return (
        <div
            className={props.page === 'rankings' ? 'col-md' : 'col-6 col-md-3'}
        >
            <div className="card mb-4">
                <img className="card-img-top" src={props.avatar_url} alt="" />
                <div className="card-body">
                    <h4 className="card-title small">{props.login}</h4>
                    <Link
                        to={`/details/${props.login}`}
                        className="btn btn-outline-dark btn-sm"
                    >
                        More Info
                    </Link>
                </div>
            </div>
        </div>
    )
}
