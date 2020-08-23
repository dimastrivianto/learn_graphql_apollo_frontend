import React from 'react';

//  to parse the query string into a query document
import {useQuery} from '@apollo/client'
import {getBooksQuery} from '../queries/queries'
import BookDetail from './BookDetail';

// queries bisa d buat d dalam component atau d luar component

// const getBooksQuery = gql`
//     {
//         books {
//             name
//             id
//         }
//     }
// `

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery)
    // console.log(data)
    if(loading) return <p>Loading books...</p>
    if(error) return `Error! ${error}`
    if(!data) return <p>Not Found</p>
    
    // bisa juga dengan menggunakan sejenis "render function"

    return (
        <div>
            <ul id="book-list" >
                {data.books.map(({name, id}) => (
                        <li key={id} onClick={()=> {detail(id)}}>{name}</li>
                ))}
            </ul>
            <BookDetail />
        </div>
    )
}

export default BookList;
