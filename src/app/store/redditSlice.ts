import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import { AxiosService } from '../services/api'

interface RedditEntrieInterface {    
    title: string,
    author: string,
    date: string,
    thumbnail?: string,
    thumbnail_height?: number,
    thumbnail_width?: number,
    comments: number,
    unread: boolean,
    id: string
}

interface EntriesListInterface {
    items: Array<RedditEntrieInterface>,
    before?: string,
    after?: string,
    page: number,
    loading: boolean,
    loaded: boolean,
    readedEntries: Array<string>,
    dismissedEntries: Array<string>,
}

const initialState: EntriesListInterface = {
    items: [],
    page: 1,
    loading: true,
    loaded: false,
    readedEntries: [],
    dismissedEntries: []
};

export const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Array<RedditEntrieInterface>>) => {
        state.items = action.payload;
        state.loaded = true;
    },
    setPage: (state, action: PayloadAction<number>) => {
        state.page += action.payload;
    },
    setBefore: (state, action: PayloadAction<string>) => {
        state.before = action.payload;        
    },
    setAfter: (state, action: PayloadAction<string>) => {
        state.after = action.payload;        
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
        state.readedEntries.push(action.payload);
        state.items= state.items.map( ( entrie: any) => {
            return {
                ...entrie,
                unread: entrie.id !== action.payload && entrie.unread
            }
        })
    },
    dismissEntrie: (state, action: PayloadAction<string>) => {
        state.dismissedEntries.push(action.payload);
        state.items= state.items.filter( ( entrie: any) => !state.dismissedEntries.includes(entrie.id))
    },
  },
});

export const { 
    setList,
    setPage,
    setBefore,
    setAfter,
    setLoading,
    markAsRead,
    dismissEntrie
} = redditSlice.actions;

export const loadList = (): AppThunk => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try{
        const redditResponse = await AxiosService.get('.json?t=all&limit=10')    
        console.log(redditResponse)
        if (redditResponse.status === 200) {
            dispatch(setAfter(redditResponse.data.data.after))
            dispatch(setBefore(redditResponse.data.data.before))
            const { readedEntries, dismissedEntries } = getState().reddit
            dispatch(setList(redditResponse.data.data.children.filter( ( entrie: any) => !dismissedEntries.includes(entrie.id)).map( ( entrie: any ) => {            
                return {
                    title: entrie.data.title,
                    author: entrie.data.author,
                    date: entrie.data.created,
                    thumbnail: entrie.data.thumbnail,
                    comments: entrie.data.num_comments,
                    thumbnail_height: entrie.data.thumbnail_height,
                    thumbnail_width: entrie.data.thumbnail_width,
                    unread: !readedEntries.includes(entrie.data.id),
                    id: entrie.data.id,
                }
            })))
        }
    } catch( e ){
        alert('Error while getting reddit entries')
    } finally{
        dispatch(setLoading(false));
    }    
};

export const loadAfter = (): AppThunk => async (dispatch, getState) => {    
    const after = getState().reddit.after
    if (!after) {
        alert('Cannot load next page')
        return;
    }
    dispatch(setLoading(true));
    try{

        const redditResponse = await AxiosService.get('.json?t=all&limit=10&after=' + after )    
        console.log(redditResponse)
        if (redditResponse.status === 200) {
            dispatch(setAfter(redditResponse.data.data.after))
            dispatch(setBefore(redditResponse.data.data.before))
            const { readedEntries, dismissedEntries } = getState().reddit
            dispatch(setList(redditResponse.data.data.children.filter( ( entrie: any) => !dismissedEntries.includes(entrie.id)).map( ( entrie: any ) => {            
                return {
                    title: entrie.data.title,
                    author: entrie.data.author,
                    date: entrie.data.created,
                    thumbnail: entrie.data.thumbnail,
                    comments: entrie.data.num_comments,
                    thumbnail_height: entrie.data.thumbnail_height,
                    thumbnail_width: entrie.data.thumbnail_width,
                    unread: !readedEntries.includes(entrie.data.id),
                    id: entrie.data.id,
                }
            })))
            dispatch(setPage(1))
        }
    } catch( e ){
        alert('Error while getting reddit entries')
    } finally{
        dispatch(setLoading(false));
    }    
};

export const loadBefore = (): AppThunk => async (dispatch, getState) => {
    const before = getState().reddit.before
    if (!before) {
        alert('Cannot load previous page')
        return;
    }
    dispatch(setLoading(true));
    try{

        const redditResponse = await AxiosService.get('.json?t=all&limit=10&before=' + before )    
        console.log(redditResponse)
        if (redditResponse.status === 200) {
            dispatch(setAfter(redditResponse.data.data.after))
            dispatch(setBefore(redditResponse.data.data.before))
            const { readedEntries, dismissedEntries } = getState().reddit
            dispatch(setList(redditResponse.data.data.children.filter( ( entrie: any) => !dismissedEntries.includes(entrie.id)).map( ( entrie: any ) => {            
                return {
                    title: entrie.data.title,
                    author: entrie.data.author,
                    date: entrie.data.created,
                    thumbnail: entrie.data.thumbnail,
                    comments: entrie.data.num_comments,
                    thumbnail_height: entrie.data.thumbnail_height,
                    thumbnail_width: entrie.data.thumbnail_width,
                    unread: !readedEntries.includes(entrie.data.id),
                    id: entrie.data.id,
                }
            })))
            dispatch(setPage(-1))
        }
    } catch( e ){
        alert('Error while getting reddit entries')
    } finally{
        dispatch(setLoading(false));
    }    
};

export default redditSlice.reducer;
