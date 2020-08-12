import React from 'react';

//  to parse the query string into a query document
import {gql, useQuery} from '@apollo/client'

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery)
    // console.log(error)
    if(loading) return <p>Loading...</p>
    if(error) return `Error! ${error}`
    if(!data) return <p>Not Found</p>
    
    return data.books.map(({name, id}) => (
        <div key={id}>
            <ul id="book-list">
                <li>{name}</li>
                <li>{id}</li>
            </ul>
        </div>
    ));
}

export default BookList;
