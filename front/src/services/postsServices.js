import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/posts'

const createToken = async () => {

    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };

    return payloadHeader;
}

export const addPost = async (content,email) => {
    const header = await createToken();
    console.log(content)
    console.log(email)
    const payload ={
        content,
        email
        
    }
    console.log(payload)
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
    
}

export const getPosts = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

