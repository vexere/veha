import React from 'react'
import { connect } from 'react-redux';
import * as loginAction from '../actions'
import Main, { LoggedIn } from '../navigators'
import Loading from '../components/Loading'
const FirstDisplayScreen = ({ isAuthenticated, user }) => {
    if (isAuthenticated === null) {
        return (
            <Loading />
        );
    } else if (isAuthenticated && user !== null ) {
        if (user === null ) {
            return (
                <Loading />

            );
        }
        else {
            return (
                <LoggedIn />
            );
        }
    } else {
        return <Main />
    }
}
const mapStateToProps = (state) => {
    const { isAuthenticated, user } = state;
    return {
        isAuthenticated, user
    };
};
export default connect(mapStateToProps, loginAction)(FirstDisplayScreen);
