import axios from "axios";
import { API_URL, api_url } from "./constants";


export const guestDataPost = async (url, data) => {
    try{
    const config = {
        method: 'post',
        url: '',
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json'
        },
        data: data
    };
    const res = await axios.post(API_URL + url,config);
    return res;
    } catch (err) {
        console.log(err);
    }
};


// login and register request will go here
export const uniDataPost = async (url, data) => {
    try{
    const config = {
        method: 'post',
        url: '',
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json'
        },
        data: data
    };
    const res = await axios.post(api_url(data.appname) + url,config);
    return res;
    } catch (err) {
        console.error(err.response.data);
    }
};

export const uploadMultipart = async (url, data) => {
    try{
    const config = {
        method: 'post',
        url: '',
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data' 
        },
        responseType: 'stream',
        data: data
    };
    const res = await axios.post(url,config);
    console.log("multipart data" + JSON.stringify(res.data));
    return res;
    } catch (err) {
        console.log(err);
    }
};