import MapActions from './mapConst';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Polyline from '@mapbox/polyline';
import { Dimensions } from 'react-native';

export const searched_location = (location) => {
    return {
        type: MapActions.SEARCHED_LOCATION,
        payload: location
    }
}

const fetch_nearby_success = (data) => {
    return {
        type: MapActions.NEARBY_SUCCESS,
        payload: data
    }
}
const fetch_nearby_rej = (error) => {
    return {
        type: MapActions.NEARBY_REJ,
        payload: error
    }
}
export const set_location = (location) => {
    return {
        type: MapActions.SET_LOCATION,
        payload: location
    }
}

export const fetch_data_nearby = (url) => {
    return dispatch => {
        axios.get(url)
            .then(
            response => {
                console.log('fetch nearby success', response);
                dispatch(fetch_nearby_success(response.data.results));
            })
            .catch(
            error => {
                console.log('fetch nearby error', error)
                dispatch(fetch_nearby_rej(error));
            })
    }
}

const get_location_success = () => {
    return {
        type: MapActions.GET_LOCATION_SUCCESS,
        // payload: location
    }

}

const get_location_rej = () => {
    return {
        type: MapActions.GET_LOCATION_REJ
    }
    // payload: error
}


export const get_location = (dispatch) => {
    return dispatch => {
        navigator.geolocation.getCurrentPosition((position) => {
            if (position) {
                let location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0021,
                    longitudeDelta: 0.0002
                }
                console.log('get location success');
                dispatch(set_location(location));
            }
        },
            (err) => {
                console.log('err', err);
                dispatch(get_location_rej());
            }),
            () => {
                var options = {
                    timeout: 5000,
                    maximumAge: 0
                };
            }
    }

}

const set_current_location = () => {
    return {
        type: MapActions.SET_CURRENT_LOCATION
    }
}

const set_destination = () => {
    return {
        type: MapActions.SET_DESTINATION
    }
}

export const success_direction = (coords) => {
    return {
        type: MapActions.SUCCESS_DIRECTION,
        payload: coords
    }
}

const error_direction = (error) => {
    return {
        type: MapActions.ERROR_DIRECTION,
        payload: error
    }
}

export const get_direction = (dispatch, url) => {
    return async (dispatch) => {
        axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=24.8841584,67.1379614&destination=24.882830499999997,67.0680423')
            .then((resp) => {
                let respJson = resp.json();
                let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return {
                        latitude: point[0],
                        longitude: point[1]
                    }
                })
                // this.setState({coords: coords})
                console.log(
                    'get dir success'
                )
                dispatch(success_direction(coords));
                return coords
            })
            .catch((err) => {
                console.log('get dir err', err);
            })
    }

}