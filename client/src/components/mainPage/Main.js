import React from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';

class Main extends React.PureComponent {

    state = {
        collapse: false
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse}))
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row jumbotron main'>
                    <div className='col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10'>
                        <p className='lead'>dlasdk as d sdfi asf sdf sadfas dfhj jd fuisdf  sidf klsd fsdf j </p>
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2'>
                        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Info</Button>
                        <Collapse isOpen={this.state.collapse}>
                            <Card>
                                <CardBody>
                                    Anim pariatur cliche reprehenderit,
                                     enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                     anim keffiyeh helvetica, craft beer labore wes anderson cred
                                     nesciunt sapiente ea proident.
                            </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;