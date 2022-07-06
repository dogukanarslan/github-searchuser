import React from 'react'

export default function Contact() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <div className="form-group">
                        <h4 className="display-4">Get in touch</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="row mb-5">
                        <form className="w-100">
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Subject"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            placeholder="Enter your message"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-dark" type="button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row mb-5">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <i className="fab fa-github fa-2x"></i>
                                    <span className="lead">
                                        {' '}
                                        github.com/github-search
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <i className="fab fa-twitter fa-2x"></i>
                                    <span className="lead">
                                        {' '}
                                        @github-search
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <i className="fas fa-comment fa-2x"></i>
                                    <span className="lead"> Slack</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <i className="fas fa-rss fa-2x"></i>
                                    <span className="lead"> RSS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
