import React from 'react'
import {useQuery} from '@apollo/client'
import{getBookQuery} from '../queries/queries'

export default function BookDetail() {
    const {loading, error, data} = useQuery(getBookQuery)
    return (
        <div id='book-details'>
            <p>Output book details here</p>
        </div>
    )
}
