import React from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PaginationPage extends React.PureComponent {


    render() {
        const pageNumbers = [];
       
        const  { votesPerPage, votes, paginate } = this.props;
        if (votes === []) { return (<div>Loading</div>) } else {
            const votesLength = votes.length;
            for (let i = 1; i <= Math.ceil(votesLength / votesPerPage); i++) {
                pageNumbers.push(i)
            }
            return (
                <Pagination className='pagination'>
                    {pageNumbers.map(number => (
                        <PaginationItem key={number} >
                            <PaginationLink onClick={()=>{ paginate(number) }} >
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </Pagination>
            )
        }
    }
    
}

const mapStateToProps = state => ({
    votes: state.voteslist.items, 
})

export default connect(mapStateToProps, null)(PaginationPage);