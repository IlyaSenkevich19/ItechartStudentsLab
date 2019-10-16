import React from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationPage = props => {

    const { paginate, pageNumbers } = props;
    return (
        <Pagination className='pagination'>
            {pageNumbers.map(number => (
                <PaginationItem key={number} >
                    <PaginationLink onClick={() => { paginate(number) }} >
                        {number}
                    </PaginationLink>
                </PaginationItem>
            ))}
        </Pagination>
    )
}


export default PaginationPage;