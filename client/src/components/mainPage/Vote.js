import React from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';

class Vote extends React.PureComponent {

    state = {
        collapse: false
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }))
    }

    render() {
        return (
            <div>
                <div className='row jumbotron '>
                    <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-10'>
                        <div className='lead'> </div>
                    </div>
                    <div className=' col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2'>
                        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Info</Button>
                    </div>
                    <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                               <div>Результаты голосования</div>
                               <div>Дата начала голосования</div>
                               <div>Сколько осталось до конца голосования</div>
                               <div>Общее число голосов</div>
                               <div>ВОПРОС ГОЛОСОВАНИЯ</div>
                               <button>Проголосовать</button>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            </div>
        );
    }
}

export default Vote;