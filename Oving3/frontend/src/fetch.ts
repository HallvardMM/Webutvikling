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
get("http://localhost:5000/alltitles")
get("http://localhost:5000/allratings")
get("http://localhost:5000/alldirectors")
get("http://localhost:5000//allyears")
get("http://localhost:5000/allgenres")*/