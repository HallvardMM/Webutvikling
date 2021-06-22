/*Logic for a single row in table */
import React from 'react';
import { TouchableOpacity, View } from "react-native";
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux'; //Global state managment
import { GET_SORT } from '../../reducers/filterReducer'; //Global state managment sorting logic
import { useOrientation } from '../../components/useOrientation'; //Is phone in portrait or landscape mode
import { IMovieData } from './Interfaces'; //Interfaces
import MovieCard from './MovieCard'; //Display movie info modal


export default function Row(props: { row: IMovieData }) {
    const { row } = props; //Props passed form Table
    const [showModal, setShowModal] = React.useState(false) //Show movie data modal?
    let portrait = useOrientation(); //Is phone in portrait or landscape mode
    const reduxOrderBy = useSelector(GET_SORT) //Display correct row in portrait mode

    if (portrait) { //Display two rows in portrait mode (name and row to sort on)
        return (
            <View>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <DataTable.Row key={row._id + 'row'}>
                        <DataTable.Cell key={row._id + 'name'}>
                            {row.name}
                        </DataTable.Cell>
                        <DataTable.Cell key={row._id + 'extra'}>
                            {reduxOrderBy === "name" ? row.director : row.[reduxOrderBy]}
                        </DataTable.Cell>
                    </DataTable.Row>
                </TouchableOpacity>
                { showModal && <MovieCard card={row} display={setShowModal}></MovieCard>}
            </View>
        )
    }
    else { //Display all rows in landscape mode
        return (
            <View>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <DataTable.Row >
                        <DataTable.Cell>{row.name}</DataTable.Cell>
                        <DataTable.Cell>{row.genre}</DataTable.Cell>
                        <DataTable.Cell>{row.director}</DataTable.Cell>
                        <DataTable.Cell>{row.country}</DataTable.Cell>
                        <DataTable.Cell>{row.runtime}</DataTable.Cell>
                        <DataTable.Cell>{row.year}</DataTable.Cell>
                        <DataTable.Cell>{row.score}</DataTable.Cell>
                        <DataTable.Cell>{row.rating}</DataTable.Cell>
                    </DataTable.Row>
                </TouchableOpacity>
                { showModal && <MovieCard card={row} display={setShowModal}></MovieCard>}
            </View>
        )
    }
}
