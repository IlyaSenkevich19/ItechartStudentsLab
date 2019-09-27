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
        if (this.props.vote === undefined) { return <div>loading</div> } else {
      
       
            return (
                <div>
                    <div className='row jumbotron '>
                        <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-10'>
                            <div className='lead'> Author of the vote is {this.props.vote.author}  </div>
                            <div className='lead'> The vote: {this.props.vote.text}</div>
                        </div>
                        <div className=' col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2'>
                            <div></div>
                            <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Info</Button>
                        </div>
                        <Collapse isOpen={this.state.collapse}>
                            <Card>
                                <CardBody>
                                    <div>Результаты голосования</div>
                                    <div>Дата начала голосования</div>
                                    <div>Сколько осталось до конца голосования</div>
                                    <div>Общее число голосов</div>
                                    <button>Проголосовать</button>
                                    <div>Комментарии</div>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                </div>
            );
        }
    }
}

export default Vote;