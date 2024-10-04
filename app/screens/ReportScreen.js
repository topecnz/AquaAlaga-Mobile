import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { format, subDays } from 'date-fns';
import { ApiContext } from '../../server/Api';

function ReportScreen(props) {
    const context = useContext(ApiContext);
    const [selectedRange, setSelectedRange] = useState('All');
    const [reports, setReports] = useState([]);

    
    useEffect(() => {
        const fetchReports = async () => {
            await context.getReports(); 
            setReports(context.reports || []); 
        };

        fetchReports();
    }, [context]);

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

    const filteredReports = filterReportsByDateRange(reports, selectedRange);

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

            <ScrollView style={styles.body}>
                {filteredReports.length > 0 ? (
                    filteredReports.map((report, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardTitle}>{format(new Date(report.created_at), 'PPpp')}</Text>
                            <Text style={styles.cardText}>Sensor: {report.sensor}</Text>
                            <Text style={styles.cardText}>Data: {report.data}</Text>
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
    body: {
        marginVertical: 60,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2, 
        
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 16,
    },
    noReportsText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 20,
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginVertical: 10,
    },
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
