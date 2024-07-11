import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Pressable, ScrollView } from 'react-native';
import MainGradient from '../components/MainGradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataTable } from 'react-native-paper';

function ReportScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <MainGradient/>
            <View>
                <Text style={styles.headerText}>{props.route.name}</Text>
            </View>
            <ScrollView style={styles.body}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Date Time</DataTable.Title>
                        <DataTable.Title>Sensor</DataTable.Title>
                        <DataTable.Title>Data</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>2024-07-01 11:11:11</DataTable.Cell>
                        <DataTable.Cell>Temperature</DataTable.Cell>
                        <DataTable.Cell>27C</DataTable.Cell>
                    </DataTable.Row>

                </DataTable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 36
    },
    headerText: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 40
    },
    body: {
        marginVertical: 60
    },
    card: {
        marginBottom: 32
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: "bold"
    },
    cardBody: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 12,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    recentText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    recentSubText: {
        fontSize: 16,
        color: "grey"
    },
    buttonMargin: {
        marginVertical: 2
    },
    button: {
      height: 50,
      width: "auto",
      backgroundColor: "#0E79B4",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
});

export default ReportScreen;