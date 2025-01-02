import React from "react";
import { Image } from "react-native";

export default function BitmapUnit({ position, value, imageSource }) {
    if (!position || !Object.keys(position)) {
        console.log('wrong position info')
        return null;
    }

    return (
        <Image
                source={imageSource}
                style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    width: 50,
                    height: 50
            }}
        />
    );
}
