/*Comnponent in top of main page used for searching on spesific films */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SET_SEARCH } from '../../reducers/filterReducer'; // film search logic
import { useDispatch, useSelector } from 'react-redux'; //Global state managment
import { get } from '../../fetch'; //Basic fetch function
import { GET_TEXT_COLOR, GET_SECONDARY_COLOR, GET_PRIMARY_COLOR, GET_BUTTON_COLOR } from '../../reducers/themeReducer'; // Global state managment for styles
import SectionedMultiSelect from 'react-native-sectioned-multi-select'; // Select  names to search on
import { MaterialIcons } from '@expo/vector-icons'; //Used in SectionedMultiSelect
import { arrayToObjectArray } from '../filter/FilterSelect'; //Function Used in SectionedMultiSelect since it wants objects in arrays not arrays

export default function TitleSearch() {
  //Get colors from redux
  const textColor = useSelector(GET_TEXT_COLOR);
  const secondaryColor = useSelector(GET_SECONDARY_COLOR);
  const primaryColor = useSelector(GET_PRIMARY_COLOR)
  const buttonColor = useSelector(GET_BUTTON_COLOR)

  //Set necessary states and define dispatch-function for sending actions
  const dispatch = useDispatch();
  const [select, setSelect] = useState('');
  const [films, setFilms] = useState<string[]>([]);

  useEffect(() => {
    //Fetch the titles of the movies, used by the autocomplete component to display options
    const fetchTitles = async () => {
      const titles = await get("http://it2810-65.idi.ntnu.no:3000/alltitles")
      setFilms(titles)
    };
    fetchTitles();
  }, []);

  const selectNew = (items: unknown[]) => {
    //function to select the search value, and dispatch it to redux state tree
    let search = items.toString()
    setSelect(search)
    dispatch(SET_SEARCH({ searchText: search }))
  }

  return (
    <View style={{ backgroundColor: primaryColor }}>
      <SectionedMultiSelect
        items={arrayToObjectArray(films)}
        IconRenderer={MaterialIcons} /*Typescript declaration is not so good in component see issue: https://github.com/renrizzolo/react-native-sectioned-multi-select/issues/63 */
        selectText={select ? select : "Search for Titles"}
        uniqueKey="name"
        //styling with values from redux
        colors={{
          searchPlaceholderTextColor: textColor, subText: textColor,
          selectToggleTextColor: textColor, text: textColor
        }}
        styles={{
          button: { backgroundColor: buttonColor }, itemText: { color: textColor },
          container: { backgroundColor: secondaryColor }, searchBar: { backgroundColor: secondaryColor },
          backdrop: { backgroundColor: primaryColor }, item: { backgroundColor: secondaryColor },
          separator: { backgroundColor: primaryColor }, searchTextInput: { color: textColor }
        }}
        searchPlaceholderText="Search..."
        //single=true makes only one movie selectable at a time
        single={true}
        onSelectedItemsChange={items => selectNew(items)}
        selectedItems={[select]}
        confirmText="Clear"
        //pressing the "CLEAR" button will clear the search in the redux state tree
        onConfirm={() => (setSelect(''), dispatch(SET_SEARCH({ searchText: '' })))}
      />
    </View>
  );
}