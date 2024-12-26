import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.153.88:3000'; // Replace with your server IP

const Profile = ({ navigation }) => {
    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No token found. Please login again.');
                return navigation.navigate('Login');
            }

            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setProfile(data.profile);
            } else {
                Alert.alert('Error', data.message || 'Unable to fetch profile.');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Unable to logout. Please try again later.');
        }
    };

    return (
        <ImageBackground
            source={require('./assets/h.jpeg')} // Update the path to your image
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                {profile && (
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileText}>Username: {profile.username}</Text>
                        {/* Add any other profile details you'd like to display */}
                    </View>
                )}
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    color="black" // Button text color
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay for better contrast
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'gray', // Text color for title
    },
    profileContainer: {
        marginBottom: 20,
    },
    profileText: {
        fontSize: 18,
        color: 'gray', // Text color for profile info
    },
});

export default Profile;
