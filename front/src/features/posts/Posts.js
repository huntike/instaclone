import React from "react";


import {Box, Button, Text, TextInput} from "grommet";
import {Refresh} from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";


import { addPost, getPosts } from "../../services/postsServices";
import fire from '../../fire';

import { useSelector, useDispatch } from 'react-redux';
import { update, selectPosts } from './postsSlice.js';

const Counter = () => {
    const  [like,setlike] =React.useState();

    const publishLike = (e) => {
        e.preventDefault();
        //updatePost()
    }

}
const Posts = () => {


    const posts = useSelector(selectPosts);
    const user = fire.auth().currentUser;
    const dispatch = useDispatch();
    const [content, setcontent] =React.useState();
    const [refresh, setrefresh] = React.useState(true);

   

    const publish = (e) => {
        e.preventDefault();
        
        if (content){
            addPost(content,user.email, 0).then(() =>setrefresh(true) )
        }
    }

    React.useEffect(() => {

        const fecthPosts = async () => {
            const fetchData = await getPosts();
            dispatch(update(fetchData));
        }
        if (refresh) {
            fecthPosts();
            setrefresh(false);
        }
        
    }, [refresh])


    return(
        <Box align="center">
            <Box direction="row" gap="small">
                <TextInput placeholder="content" onChange={(e)=> setcontent(e.target.value)} />
                <Button label="publier" onClick={(e)=> publish(e)}/>
            </Box>
            <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
            <Card 
            round="medium" 
            padding="medium" 
            justify="center"
            align="center"
            margin="medium"
            width="large"
            height="large">
                {posts ? 
                posts.map(post => (
                    <CardConcave align="center"
                    justify="center"
                    round="medium"
                    padding="medium"
                    margin="small"
                    width="medium">
                        <Text>{post.content}</Text>
                        <Text>de {post.email}</Text>
                        <Text>Nombre de like {post.like}</Text>

                        <Button  label="Like" />
                        
                    </CardConcave>
                ))

                 : 
                <Text>Ceci sont les posts</Text>
                }
            </Card>
        </Box>
    )
}

export default Posts;