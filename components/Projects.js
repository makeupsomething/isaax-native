import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import * as api from '../utils/api';

function ProjectList(props) {
    const {navigate} = props.navigation;
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects')
        .then((response) => {
            setProjects(response)
        })
    }, []);

    return (
        <ScrollView style={styles.container}>
            {projects.map(project => {
                return (
                <TouchableHighlight
                    key={project.id}
                    onPress={() => navigate('ProjectDetails', {id: project.id})}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{project.name}</Text>
                    </View>
                </TouchableHighlight>
                )
            })}
        </ScrollView>
    )
}

export default class Projects extends React.Component {
    static navigationOptions = {
        title: 'Projects',
    };
    render() {
        return (
        <View style={{flex: 1}}>
            <View style={styles.headerWrapper}>
                <Text style={styles.header}>
                    Projects
                </Text>
            </View>
            <ProjectList navigation={this.props.navigation} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9ecef',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    headerWrapper: {
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: '#e9ecef',
    },
    header: {
        fontSize: 70,
        color: 'navy',
        marginBottom: 15,
    },
    card: {
        borderTopWidth: 3,
        backgroundColor: 'white',
        borderColor: '#97a7c3',
        marginBottom: 15,
    },
    cardText: {
        fontSize: 30,
        padding: 30,
        color: 'navy',
    }
});
