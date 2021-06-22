/*Component used in portrait mode to allow selecting which coloumn to sort on */
import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'; //Picker to pick coloumn
import { useDispatch, useSelector } from 'react-redux'; // Global state managment
import { GET_BUTTON_COLOR, GET_PRIMARY_COLOR, GET_TEXT_COLOR } from '../../reducers/themeReducer'; // Global state managment for styling
import { GET_SORT, SET_SORT } from '../../reducers/filterReducer'; // Global state managment for sorting


export default function SortPicker(props: { closePicker: React.Dispatch<React.SetStateAction<boolean>> }) {
    const reduxOrderBy = useSelector(GET_SORT) //Global state what is being sorted on
    const [sort, setSort] = React.useState(reduxOrderBy); //State for choosing what to sort on. 
    const dispatch = useDispatch(); //Global state managment
    //Styles from redux
    const buttonColor = useSelector(GET_BUTTON_COLOR)
    const primaryColor = useSelector(GET_PRIMARY_COLOR)
    const textColor = useSelector(GET_TEXT_COLOR)

    //Styles what to sort and close picker
    const setOrderBy = () => {
        dispatch(SET_SORT({ reduxSort: sort }))
        props.closePicker(false);
    }

    //Styles
    const styles = StyleSheet.create({
        top: {
            marginTop: "10%",
            marginHorizontal: "5%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }
    });

    return (
        <Modal animationType="slide" /*Orientation support on IOS*/ supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}>
            <View style={{ backgroundColor: primaryColor, height: "100%" }}>
                <View style={styles.top}>
                    <Title style={{ width: "90%", color: textColor }}>Sort on: </Title>
                    <Button style={{ width: 1 }}
                        color={buttonColor}
                        icon="window-close" mode="text"
                        onPress={() => { props.closePicker(false) }}
                    >
                    </Button >
                </View>
                <Picker
                    style={{ width: "90%", marginLeft: "5%", backgroundColor: primaryColor, color: textColor }}
                    selectedValue={sort}
                    itemStyle={{ color: textColor }}
                    onValueChange={(itemValue) =>
                        setSort(itemValue)
                    }>
                    <Picker.Item label="Director" value="director" />
                    <Picker.Item label="Country" value="country" />
                    <Picker.Item label="Genre" value="genre" />
                    <Picker.Item label="Rating" value="rating" />
                    <Picker.Item label="Runtime" value="runtime" />
                    <Picker.Item label="Score" value="score" />
                    <Picker.Item label="Year" value="year" />
                </Picker>
                <Button
                    style={{ width: "90%", marginLeft: "5%", backgroundColor: buttonColor }}
                    mode="contained"
                    disabled={sort === reduxOrderBy}
                    onPress={() => setOrderBy()}
                >
                    Apply Sort
            </Button >
            </View>
        </Modal>
    )
}
