/*Component used in filter to filter movie data*/
import React from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select'; //Imported to allow selection of many components
import { MaterialIcons } from '@expo/vector-icons'; //used in SectionedMultiSelect for chip in select
import { useSelector } from 'react-redux'; //Used for global state managment
import { GET_BUTTON_COLOR, GET_TEXT_COLOR, GET_PRIMARY_COLOR, GET_SECONDARY_COLOR } from '../../reducers/themeReducer'; //Globel state managment of style logic

interface IautocompleteInterface {
    name: string
}

//SectionedMultiSelect oprates on objects not arrays
export const arrayToObjectArray = (array: string[]) => {
    const returnArray: IautocompleteInterface[] = []
    for (let i = 0; i < array.length; i++) {
        returnArray.push({ name: array[i] })
    }
    return returnArray
}

interface IfilterSelect {
    filterOn: string,
    setReturnList: React.SetStateAction<string[]>,
    displayList: string[],
    returnList: string[],
}

export default function FilterSelect(props: IfilterSelect) {

    //Redux states for styling
    const primaryColor = useSelector(GET_PRIMARY_COLOR);
    const textColor = useSelector(GET_TEXT_COLOR)
    const buttonColor = useSelector(GET_BUTTON_COLOR)
    const secondaryColor = useSelector(GET_SECONDARY_COLOR)

    return (
        <View style={{ width: "90%", marginLeft: "3%" }}>
            <SectionedMultiSelect
                style={{ width: "90%", marginHorizontal: "5%" }}
                items={arrayToObjectArray(props.displayList)}
                IconRenderer={MaterialIcons} /*Typescript declaration is not so good in component see issue: https://github.com/renrizzolo/react-native-sectioned-multi-select/issues/63 */
                colors={{
                    searchPlaceholderTextColor: textColor, subText: textColor,
                    selectToggleTextColor: textColor, text: textColor, chipColor: buttonColor
                }}
                styles={{
                    button: { backgroundColor: buttonColor }, itemText: { color: textColor },
                    container: { backgroundColor: secondaryColor }, searchBar: { backgroundColor: secondaryColor },
                    backdrop: { backgroundColor: primaryColor }, item: { backgroundColor: secondaryColor },
                    separator: { backgroundColor: primaryColor }, searchTextInput: { color: textColor }
                }}
                uniqueKey="name"
                selectText={"Filter on " + props.filterOn + "..."}
                onSelectedItemsChange={items => props.setReturnList(items)}
                selectedItems={props.returnList}
            />
        </View>
    )
}