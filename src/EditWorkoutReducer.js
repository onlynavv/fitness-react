export const EditWorkoutReducer = (state, action) => {
    

    switch(action.type){
        case "LOAD_ACTIVITIES":
            return{...state, workoutSelected: action.payload}

        case "REMOVE_ACTIVITY":
            
            return {
                ...state,
                workoutSelected: state.workoutSelected.filter((item)=> item._id !== action.payload._id)
            }
        
        case "EDIT_DURATION":
            
            const isActivityAvail = state.workoutSelected.find((item)=>{
                return item._id === action.payload._id ? true: false
            })
            return {
                ...state,
                workoutSelected: isActivityAvail && state.workoutSelected.map((item)=>{
                    if(item._id === action.payload._id){
                        return(
                            {
                                ...item,
                                duration: action.payload.durationValue
                            }
                        )
                    }else{
                        return item
                    }
                })
            }

        case "EDIT_DISTANCE":
            
            const isActivityAvailable = state.workoutSelected.find((item)=>{
                return item._id === action.payload._id ? true: false
            })
            return {
                ...state,
                workoutSelected: isActivityAvailable && state.workoutSelected.map((item)=>{
                    if(item._id === action.payload._id){
                        return(
                            {
                                ...item,
                                distance: action.payload.distanceValue
                            }
                        )
                    }else{
                        return item
                    }
                })
            }

            case "EDIT_SETS":
            
            const isDataAvailable = state.workoutSelected.find((item)=>{
                return item._id === action.payload._id ? true: false
            })
            return {
                ...state,
                workoutSelected: isDataAvailable && state.workoutSelected.map((item)=>{
                    if(item._id === action.payload._id){
                        return(
                            {
                                ...item,
                                sets: action.payload.setsValue
                            }
                        )
                    }else{
                        return item
                    }
                })
            }

            case "EDIT_REPS":
            
            const dataAvailable = state.workoutSelected.find((item)=>{
                return item._id === action.payload._id ? true: false
            })
            return {
                ...state,
                workoutSelected: dataAvailable && state.workoutSelected.map((item)=>{
                    if(item._id === action.payload._id){
                        return(
                            {
                                ...item,
                                reps: action.payload.repsValue
                            }
                        )
                    }else{
                        return item
                    }
                })
            }

            case "EDIT_LEVELS":
            
            const dataPresent = state.workoutSelected.find((item)=>{
                return item._id === action.payload._id ? true: false
            })
            return {
                ...state,
                workoutSelected: dataPresent && state.workoutSelected.map((item)=>{
                    if(item._id === action.payload._id){
                        return(
                            {
                                ...item,
                                levels: action.payload.levelsValue
                            }
                        )
                    }else{
                        return item
                    }
                })
            }

            case "EDIT_WEIGHTS":
            
            const isDataPresent = state.workoutSelected.find((item)=>{
                return item._id === action.payload._id ? true: false
            })
            return {
                ...state,
                workoutSelected: isDataPresent && state.workoutSelected.map((item)=>{
                    if(item._id === action.payload._id){
                        return(
                            {
                                ...item,
                                weight: action.payload.weightValue
                            }
                        )
                    }else{
                        return item
                    }
                })
            }
        
        default:
            return state
    }
}