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
            setUserName(currentUser.displayName);
        });
        return () => unsubscribe();
    }, []);

    function handleFileChange(event) {
        setProfileImage(event.target.files[0]);
    }



    const update = async () => {
        setIsUploading(true);
    
        try {
            await updateProfile(auth.currentUser, {
                displayName: userName,
            });
    
            if (profileImage !== null) {
                const storage = getStorage();
                const fileRef = ref(storage, `profile-images/${user.uid}`);
                
                // Upload the file
                await uploadBytes(fileRef, profileImage);
    
                // Get the download URL after successful upload
                const url = await getDownloadURL(fileRef);
    
                // Update the user's photoURL with the download URL
                await updateProfile(auth.currentUser, {
                    photoURL: url,
                });
    
                console.log('Profile Image updated!');
            }
    
            console.log('Profile updated!');
            setIsUploading(false);
            navigate("/profile");
        } catch (error) {
            setError(error);
            setIsUploading(false);
            console.error('Error updating profile:', error);
        }
    };
    


    return (
        <div className="text-slate-200 h-full flex flex-col justify-between items-center">
            <Navbar />

            {isUploading ? (
                <div>Loading...</div>
            ) : (
                <div className="container flex items-center flex-col">
                    <div className="uPhoto">

                        <img className="rounded-xl" src={user.photoURL} alt="Profile" width="400" height="400" />
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
