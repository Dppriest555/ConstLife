import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import {
    updateProfile,
    onAuthStateChanged,
    signOut
} from "firebase/auth";




const Profile = () => {
    const [userName, setUserName] = useState("")
    const [profileImage, setProfileImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUserName(user.userName);
            setImageUrl(user.photoURL);
        });
        return () => unsubscribe();
    }, []);

    function handleFileChange(event) {
        setProfileImage(event.target.files[0]);
    }

    const update = () => {
        updateProfile(auth.currentUser, {
            displayName: userName,
        }).then(() => {
            console.log(auth.currentUser.displayName)
            console.log("Profile updated !")
        }).catch((error) => {
            alert('an error occured')
        });

        // Create a storage reference
        const storage = getStorage();
        // Create a reference to the file
        const fileRef = ref(storage, `profile-images/${user.uid}`);
        // Upload the file
        uploadBytes(fileRef, profileImage)
            .then((snapshot) => {
                // Get the download URL
                console.log("Picture Added")
            })

        getDownloadURL(ref(storage, `profile-images/${user.uid}`))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                updateProfile(auth.currentUser, {
                    photoURL: url,
                })
                console.log(url)

            })
            .then(() => {
                console.log('Profile Image updated!');
                navigate("/profile")
            })
            .catch((error) => {
                setError(error);
            });

    }

    const logout = async () => {
        await signOut(auth);
    };



    return (
        <div>
            <div className="container">


                <img src={user.photoURL} alt="Profile" width="200" height="200" />
                <br />
                <h4>{user.displayName}</h4>


                <input
                    className="text-input-grey"
                    placeholder={user.displayName}
                    onChange={(event) => {
                        setUserName(event.target.value);
                    }}
                />
                <br />
                <br />
                <label>
                    Profile Image:
                    <input type="file" onChange={handleFileChange} />
                </label>
                {error && <p>{error.message}</p>}
                <br />
                <button className="btn" onClick={update}>Update</button>
            </div>
            <br />
            <div className="log-out">
                <h4> User Logged In: </h4>
                {user?.email}
                <button className="btn" onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}

export default Profile
