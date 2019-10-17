import React from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';

const AdminPage = props => {

    const { users, userFromMod, usersToBlocks, moderator, user } = props;
    return (
        <div>

            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            USERS:
                              </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {users &&
                                <div>
                                    {user}
                                </div>
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            MODERATORS:
                              </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            {moderator &&
                                <div>
                                    {moderator}
                                </div>
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            USERS TO BLOCK :
                              </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            {userFromMod === null ? <div>There is no users to block</div> :
                                <div>
                                    {usersToBlocks}
                                </div>
                            }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}

export default AdminPage;