import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiContext } from '../../server/Api';
import { format, subDays } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';

function ReportScreen(props) {
    const context = useContext(ApiContext);
    const [selectedRange, setSelectedRange] = useState('All');
    
    useEffect(() => {
        console.log('Fetching reports...');
        context.getReports();
    }, []);

    // Function to filter reports by date range
    function filterReportsByDateRange(reports, range) {
        const now = new Date();
        let filteredReports = [];

        switch (range) {
            case 'Today':
                filteredReports = reports.filter(report =>
                    new Date(report.created_at).toDateString() === now.toDateString()
                );
                break;
            case 'Yesterday':
                filteredReports = reports.filter(report =>
                    new Date(report.created_at).toDateString() === subDays(now, 1).toDateString()
                );
                break;
            case '1 Week Ago':
                filteredReports = reports.filter(report =>
                    new Date(report.created_at) >= subDays(now, 7)
                );
                break;
            case '1 Month Ago':
                filteredReports = reports.filter(report =>
                    new Date(report.created_at) >= subDays(now, 30)
                );
                break;
            default:
                filteredReports = reports; 
        }

        return filteredReports;
    }

    const filteredReports = filterReportsByDateRange(context.reports || [], selectedRange);

    return (
        <SafeAreaView style={styles.container}>
            <MainGradient />
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
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
            <ScrollView style={{ marginBottom: 50 }}>
                 {filteredReports.length > 0 ? (
                   filteredReports.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((report, index) => (
                <View key={index} style={styles.cardBody}>
                    <View style={styles.cardContent}>
                        <Text style={styles.recentText}>
                            {format(new Date(report.created_at), 'MMMM d, yyyy, h:mm a')}
                        </Text>
                        <Text style={styles.recentSubText}>Sensor: {report.sensor}</Text>
                        <Text style={styles.recentSubText}>Data: {report.data}</Text>
                    </View>
                </View>
            ))
    ) : (
        <Text style={styles.noReportsText}>No reports available for this date range.</Text>
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
    cardBody: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    cardContent: {
        flexDirection: 'column',
    },
    recentText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    recentSubText: {
        fontSize: 16,
        color: 'grey',
    },
    noReportsText: {
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

export default ReportScreen;
