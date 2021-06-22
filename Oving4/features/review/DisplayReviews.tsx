// Component to display reviews recived from backend or user
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Paragraph } from 'react-native-paper';
import { IDisplayReviewsProps } from './Interfaces'; //Interfaces used for reviews
import { useOrientation } from '../../components/useOrientation'; //Is the mobile in portrait or landscape mode
import { useSelector } from 'react-redux'; //global state managment
import { GET_SECONDARY_COLOR, GET_TEXT_COLOR } from '../../reducers/themeReducer'; //global state managment for themes

const DisplayReviews: Function = (prop: IDisplayReviewsProps) => {

    //Color themes from redux
    const secondaryColor = useSelector(GET_SECONDARY_COLOR)
    const textColor = useSelector(GET_TEXT_COLOR)

    let portrait = useOrientation(); //Is the mobile in portrait mode?

    //Styling
    const styles = StyleSheet.create({
        list: {
            marginVertical: 5,
            height: "75%",
        },
        horisontalList: {
            marginVertical: 5,
            height: "50%",
        },
        item: {
            backgroundColor: secondaryColor,
            color: textColor,
            padding: 20,
            borderRadius: 10,
            marginVertical: 8,
            marginHorizontal: 16,
        },
        title: {
            fontSize: 10,
            color: textColor,
        },
        review: {
            color: textColor,
            fontSize: 14,
        }
    });


    if (prop.reviews.length) {// Reviews exists for this film
        if (portrait) { // Mobile in portrait mode
            return (
                <View>
                    <FlatList style={styles.list}
                        data={prop.reviews}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.review}>{item.review}</Text>
                                <Text style={styles.title}>Review by {item.name}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.review}
                    />
                </View>
            )
        }
        else { // Mobile in landscape mode
            return (
                <View>
                    <FlatList style={styles.horisontalList}
                        data={prop.reviews}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.review}>{item.review}</Text>
                                <Text style={styles.title}>Review by {item.name}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.review}
                    />
                </View>
            )
        }
    }
    else {// No reviews exists for this film
        return (
            <Paragraph style={{ color: textColor }}>
                No reviews exists for this film! Would you like to add one?
            </Paragraph>
        )
    }
}

export default DisplayReviews;