import React, {useState} from 'react';

//  to parse the query string into a query document
import {useQuery, useMutation} from '@apollo/client'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'

const AddBook= () => {
    const [addName, setAddName] = useState("")
    const [addGenre, setAddGenre] = useState("")
    const [addAuthorId, setAddAuthorId] = useState("")

    const [addBooks] = useMutation(addBookMutation, {
        refetchQueries: [
            {
                query: getBooksQuery
            }
        ]
    })

    const { loading, error, data } = useQuery(getAuthorsQuery)
    if(loading) return <option disabled>Loading Authors...</option>
    if(error) return console.log(`Error! ${error}`)
    if(!data) return <option disabled>Not Found</option>

    // onChange bisa diganti dengan useRef
    // bisa juga dengan menggunakan sejenis "render function"
    const submitForm = (e) => {
        e.preventDefault()
        addBooks({
            variables: {name: addName, genre: addGenre, authorId: addAuthorId}
        })
    }

    return (
        <form id="add-book" onSubmit={submitForm}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e)=> {setAddName(e.target.value) }}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e)=> {setAddGenre(e.target.value) }} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select defaultValue='default' onChange={(e)=> {setAddAuthorId(e.target.value) }}>
                    <option disabled value='default'>Select author</option>
                    {data.authors.map(({name, id})=> (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
            </div>

            <button>+</button>

        </form>
    )
}

export default AddBook;
