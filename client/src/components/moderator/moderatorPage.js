import React from 'react';

import { Button, Accordion, Card   } from 'react-bootstrap';

 const ModeratorPage = props => {
        const { users, toConfirm, sendUserToAdmin, confirmVote, blockVote } = props;
        return (
            <div>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Users
                              </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {users &&
                                    <div>
                                        {users.map(user =>
                                            <div>
                                                <div key={user._id}>{user.email}</div> <button onClick={() => sendUserToAdmin(user._id)} >Send to block</button>
                                            </div>
                                        )}
                                    </div>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Votes to confirm
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {toConfirm &&
                                    <div>
                                        {toConfirm.map(toConfirm =>
                                            <div>
                                                <div key={toConfirm._id}>{toConfirm.text}</div>
                                                <button onClick={() => confirmVote(toConfirm._id)} >confirm vote</button>
                                                <button onClick={() => blockVote(toConfirm._id)} >block vote</button>
                                            </div>
                                        )}
                                    </div>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        );
    }


export default ModeratorPage;