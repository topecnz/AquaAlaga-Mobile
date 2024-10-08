import React, { Component, createContext } from 'react';
import { useState } from 'react';
import axios from "axios";
import { Alert } from 'react-native';

export const ApiContext = createContext();

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 1000,
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

    getNotifications = async () => {
        instance.get('notification').then((response) => {
            this.updateState(this, {notifications: response.data})
        })
    }


    getSchedules = async () => {
        instance.get('schedule').then((response) => {
            this.updateState(this, {schedules: response.data})
        })
    }

    getReports = async () => {
        instance.get('report').then((response) => {
            this.updateState(this, {reports: response.data})
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
            else if (response.data.code == 409) {
                Alert.alert(response.data.message);
            }
            else {
                Alert.alert('Something went wrong!');
            }
        })
    }

    updateSchedule = async (id, name, time, repeat, timer, props) => {
        instance.patch(`schedule?_id=${id}`, {
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
                Alert.alert('Schedule Updated to Database!');
                props.navigation.goBack();
            }
            else if (response.data.code == 409) {
                Alert.alert(response.data.message);
            }
            else {
                Alert.alert('Something went wrong!');
            }
        })
    }

    deleteSchedule = async (id, props) => {
        instance.delete(`schedule?_id=${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                Alert.alert('Schedule Deleted to Database!');
                props.navigation.goBack();
            }
            else {
                Alert.alert('Something went wrong!');
            }
        })
    }

    toggleSchedule = async (id, props) => {
        instance.put(`schedule?_id=${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                
            }
            else {
                Alert.alert('Something went wrong!');
            }
            this.getSchedules();
        })
    }

    login = async (username, password, props) => {
        instance.get('login', { params: { username: username, password: password } }).then((response) => {
            this.setState({isLoggedOn: response.data.access, account: response.data.data}, () => {
                console.log('Checking.... '+ this.state.isLoggedOn + ' ' +  this.state.account.id)
                if (this.state.isLoggedOn) {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'BottomTab' }]
                    })
                }
                else {
                    Alert.alert('Invalid credentials.')
                }
            });
        })
    }

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
                addSchedule: this.addSchedule,
                updateSchedule: this.updateSchedule,
                deleteSchedule: this.deleteSchedule,
                toggleSchedule: this.toggleSchedule,
                reports: this.state.reports,
                getReports: this.getReports,
                getNotifications: this.getNotifications,
                notifications: this.state.notifications
            }}>
                {this.props.children}
            </ApiContext.Provider>
        )
    }
}

export default ApiProvider;