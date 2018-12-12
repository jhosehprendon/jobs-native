import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux'

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
            return (
                <Card>
                    <View style={{ height: 200 }}>
                        <View style={styles.detailWarapper}>
                            <Text style={styles.italics}>{job.company}</Text>
                            <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
                        </View>
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