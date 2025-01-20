import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await axios.get('/api/users/profile');
                setUser(response.data);
            }catch(error){
                setError('Error fetching user data');
            } finally{
                setLoading(false);
            }
        };
        fetchUserData();
    },[]);

    if(loading){
        return <div>Loading...</div>;
    }

    if(error){
        return <div>{`An error occured: ${error}`}</div>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {user ?(
                <div>
                    <p><strong>Name:</strong> {user.name} </p>
                    <p><strong>Email:</strong> {user.email} </p>
                    <p><strong>Username:</strong> {user.username} </p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Profile;