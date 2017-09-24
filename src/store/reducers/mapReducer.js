import MapActions from "../actions/mapConst"

const INITIAL_STATE = {
    test: true,
    location: {
        latitude: 24.8841584,
        longitude: 67.1379614,
        latitudeDelta: 0.0002,
        longitudeDelta: 0.0021,
    },
    currentLocation: {latitude: 24.8841584, longitude: 67.1379614},
    destination: {latitude: 24.882830499999997, longitude: 67.0680423},
    coords : [],
    get_direction_error: '',
    isLocation: false,
    isNearbyData: false,
    nearby_data: [],
    nearby_error: '',

}
export default mapReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MapActions.GET_LOCATION_SUCCESS:
        return {
            ...state,
            isLocation: true
        }
        case MapActions.GET_LOCATION_REJ:
        return {
            ...state,
            isLocation: false
        }
        // set most latest location
        case MapActions.SET_LOCATION:
        return  {
            ...state,
            location: action.payload
        }
        case MapActions.NEARBY_REJ:
        return {
            ...state,
            isNearbyData: false,
            nearby_error: action.payload
        }
        // send data to nearby places array
        case MapActions.NEARBY_SUCCESS:
        return {
            ...state,
            isNearbyData: true,
            nearby_data: action.payload
        }
        // set current location for navigation
        case MapActions.SET_CURRENT_LOCATION:
        return {
            ...state,
            currentLocation: action.payload
        }
        // set destinatio for navigation
        case MapActions.SET_DESTINATION:
        return {
            ...state,
            currentLocation: action.payload
        }
        // set coords for direction
        case MapActions.SUCCESS_DIRECTION:
        return {
            ...state,
            coords: action.payload
        }
        case MapActions.ERROR_DIRECTION:
        return {
            ...state,
            get_direction_error: action.payload
        }
     
        default: return state
    }
}