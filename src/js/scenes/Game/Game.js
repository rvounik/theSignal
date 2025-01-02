import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions } from "react-native";
import { useApp } from "../../components/AppProvider/AppProvider";
import BitmapUnit from "./components/BitmapUnit";
import Grid from "./constants/Grid";
import { global } from "../../../style/global";
import { game } from "./style/game";

const Game = () => {
    const tileSize = 50;
    const randomisedTiles = false;

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;
    const numColsInView = 1 + Math.ceil(deviceWidth / tileSize);
    const numRowsInView = 1 + Math.ceil(deviceHeight / tileSize);

    const { addSubscriber, removeSubscriber } = useApp();
    const [playerY, setPlayerY] = useState(0);
    const gridY = useRef(1);
    const [gridOutput, setGridOutput] = useState(null);
    const [gridKey, setGridKey] = useState(0);

    const updatePlayer = () => {
        setPlayerY((prevPlayerY) => prevPlayerY - 1);
    };

    // todo I want buildGrid to have params that determine how the Grid is build
    //  on init we can do the centering as we already did but on shifting time we
    //  can just increase the rendered rows. so this becomes more like a viewport (rename?)
    const buildGrid = (viewPortX, viewPortY = 0) => {
        const tempGridOutput = [];

        for (let rowCount = viewPortY; rowCount < numRowsInView; rowCount++) {
            const rowsOutput = [];

            for (let colCount = 0; colCount < numColsInView; colCount++) {
                console.log(Grid[rowCount][viewPortX + colCount]);

                let imageSource = Grid[rowCount][viewPortX + colCount] === 1
                    ? require('../../../assets/images/filled.png')
                    : require('../../../assets/images/blank.png');

                if (randomisedTiles) {
                    imageSource = Math.random() < 0.5
                        ? require('../../../assets/images/filled.png')
                        : require('../../../assets/images/blank.png');
                }

                rowsOutput.push(
                    <BitmapUnit
                        key={`${rowCount}-${colCount}`}
                        position={{
                            x: colCount * tileSize,
                            y: rowCount * tileSize, // Keep the y-coordinate fixed
                        }}
                        value={Grid[rowCount][viewPortX + colCount]}
                        imageSource={imageSource}
                    />
                );
            }

            tempGridOutput.push(
                <View key={rowCount} style={{ flexDirection: 'row' }}>
                    {rowsOutput}
                </View>
            );
        }

        setGridOutput(tempGridOutput);
        setGridKey((prevKey) => prevKey + 1);
    };

    const checkGrid = () => {
        const remainderY = Math.abs(playerY) - (gridY.current * tileSize);


        if (remainderY > tileSize) {

            updateGrid();

            // increase the viewport Y
            gridY.current++;
        }
    }

    const updateGrid = () => {
        console.log('shift');
    };

    useEffect(() => {
        const updateCallback = () => {
            updatePlayer();
            checkGrid();
        };

        addSubscriber(updateCallback);

        return () => {
            removeSubscriber(updateCallback);
        };
    }, [addSubscriber]);

    useEffect(() => {
        const totalColsInGrid = Grid[0].length;
        const startColIndex = Math.floor(totalColsInGrid / 2) - Math.floor(numColsInView / 2);

        buildGrid(startColIndex, 0);
    }, []);

    useEffect(() => {
        checkGrid();
    }, [playerY]);

    return (
        <View style={global.wrapper}>
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0 + playerY,
                }}
            >
                {gridOutput}
            </View>
        </View>
    );
};

export default Game;
