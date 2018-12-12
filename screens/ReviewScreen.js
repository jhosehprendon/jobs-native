import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo'

class ReviewScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Review jobs',
        headerRight: (
            <Button 
                title="Settings" 
                onPress={() => navigation.navigate('settings')}
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0,122,255,1)"
            />
        )
    })

    renderLikedJobs = () => {
        return this.props.likedJobs.map(job => {

            const { company, formattedRelativeTime, url, longitude, latitude } = job;

            const initialRegion = {
                longitude,
                latitude,
                longitudeDelta: 0.045,
                latitudeDelta: 0.02 
            }

            return (
                <Card>
                    <View style={{ height: 200 }}>
                        <MapView 
                            style={{flex: 1}}
                            cacheEnabled={Platform.OS === 'android'}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWarapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button 
                            title='Apply now'
                            backgroundColor='#03A9F4'
                            onPress={() => Linking.openURL(url)} 
                        />
                    </View>
                </Card>
            )
        })
    }
    

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
} 

const styles = {
    detailWarapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
     }
}

const mapStateToProps = state => {
    return {
        likedJobs: state.likedJobs
    }
}

export default connect(mapStateToProps)(ReviewScreen)