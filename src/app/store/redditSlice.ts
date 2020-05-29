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
        state.page = action.payload;
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
  },
});

export const { 
    setList,
    setPage,
    setBefore,
    setAfter,
    setLoading,
} = redditSlice.actions;

export const loadList = (): AppThunk => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try{
        const redditResponse = await AxiosService.get('')    
        console.log(redditResponse)
        if (redditResponse.status === 200) {
            dispatch(setAfter(redditResponse.data.after))
            dispatch(setBefore(redditResponse.data.before))
            const { readedEntries/*, dismissedEntries*/ } = getState().reddit
            dispatch(setList(redditResponse.data.data.children/*.filter( ( entrie: any) => !dismissedEntries.includes(entrie.id))*/.map( ( entrie: any ) => {            
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
        alert('Se presento un error al tratar de obtener la lista de entradas')
    } finally{
        dispatch(setLoading(false));
    }    
};

export default redditSlice.reducer;
