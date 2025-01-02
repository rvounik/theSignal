import React, { useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useApp } from '../../components/AppProvider/AppProvider';
import Scenes from '../../constants/Scenes';
import { global } from '../../../style/global';
import { title } from './style/title';

const Title = ({ handleSceneChange }) => {
    const { addSubscriber, removeSubscriber, playSound, someGlobalMethod } = useApp();

    useEffect(() => {
        const updateCallback = () => {
            /* put your timely logic here */
        };

        addSubscriber(updateCallback);

        return () => {
            removeSubscriber(updateCallback);
        };
    }, [addSubscriber]);

    return (
        <View style={global.wrapper}>
            <View style={title.titleContainer}>
                <Text style={title.titleText}>TITLE</Text>
            </View>
            <View style={title.buttonStart}>
                <Pressable
                    onPress={() => {
                        playSound();
                        handleSceneChange(Scenes.GAME);
                    }}
                >
                    <Text style={title.buttonStartText}>Start</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Title;
