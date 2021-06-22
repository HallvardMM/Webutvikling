// get function used in many components

export async function get(url: string) {
    const res = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json()).then(
            (result) => {
                return result
            }
        );
    return res
};

/*
Example of get fetches to database
get("http://it2810-65.idi.ntnu.no:3000/alltitles")
get("http://it2810-65.idi.ntnu.no:3000/allratings")
get("http://it2810-65.idi.ntnu.no:3000/alldirectors")
get("http://it2810-65.idi.ntnu.no:3000/allyears")
get("http://it2810-65.idi.ntnu.no:3000/allgenres")*/