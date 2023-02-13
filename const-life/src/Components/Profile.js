import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import {
    updateProfile,
    onAuthStateChanged
} from "firebase/auth";
import Navbar from './NavBar';




const Profile = () => {
    const [userName, setUserName] = useState("")
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [isUploading, setIsUploading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUserName(currentUser.userName);
        });
        return () => unsubscribe();
    }, []);

    function handleFileChange(event) {
        setProfileImage(event.target.files[0]);
    }



    const update = async () => {
        setIsUploading(true);
        await updateProfile(auth.currentUser, {
            displayName: userName,
        }).then(() => {
            console.log(auth.currentUser.displayName)
            console.log("Profile updated !")
        }).catch((error) => {
            alert('an error occured'+ error)
        })
            .then(() => {
                if (profileImage === null) {
                    console.log("No image selected")
                    setIsUploading(false);
                    navigate("/profile");
                }
                else {

                    // Create a storage reference
                    const storage = getStorage();
                    // Create a reference to the file
                    const fileRef = ref(storage, `profile-images/${user.uid}`);
                    // Upload the file
                    getDownloadURL(ref(storage, `profile-images/${user.uid}`))
                        .then((url) => {
                            // `url` is the download URL for 'images/stars.jpg'

                            // This can be downloaded directly:
                            updateProfile(auth.currentUser, {
                                photoURL: url,
                            })
                            console.log(url)
                            console.log('Profile Image updated!');
                        })
                        .then(() => {
                            uploadBytes(fileRef, profileImage)
                                .then(() => {
                                    setIsUploading(false);
                                    navigate("/profile");
                                    // Get the download URL
                                    console.log("Picture Added")
                                })
                        })
                        .catch((error) => {
                            setError(error);
                        });
                }
            })
            .catch((error) => {
                setError(error);
            });
    }


    return (
        <div className="text-slate-200 h-full flex flex-col justify-between items-center">
            <Navbar />

            {isUploading ? (
                <div>Loading...</div>
            ) : (
                <div className="container flex items-center flex-col">
                    <div className="uPhoto">

                        <img className="rounded-xl" src={user.photoURL} alt="Profile" width="200" height="200" />
                    </div>

                    <br />
                    <div className="mb-2 text-3xl text-slate-900 text-opacity-80">
                        <h4>{user.displayName}</h4>
                    </div>
                    <form>
                    <div>
                        
                        <input required
                            className="placeholder:italic mb-6 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder={user.displayName}
                            onChange={(event) => {
                                setUserName(event.target.value);
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-center">

                        <label className="mb-4 font-bold text-slate-900">
                            Profile Image:
                        </label>
                        <input required className="block w-full text-sm text-slate-500
                                    file:mr-4 pl-10 mb-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-cyan-900
                                    hover:file:bg-violet-100" type="file" onChange={handleFileChange} />

                        {error && <p>{error.message}</p>}
                        <br />
                        <button className="btn bg-green-400 w-20 h-10 rounded-lg font-bold text-cyan-900 mb-6" onClick={update}>Update</button>
                    </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Profile
