import React, { useEffect } from 'react'
import { RedditEntrie } from './components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { loadList } from '../../store/redditSlice'

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alingItems: 'center'
}

export const EntriesList = () => {
    const { items, loaded } = useSelector( (state: RootState) => state.reddit )
    const dispatch = useDispatch()
    useEffect(()=>{
        if( !loaded ){
            dispatch(loadList())
        }
    },[ loaded, dispatch ])
    console.log(items)
    return(
        <div style={{...style, flexWrap: 'wrap'}}>
            {items.map(item => <RedditEntrie {...item} key={item.id} />)}
        </div>
    )
}