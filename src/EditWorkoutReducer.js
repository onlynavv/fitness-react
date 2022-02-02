export const EditWorkoutReducer = (state, action) => {
    console.log(action)

    switch(action.type){
        case "LOAD_ACTIVITIES":
            return{...state, workoutSelected: action.payload}

        case "REMOVE_ACTIVITY":
            console.log(action.payload)
            return {
                ...state,
                workoutSelected: state.workoutSelected.filter((item)=> item._id !== action.payload._id)
            }
        
        case "EDIT_DURATION":
            console.log(action.payload)
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
            console.log(action.payload)
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
            console.log(action.payload)
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
            console.log(action.payload)
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
            console.log(action.payload)
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
            console.log(action.payload)
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