import React from 'react';
import { ScrollView, View } from 'react-native'
import { Subheading, Paragraph, TextInput, Button, HelperText, DefaultTheme } from 'react-native-paper';
import DisplayReviews from './DisplayReviews';
import { IReviewsProps, IReview, IPostReview } from './Interfaces'; //Interfaces for reviews
import { GET_USER } from '../../reducers/loginReducer';  //Display logged in name and check if logged in
import { useSelector } from 'react-redux';  //Global state managemnet
import { GET_SECONDARY_COLOR, GET_BUTTON_COLOR, GET_TEXT_COLOR } from '../../reducers/themeReducer'; //Global state managemnet for themes


async function setReviewDB(review: IPostReview) {
    // Function used for posting reviews in DB
    const body = JSON.stringify(review)
    fetch('http://it2810-65.idi.ntnu.no:3000/review', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })
}

const addReview = async (movieId: string, name: string, review: string,
    listOfReviews: IReview[],
    setListOfReviews: React.Dispatch<React.SetStateAction<IReview[]>>,
    setReview: React.Dispatch<React.SetStateAction<string>>) => {
    /* Updates list of reviews in component, 
    setReview to empty string and sends new review to DB*/
    const clonedListOfReviews = [...listOfReviews];
    clonedListOfReviews.push({ name: name, review: review })
    setListOfReviews(clonedListOfReviews)
    await setReviewDB({ _id: movieId, review: { name: name, review: review } })
    setReview("")
}

export default function Review(props: IReviewsProps) {
    const name = useSelector(GET_USER); //Name of logged in user from redux
    const [review, setReview] = React.useState(""); // Review from user
    const [isLoading, setIsLoading] = React.useState(true); //Is component fetching reviews?
    const [listOfReviews, setListOfReviews] = React.useState<IReview[]>([]); //List of reviews to display
    const [addReviews, setAddReviews] = React.useState(false); //Show reviews or add review

    const reviewColor = useSelector(GET_SECONDARY_COLOR)
    const reviewText = useSelector(GET_TEXT_COLOR)
    const buttonColor = useSelector(GET_BUTTON_COLOR)

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: reviewText,
            text: reviewText

        },
    };

    React.useEffect(() => {
        // Fetch reviews from backend using movieID
        const send = { _id: props.movieId }
        const body = JSON.stringify(send)
        fetch('http://it2810-65.idi.ntnu.no:3000/getreviews', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }).then((res) => res.json()).then(
            (result) => {
                if (result.length !== 0) {
                    setListOfReviews(result[0].reviews)
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                }

            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (addReviews) { //Add review
        return (
            <View>
                <Subheading style={{ color: reviewText }}>
                    Reviews
                </Subheading>
                <ScrollView style={{ height: "100%" }}>
                    <Button
                        mode="contained"
                        onPress={() => setAddReviews(false)}
                        style={{ backgroundColor: buttonColor }}
                    >
                        Show Reviews
                </Button >
                    {name ? <Paragraph style={{ color: reviewText }}>
                        Name: {name}
                    </Paragraph> : <Paragraph style={{ color: reviewText }}>
                            User not logged in
                    </Paragraph>
                    }
                    <TextInput
                        placeholder={!name ? "Review disabled" : "Review"}
                        mode="flat"
                        disabled={!name}
                        theme={theme}
                        value={review}
                        underlineColor={reviewText}
                        selectionColor={reviewText}
                        underlineColorAndroid={reviewText}
                        style={{ backgroundColor: reviewColor, color: reviewText }}
                        onChangeText={Text => setReview(Text)}
                        maxLength={256}
                    />
                    <HelperText type="info" style={{ color: reviewText }}>
                        {review.length.toString()}/256
                </HelperText>
                    <Button style={{ backgroundColor: buttonColor }} mode="contained" disabled={!name || !review}
                        onPress={() => { addReview(props.movieId, name, review, listOfReviews, setListOfReviews, setReview), setAddReviews(false) }}>
                        Add Review
                </Button>
                </ScrollView>
            </View>
        )
    }
    else { //Show reviews
        return (
            <View>
                <Subheading style={{ color: reviewText }}>
                    Reviews
                </Subheading>
                <Button
                    style={{ backgroundColor: buttonColor }}
                    mode="contained"
                    onPress={() => setAddReviews(true)}>
                    Write a Review
                    </Button>
                {isLoading ? <Paragraph style={{ color: reviewText }}>Reviews are loading</Paragraph > :
                    <DisplayReviews movieName={props.movieName} reviews={listOfReviews}></DisplayReviews>}
            </View>
        );
    }
}
