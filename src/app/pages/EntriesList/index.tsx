import React, { useEffect } from 'react'
import { RedditEntrie } from './components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { loadList, loadAfter, loadBefore } from '../../store/redditSlice'
import './style.css'
import { Button, CircularProgress } from '@material-ui/core'

export const EntriesList = () => {
    const { items, loaded, before, after, loading, page } = useSelector( (state: RootState) => state.reddit )
    const dispatch = useDispatch()
    useEffect(()=>{
        if( !loaded ){
            dispatch(loadList())
        }
    },[ loaded, dispatch ])
    if (loading) {
        return(
            <CircularProgress />            
        )
    }
    return(
        <div className="entriesHolder">
            {items.map(item => <RedditEntrie {...item} key={item.id} />)}
            <div className="buttons">
                {( before || page >1) && <Button onClick={()=>{dispatch(loadBefore())}}>
                    Previous
                </Button>}
                { (after && page < 5) && <Button onClick={()=>{dispatch(loadAfter())}}>
                    Next
                </Button>}
            </div>
        </div>
    )
}