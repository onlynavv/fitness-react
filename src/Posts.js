import React,{useEffect} from 'react';
import { useGlobalContext } from './context';
import PostsCard from './PostsCard';
import "./Posts.css"

const Posts = ({usersActivities}) => {

  const {userState, isUserLoggedIn} = useGlobalContext()

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  return (
    <div className='posts-wrapper'>
        <h2>Posts</h2>
        {usersActivities.length > 0 && usersActivities.map((item)=>{
            return <PostsCard key={item._id} {...item} />
        })}
    </div>
  )
};

export default Posts;
