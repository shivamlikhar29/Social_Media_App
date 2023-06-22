import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE,FETCH_BY_SEARCH} from '../constants/actionTypes'

const posts = (state=[],action) =>{

    switch(action.type){
        case UPDATE:
           return state.map((post)=> post._id === action.payload._id ? action.payload : post)

        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }

        case CREATE:
            return [...state,action.payload]

        case DELETE:
            return state.filter((post)=>post._id !== action.payload )
    
        case LIKE:
            return state.map((post)=> post._id === action.payload._id ? action.payload : post)
        
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts:action.payload.data,
            }

        default:
            return posts

    }
}

export default posts

