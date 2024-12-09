import React, { Component, createContext } from 'react';
import { useState } from 'react';
import axios from "axios";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ApiContext = createContext();

const instance = axios.create({
    baseURL: "https://aquaalaga.topecnz.net/",
});

class ApiProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [],
            devices: [],
            schedules: [],
            notifications: [],
            reports: [],
            checkers: [],
            schedInterval: null,
            isLoggedOn: false,
            device: {},
            isListingDone: false,
            questions: [
                "What is your mother's maiden name?",
                "What is the name of your favorite pet?",
                "What high school did you attend?",
                "What is your favorite book?",
                "What was the name of your first car?",
                "What is the name of the road you grew up on?",
                "What was your favorite food as a child?",
                "Where did you meet your spouse?",
            ]
        }
        this.data = []
    }

    // getAccount = async () => {
    //     instance
    // }



    getSchedules = async (id) => {
        instance.get(`schedule?_id=${id}`).then((response) => {
            this.updateState(this, {schedules: response.data})
        })
    }

    getReports = async (id) => {
        instance.get(`report?_id=${id}`).then((response) => {
            this.updateState(this, {reports: response.data})
        }).catch((e) => {
            Alert.alert("Connection Lost. Please try again.")
        })
    }

    addSchedule = async (name, time, repeat, timer, id, props, mqtt) => {
        instance.post('schedule', {
            name: name,
            time: time,
            repeat: repeat,
            timer: timer,
            is_enable: true,
            device_id: id
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                mqtt.publish(`/${id}/schedule`, "OK");
                Alert.alert('Schedule Added to Database!');
                props.navigation.goBack();
            }
            else if (response.data.code == 409) {
                Alert.alert(response.data.message);
            }
            else {
                Alert.alert('Something went wrong!');
            }
        }).catch((e) => {
            Alert.alert("Connection Lost. Please try again.")
        })
    }

    updateSchedule = async (id, name, time, repeat, timer, device_id, props, mqtt) => {
        instance.patch(`schedule?_id=${id}`, {
            name: name,
            time: time,
            repeat: repeat,
            timer: timer,
            is_enable: true,
            device_id: device_id
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                mqtt.publish(`/${device_id}/schedule`, "OK");
                Alert.alert('Schedule Updated to Database!');
                props.navigation.goBack();
            }
            else if (response.data.code == 409) {
                Alert.alert(response.data.message);
            }
            else {
                Alert.alert('Something went wrong!');
            }
        }).catch((e) => {
            Alert.alert("Connection Lost. Please try again.")
        })
    }

    deleteSchedule = async (id, props, mqtt) => {
        instance.delete(`schedule?_id=${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                mqtt.publish(`/${id}/schedule`, "OK");
                Alert.alert('Schedule Deleted to Database!');
                props.navigation.goBack();
            }
            else {
                Alert.alert('Something went wrong!');
            }
        }).catch((e) => {
            Alert.alert("Connection Lost. Please try again.")
        })
    }

    toggleSchedule = async (id, device_id, mqtt) => {
        instance.put(`schedule?_id=${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                mqtt.publish(`/${device_id}/schedule`, "OK");
            }
            else {
                Alert.alert('Something went wrong!');
            }
            this.getSchedules(device_id);
        }).catch((e) => {
            Alert.alert("Connection Lost. Please try again.")
        })
    }

    getDevices = async () => {
        this.updateState(this, {isListingDone: false});
        console.log(this.state.account.id);
        setTimeout(() => {
            instance.get(`device?_id=${this.state.account.id}`).then((response) => {
                this.updateState(this, {devices: response.data})
                this.updateState(this, {isListingDone: true});
            },
            () => {
                Alert.alert('Something went wrong')
                this.updateState(this, {isListingDone: true});
            })
        }, 2000)
    }

    setDevice = async (data) => {
        this.updateState(this, {device: data})
    }

    updateDevice = async (device, name, type, breed, temp, ph, setIsLoading, updateDev) => {
        let data = {
            id: device.id,
            name: name,
            type: type,
            mac_address: device.mac_address,
            ip_address: device.ip_address,
            fish_breed: breed,
            temperature: parseInt(temp),
            ph_level: parseInt(ph)
        }
        console.log(data);
        instance.patch(`device?_id=${device.id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(
            (response) => {
                if (response.data.code == 200) {
                    updateDev();
                    this.setDevice(data);
                    this.getDevices();
                    setTimeout(() => {
                        Alert.alert('Device has been updated.');
                        setIsLoading(false);
                    }, 1000)
                }
                else if (response.data.code == 409) {
                    Alert.alert(response.data.message);
                    setIsLoading(false);
                }
                else {
                    Alert.alert('Something went wrong!');
                    setIsLoading(false);
                }
            },
            (e) => {
                Alert.alert(e);
                setIsLoading(false);
            }
        )}

    deleteDevice = async (id, props, setIsLoading, deleteDev) => {
        instance.delete(`device?_id=${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(
            (response) => {
                if (response.data.code == 200) {
                    setTimeout(() => {
                        deleteDev();
                        Alert.alert('Device has been deleted.');
                        setIsLoading(false);
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'BottomTabMain' }]
                        })
                    }, 1000);
                }
                else {
                    Alert.alert('Something went wrong!');
                    setIsLoading(false);
                }
            },
            (e) => {
                Alert.alert(e);
                setIsLoading(false);
            }
        )
    }

    getNotifications = async (id) => {
        instance.get(`notification?_id=${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            this.updateState(this, {notifications: response.data})
            // if (response.data.code == 200) {
            //     mqtt.publish(`/${device_id}/schedule`, "OK");
            //     Alert.alert('Schedule Deleted to Database!');
            //     props.navigation.goBack();
            // }
            // else {
            //     Alert.alert('Something went wrong!');
            // }
        }).catch((e) => {
            Alert.alert("Connection Lost. Please try again.")
        })
    }

    deleteNotifications = async (id) => {
        instance.delete(`notification?_id=${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                this.updateState(this, {notifications: []});
                Alert.alert("Notification cleared!");
            }
            else {
                Alert.alert("Something went wrong.");
            }
        }).catch((e) => {
            Alert.alert("Connection Lost. Please try again.")
        })
    }

    login = async (username, password, props) => {
        instance.get(`login?username=${username}&password=${password}`).then((response) => {
            console.log(response.data)
            this.setState({isLoggedOn: response.data.access, account: response.data.data}, async () => {
                console.log('Checking.... '+ this.state.isLoggedOn + ' ' +  this.state.account.id)
                
                if (this.state.isLoggedOn) {
                    try {
                        await AsyncStorage.setItem('account', JSON.stringify(response.data.data)).then(() => {
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: (!this.state.account.is_verified) ? 'Email Verification' : 'BottomTabMain' }]
                            })
                        });
                    } catch (e) {
                        
                    }
                }
                else {
                    Alert.alert('Invalid credentials.')
                }
            });
        }, (e) => {
            console.log(e)
            Alert.alert("Connection Lost. Please try again.")
        })
    }

    logout = async (props) => {
        this.setState({isLoggedOn: false}, async () => {
            try {
                await AsyncStorage.setItem('account', JSON.stringify(false)).then(() =>{
                    console.log('Logged out ' + this.state.isLoggedOn)
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }]
                    });
                });
            } catch (e) {
                console.log(e)
            }
        })
    }

    checker = async () => {
        instance.get("checker").then((r) => {
            this.updateState(this, {checkers: r.data});
        }, () => {
            Alert.alert("Not loaded");
        })
    }

    session = async (data, props) => {
        this.setState({account: data}, async () => {
            props.navigation.reset({
                index: 0,
                routes: [{ name: (!this.state.account.is_verified) ? 'Email Verification' : 'BottomTabMain' }]
            })
        })
    }

    signup = async (data, props) => {
        instance.post("signup", data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            console.log(response.data);
            if (response.data.code == 200) {
                Alert.alert("You are now registered!");
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            } else if (response.data.code == 409) {
                Alert.alert("Error: username or email is already taken.");
                // reload userlist
                this.checker();
            }
            else {
                Alert.alert("Something went wrong.");
            }
        }).catch((e) => {
            Alert.alert("Something went wrong.", e)
        })
    }

    verify = async (id, isSent, setIsSent) =>{
        instance.get(`verify?id=${id}`).then((r) => {
            if (isSent) {
                Alert.alert("Verification code has been resent!");
            } else {
                setIsSent(true);
            }
        }, () => {
            Alert.alert("Something went wrong!");
        });
    } 

    post_verify = async (id, code, props) => {
        console.log(code);
        instance.post("verify", {
            id: id,
            verification_code: parseInt(code)
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(async (r) => {
            if (r.data.code == 200) {
                try {
                    account_data = this.state.account;
                    account_data.is_verified = true;
                    console.log(account_data);
                    await AsyncStorage.setItem('account', JSON.stringify(account_data)).then(() => {
                        Alert.alert("Your email is verified! Welcome to AquaAlaga.")
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'BottomTabMain' }]
                        })
                    });
                } catch (e) {
                    Alert.alert("Try again");
                }
            } else {
                Alert.alert("Incorrect Code");
            }
        }, (e) => {
            Alert.alert("Something went wrong!");
        })
    }

    reset = async (id, isSent, setIsSent) => {
        instance.get(`reset?id=${id}`).then((r) => {
            if (isSent) {
                Alert.alert("Verification code has been resent!");
            } else {
                setIsSent(true);
            }
        }, () => {
            Alert.alert("Something went wrong!");
        });
    }

    post_reset = async (id, code, setFound) => {
        console.log(code);
        instance.post("reset", {
            id: id,
            reset_code: parseInt(code)
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(async (r) => {
            if (r.data.code == 200) {
                setFound(true);
            } else {
                Alert.alert("Incorrect Code");
            }
        }, (e) => {
            Alert.alert("Something went wrong!");
        })
    }

    findEmail = async (email, setUserId, setIsSent) => {
        instance.get(`find?email=${email}`).then((r) => {
            if (r.data.code == 200) {
                setUserId(r.data.id);
                this.reset(r.data.id, false, setIsSent);
            }
            else {
                Alert.alert("Email is not registered.")
            }
        }, (e) => {
            Alert.alert("Something went wrong.")
        })
    }

    resetPassword = async (data, props) => {
        instance.put('reset', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
                Alert.alert("New password has been changed!")
            } else {
                Alert.alert("Something went wrong")
            }
        }).catch((e) => {
            Alert.alert("Something went wrong", e)
        })
    }

    changePassword = async (data, props) => {
        instance.put('changepass', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            if (response.data.code == 200) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Profile' }]
                })
                Alert.alert("New password has been changed!")
            } else {
                Alert.alert("Wrong Current Password")
            }
        }).catch((e) => {
            Alert.alert("Something went wrong", e)
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
                devices: this.state.devices,
                getDevices: this.getDevices,
                device: this.state.device,
                setDevice: this.setDevice,
                updateDevice: this.updateDevice,
                deleteDevice: this.deleteDevice,
                isListingDone: this.state.isListingDone,
                getNotifications: this.getNotifications,
                notifications: this.state.notifications,
                deleteNotifications: this.deleteNotifications,
                questions: this.state.questions,
                signup: this.signup,
                findUsername: this.findUsername,
                securityCheck: this.securityCheck,
                resetPassword: this.resetPassword,
                changePassword: this.changePassword,
                checker: this.checker,
                checkers: this.state.checkers,
                session: this.session,
                verify: this.verify,
                post_verify: this.post_verify,
                findEmail: this.findEmail,
                reset: this.reset,
                post_reset: this.post_reset,
            }}>
                {this.props.children}
            </ApiContext.Provider>
        )
    }
}

export default ApiProvider;