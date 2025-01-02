import React from "react";
import { View, Text } from "react-native";

export default function GridUnit({ position, backgroundColor }) {
    if (!position || !Object.keys(position)) {
        console.log('wrong position info')
        return null;
    }

    // console.log(position)

    return (
        <View style={{
            backgroundColor,
            width: 50,
            height: 50,
            position: 'absolute',
            left: position.x,
            top: position.y,
        }}>
            <Text>{position.x}, {position.y}</Text>
        </View>
    );
}
