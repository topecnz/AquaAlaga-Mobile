import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import { format, subDays } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';

function NotificationScreen(props) {
    const context = useContext(ApiContext);
    const [selectedRange, setSelectedRange] = useState('All');
    
    useEffect(() => {
        console.log('Fetching notifications...');
        context.getNotifications();
    }, []);

    // Function to filter notifications by date range
    function filterNotificationsByDateRange(notifications, range) {
        const now = new Date();
        let filteredNotifications = [];

        switch (range) {
            case 'Today':
                filteredNotifications = notifications.filter(notification =>
                    new Date(notification.created_at).toDateString() === now.toDateString()
                );
                break;
            case 'Yesterday':
                filteredNotifications = notifications.filter(notification =>
                    new Date(notification.created_at).toDateString() === subDays(now, 1).toDateString()
                );
                break;
            case '1 Week Ago':
                filteredNotifications = notifications.filter(notification =>
                    new Date(notification.created_at) >= subDays(now, 7)
                );
                break;
            case '1 Month Ago':
                filteredNotifications = notifications.filter(notification =>
                    new Date(notification.created_at) >= subDays(now, 30)
                );
                break;
            default:
                filteredNotifications = notifications; 
        }

        return filteredNotifications;
    }

    const filteredNotifications = filterNotificationsByDateRange(context.notifications || [], selectedRange);

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient />
            <View>
                <Text style={styles.headerText}>{props.route.name}s</Text>
            </View>

            <RNPickerSelect
                onValueChange={(value) => setSelectedRange(value)}
                items={[
                    { label: 'All', value: 'All' },
                    { label: 'Today', value: 'Today' },
                    { label: 'Yesterday', value: 'Yesterday' },
                    { label: '1 Week Ago', value: '1 Week Ago' },
                    { label: '1 Month Ago', value: '1 Month Ago' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select Date Range', value: 'All' }}
            />

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((notification, index) => (
                        <View key={index} style={styles.notificationCard}>
                            <Text style={styles.recentText}>{notification.message}</Text>
                            <Text style={styles.timestampText}>
                                {format(new Date(notification.created_at), 'MMMM d, yyyy, h:mm a')}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noNotificationsText}>No notifications available for this date range.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 36,
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingTop: 40,
    },
    notificationCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    recentText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    timestampText: {
        fontSize: 14,
        color: 'grey',
        marginTop: 5,
    },
    noNotificationsText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 20,
    },
});

const pickerSelectStyles = {
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        marginVertical: 10,
    },
};

export default NotificationScreen;
