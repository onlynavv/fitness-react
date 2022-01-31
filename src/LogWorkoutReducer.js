export const LogWorkoutReducer = (state, action) => {
    console.log(action)

    switch (action.type) {
        case "ADD_EXERCISES":
            return{...state, workoutSelected: action.payload}

        case "ADD_SET":
            console.log(action.payload._id)
            const isActivityPresent = state.workoutSelected.find((item)=>{
                return item._id == action.payload._id ? true : false
            })

            return {
                ...state,
                workoutSelected: isActivityPresent && state.workoutSelected.map((item)=>{
                    if(item._id === action.payload._id){
                        if(item.setsPerformed && item.setsPerformed.length > 0){
                            return{
                                ...item,
                                setsPerformed:[...item.setsPerformed, action.payload]
                            }
                        }else{
                            return {
                                ...item,
                                setsPerformed:[action.payload]
                            }
                        }
                    }else{
                        return item
                    }
                })
            }

        case "REMOVE_ACTIVITY":
            console.log(action.payload)
            return {
                ...state,
                workoutSelected: state.workoutSelected.filter((item)=> item._id !== action.payload._id)
            }
            
        case "REMOVE_SET":
            console.log(action.payload)
            const findActivity = state.workoutSelected.find((item)=>{
                return item._id === action.payload.activityId ? true: false
            })
            
            return {
                ...state,
                workoutSelected: findActivity && state.workoutSelected.map((item)=>{
                     if(item._id === action.payload.activityId){
                         return {
                             ...item,
                             setsPerformed:item.setsPerformed.filter((item)=> item.setId !== action.payload.setId)
                         }
                     }else{
                         return item
                     }
                })
            }

        case "CHANGE_DURATION":
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

        case "CHANGE_DISTANCE":
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

            case "CHANGE_SETS":
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

            case "CHANGE_REPS":
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

            case "CHANGE_LEVELS":
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

            case "CHANGE_WEIGHTS":
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