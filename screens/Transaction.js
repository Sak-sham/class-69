import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as Permissions from "expo-permissions"
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class TransactionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domState: "normal",
            hasCameraPermission: null,
            scanned: false,
            scannedData: "",
        }
    }

    getCameraPermissions = async domState => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === "granted",
            domState: domState,
            scanned: false,
        })
    }

    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scannedData:data,
            domState:"normal",
            scanned:true,
        })
    }

    render() {
        const { domState, hasCameraPermission, scannedData, scanned } = this.state
        if (domState==="scanner"){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>

                    {hasCameraPermission ? scannedData : "Request for Camera permission!"}

                </Text>

                <TouchableOpacity style={styles.button}
                    onPress={() => this.getCameraPermissions("scanner")}>
                    <Text style={styles.buttonText}>
                        Scan QR Code!
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#5653D4"
        },

        buttonText: {
            color: "#ffff",
            fontSize: 25,

        },
        button: {
            width: "43%",
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F48D20",
            borderRadius: 10,
        }
    }
)
