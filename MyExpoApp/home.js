import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value
    const moveAnim = useRef(new Animated.Value(50)).current; // Initial position for upward movement

    useEffect(() => {
        // Start animation when the component mounts
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(moveAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <ImageBackground
            source={require('./assets/h.jpeg')} // Update the path to your image
            style={styles.background}
        >
            <View style={styles.container}>
                <Animated.Text
                    style={[styles.title, { opacity: fadeAnim, transform: [{ translateY: moveAnim }] }]}
                >
                    Welcome to Our Amazing App! We're thrilled to have you here.
                </Animated.Text>
                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={() => navigation.navigate('Login')} color="black" />
                    <View style={styles.buttonGap} /> {/* 20px gap between buttons */}
                    <Button title="Signup" onPress={() => navigation.navigate('Signup')} color="black" />
                </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional overlay for better text visibility
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#808080', // Gray text color
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: '#808080', // Gray background for button container
        borderRadius: 10, // Optional for rounded corners
        padding: 10,
    },
    buttonGap: {
        height: 20, // 20px gap between buttons
    },
});

export default Home;
