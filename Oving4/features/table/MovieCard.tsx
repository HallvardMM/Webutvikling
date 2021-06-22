/*Modal with info about film */
import React from 'react';
import { View, StyleSheet, Modal, ScrollView } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';
import { useSelector } from 'react-redux'; //Global state managment
import { GET_SECONDARY_COLOR, GET_BUTTON_COLOR, GET_PRIMARY_COLOR, GET_TEXT_COLOR } from '../../reducers/themeReducer'; //Global state managment for style
import { useOrientation } from '../../components/useOrientation'; //Check if phone is portrait or landscape
import Review from '../review/Review'; //Review component
import { IMovieData } from './Interfaces' //Intreface for moviedata


export default function movieCard(props: { card: IMovieData, display: React.Dispatch<React.SetStateAction<boolean>> }) {
    //styling colors from the redux theme
    const primaryColor = useSelector(GET_PRIMARY_COLOR);
    const textColor = useSelector(GET_TEXT_COLOR);
    const secondaryColor = useSelector(GET_SECONDARY_COLOR);
    const buttonColor = useSelector(GET_BUTTON_COLOR);

    //returns true/false depending on if the phone is in portrait or landscape mode
    const portrait = useOrientation();

    //Styling
    const styles = StyleSheet.create({
        centeredView: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "transparent"
        },
        modalView: {
            height: '100%',
            width: '100%',
            borderRadius: 2,
            padding: 20,
            shadowColor: "#000",
            backgroundColor: primaryColor,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        },
        top: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }
    });

    return (
        <Modal
            supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']} //Suport for orientation in IOS
            animationType="slide"
            onRequestClose={() => props.display(false)}
            style={{ borderWidth: 0, borderColor: 'none' }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.top}>

                        <Title style={{ width: "80%", color: textColor }}>{props.card.name} ({props.card.year})</Title>
                        <Button style={{ width: 1 }}
                            icon="window-close" mode="text"
                            onPress={() => props.display(false)}
                            color={buttonColor}
                        >
                        </Button >
                    </View>
                    {portrait /*Styling in portrait mode*/ && <ScrollView style={{ height: "30%" }}>
                        <View style={{ display: "flex", backgroundColor: secondaryColor, borderRadius: 10, padding: 5 }}>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Paragraph style={{ color: textColor }}>{props.card.rating} </Paragraph>
                                <Paragraph style={{ color: textColor }}> | </Paragraph>
                                <Paragraph style={{ color: textColor }}>{props.card.runtime} min</Paragraph>
                                <Paragraph style={{ color: textColor }}> | </Paragraph>
                                <Paragraph style={{ color: textColor }}>{props.card.genre}</Paragraph>
                                <Paragraph style={{ color: textColor }}> | </Paragraph>
                                <Paragraph style={{ color: textColor }}>{props.card.country}</Paragraph>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Paragraph style={{ color: textColor }}>Released: {props.card.released}</Paragraph>
                                <Paragraph style={{ color: textColor }}>Company: {props.card.company}</Paragraph>
                                <Paragraph style={{ color: textColor }}>Director: {props.card.director}</Paragraph>
                                <Paragraph style={{ color: textColor }}>Writer: {props.card.writer}</Paragraph>
                                <Paragraph style={{ color: textColor }}>Star: {props.card.star}</Paragraph>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Paragraph style={{ color: textColor }}>Score: {props.card.score}</Paragraph>
                                <Paragraph style={{ color: textColor }}>  |  </Paragraph>
                                <Paragraph style={{ color: textColor }}>Votes: {props.card.votes}</Paragraph>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Paragraph style={{ color: textColor }}>Budget: {props.card.budget}</Paragraph>
                                <Paragraph style={{ color: textColor }}>  |  </Paragraph>
                                <Paragraph style={{ color: textColor }}>Gross: {props.card.gross}</Paragraph>
                            </View>
                        </View>
                    </ScrollView>}
                    {!portrait /*Styling in landscape mode*/ && <ScrollView style={{ height: "30%" }}>
                        <View style={{ display: "flex", backgroundColor: secondaryColor, borderRadius: 10 }}>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                <Paragraph style={{ color: textColor }}>{props.card.rating} </Paragraph>
                                <Paragraph style={{ color: textColor }}> | </Paragraph>
                                <Paragraph style={{ color: textColor }}>{props.card.runtime} min</Paragraph>
                                <Paragraph style={{ color: textColor }}> | </Paragraph>
                                <Paragraph style={{ color: textColor }}>{props.card.genre}</Paragraph>
                                <Paragraph style={{ color: textColor }}> | </Paragraph>
                                <Paragraph style={{ color: textColor }}>{props.card.country}</Paragraph>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                                <Paragraph style={{ color: textColor }}>Released: {props.card.released}</Paragraph>
                                <Paragraph style={{ color: textColor }}>Company: {props.card.company}</Paragraph>
                                <Paragraph style={{ color: textColor }}>Director: {props.card.director}</Paragraph>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                                <Paragraph style={{ color: textColor }}>Writer: {props.card.writer}</Paragraph>
                                <Paragraph style={{ color: textColor }}>Star: {props.card.star}</Paragraph>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                <Paragraph style={{ color: textColor }}>Score: {props.card.score}</Paragraph>
                                <Paragraph style={{ color: textColor }}>  |  </Paragraph>
                                <Paragraph style={{ color: textColor }}>Votes: {props.card.votes}</Paragraph>
                                <Paragraph style={{ color: textColor }}>   |  </Paragraph>
                                <Paragraph style={{ color: textColor }}>Budget: {props.card.budget}</Paragraph>
                                <Paragraph style={{ color: textColor }}>  |  </Paragraph>
                                <Paragraph style={{ color: textColor }}>Gross: {props.card.gross}</Paragraph>
                            </View>
                        </View>
                    </ScrollView>}
                    <View style={{ height: "60%" }}>
                        <Review movieId={props.card._id} movieName={props.card.name}></Review>
                    </View>
                </View>
            </View>
        </Modal>
    );
}