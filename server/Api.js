import React, { Component, createContext } from 'react';
import { useState } from 'react';
import axios from "axios";
import { Alert } from 'react-native';

export const ApiContext = createContext();

const instance = axios.create({
    baseURL: 'http://192.168.148.20:8000/',
    timeout: 5000,
});

class ApiProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [],
            device: [],
            schedules: [],
            notifications: [],
            reports: [],
            schedInterval: null,
            isLoggedOn: false
        }
        this.data = []
    }

    // getAccount = async () => {
    //     instance
    // }

    getSchedules = async () => {
        instance.get('schedule').then((response) => {
            this.updateState(this, {schedules: response.data})
        })
    }

    addSchedule = async (name, time, repeat, timer, props) => {
        instance.post('schedule', {
            name: name,
            time: time,
            repeat: repeat,
            timer: timer,
            is_enable: true
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                Alert.alert('Schedule Added to Database!');
                props.navigation.goBack();
            }
            else {
                Alert.alert('Something went wrong!');
            }
        })
    }

    updateScheduleSwitch = async () => {

    }

    login = async (username, password, props) => {
        instance.get('login', { params: { username: username, password: password } })
        .then((response) => {
            console.log('API Response:', response);
    
            if (response.data && response.data.access && response.data.data) {
                this.setState({ isLoggedOn: response.data.access, account: response.data.data }, () => {
                    console.log('Logged-in user:', this.state.account);
    
                    if (this.state.account && this.state.account.username) {
                        console.log('User ID:', this.state.account.username);
    
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'BottomTab' }]
                        });
                    } else {
                        Alert.alert('Login successful.');
                    }
                });
            } else {
                Alert.alert('Invalid credentials.');
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
            Alert.alert('Login failed.');
        });
    };
    

    logout = async (props) => {
        this.setState({isLoggedOn: false}, () => {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Landing' }]
            });
            console.log('Logged out ' + this.state.isLoggedOn)
        })
    }

    componentDidMount() {
        // this.setState({schedInterval: setInterval(() => this.getSchedules(), 1000)});
        // this.getSchedules();
        
    }

    componentWillUnmount() {
        // clearInterval(this.schedInterval);
        // this.setState({schedInterval: null});
        // console.log('disconnected');
    }

    updateState = async (prevState, newState = {}) => {
        this.setState({ ...prevState, ...newState });
    };

    render() {
        return (
            <ApiContext.Provider value={{
                schedules: this.state.schedules,
                getSchedules: this.getSchedules,
                login: this.login,
                logout: this.logout,
                isLoggedOn: this.state.isLoggedOn,
                account: this.state.account,
                addSchedule: this.addSchedule
            }}>
                {this.props.children}
            </ApiContext.Provider>
        )
    }
}

export default ApiProvider;