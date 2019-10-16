import React from 'react';
import { connect } from 'react-redux';

import PaginationPage from '../components/mainPage/Pagination'

class PaginationPageContainer extends React.PureComponent {
    render() {
        const pageNumbers = [];

        const { votesPerPage, votes, paginate } = this.props;
        if (votes === []) { return (<div>Loading</div>) } else {
            const votesLength = votes.length;
            for (let i = 1; i <= Math.ceil(votesLength / votesPerPage); i++) {
                pageNumbers.push(i)
            }
            return (
                <div>
                    <PaginationPage
                        paginate={paginate}
                        pageNumbers={pageNumbers}
                    />
                </div>
            )
        }
    }

}

const mapStateToProps = state => ({
    votes: state.voteslist.items,
})

export default connect(mapStateToProps, null)(PaginationPageContainer);