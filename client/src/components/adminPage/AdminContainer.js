import React from 'react';

import { authService } from '../services/authService';
import { connect } from 'react-redux';

import { getUsersToBlock } from '../../actions/actions';
import io from "socket.io-client";
import AdminPage from './AdminPage'
import { host } from '../../constants/constants'


class AdminContainer extends React.PureComponent {

  
    socket = io(`${host}`);

   

    render() {
     const { userToBlock } = this.props;

  
         console.log(userToBlock)
            return (
                <div>
                   <AdminPage usersToBlock={userToBlock} />
                </div>
            );
        }
    }


// const mapDispatchToProps = dispatch => ({
//     getUserToBlock: user => dispatch(getUsersToBlock(user))
// })

const mapStateToProps = state => ({
    userToBlock: state.users.usersToBlock
})




export default connect(mapStateToProps, null)(AdminContainer);