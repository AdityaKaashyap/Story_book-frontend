import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'



const FollowerFollowing = () => {
    const {username} = useParams()
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const res = await api.get(`/followers/${username}/`)
                setFollowers(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        const fetchFollowing = async () => {
            try {
                const res = await api.get(`/following/${username}/`)
                setFollowing(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchFollowers()
        fetchFollowing()
    })

    return(
        <div>
            <h1>Followers</h1>
            <ul>
                {followers.map(follower => (
                    <li key={follower.id}>{follower.username}</li>
                ))}
            </ul>
            <h1>Following</h1>
            <ul>
                {following.map(following => (
                    <li key={following.id}>{following.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default FollowerFollowing