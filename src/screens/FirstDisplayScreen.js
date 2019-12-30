import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as loginAction from '../actions'
import Main, {LoggedIn} from '../navigators'
import { View, Text } from 'react-native';
import Loading from '../components/Loading'
class FirstDisplayScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }
    componentDidMount() {
        this.props.checkLogin();
    }

    render() {
        const { isAuthenticated, user } = this.props;

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
}
const mapStateToProps = (state) => {
    const { isAuthenticated, user } = state;
    return {
        isAuthenticated, user
    };
};
export default connect(mapStateToProps, loginAction)(FirstDisplayScreen);
