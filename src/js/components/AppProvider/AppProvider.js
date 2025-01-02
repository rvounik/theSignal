import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }

    return context;
};

export const AppProvider = ({ engine, children }) => {
    const subscribersRef = useRef([]);
    const isMountedRef = useRef(true);
    const [sound, setSound] = React.useState();

    const addSubscriber = subscriber => {
        subscribersRef.current = [...subscribersRef.current, subscriber];
    };

    const removeSubscriber = subscriber => {
        subscribersRef.current = subscribersRef.current.filter((s) => s !== subscriber);
    };

    const playSound = async () => {

        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: false,
            shouldDuckAndroid: false
        });

        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('./../../../assets/audio/sample.mp3')
        );

        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    /* example usage of a global method provided by the appProvider */
    const someGlobalMethod = () => {
    };

    // unload sound on unmount
    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // initiate game loop on load
    useEffect(() => {
        const startUpdate = () => {
            setTimeout(() => {
                if (isMountedRef.current) {

                    // handle callbacks for subscribed components
                    subscribersRef.current.forEach((subscriber) => subscriber());

                    // re-initiate update loop
                    startUpdate();
                }
            }, 1000 / engine.fps);
        };

        // call update once
        startUpdate();

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const value = {
        addSubscriber,
        removeSubscriber,
        playSound,
        someGlobalMethod
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
