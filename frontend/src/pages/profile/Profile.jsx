import { useEffect, useState } from "react";
import PageMenu from "../../components/pageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import { getUser, updateUser, updatePhoto, selectUser } from "../../redux/features/auth/authSlice";
import { shortenText } from "../../utils";
import Loader from "../../components/loader/Loader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";

const cloud_name = import.meta.env.VITE_REACT_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_REACT_APP_UPLOAD_PRESET;
const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const Profile = () => {
    const dispatch = useDispatch();
    const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
      (state) => state.auth
    );
    const initialState = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        address: user?.address || {},
      };
      
    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
  
    const handleImageChange = (e) => {
      setProfileImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    };
  
    const savePhoto = async (e) => {
      e.preventDefault();
      let imageURL;
      try {
        if (
          profileImage !== null &&
          (profileImage.type === "image/jpeg" ||
            profileImage.type === "image/jpg" ||
            profileImage.type === "image/png")
        ) {
          const image = new FormData();
          image.append("file", profileImage);
          image.append("cloud_name", cloud_name);
          image.append("upload_preset", upload_preset);
  
          // Save image to Cloudinary
          const response = await fetch(
            url,
            { method: "post", body: image }
          );
          const imgData = await response.json();
        //   console.log(imgData);
          imageURL = imgData.url.toString();
        }
  
        // Save photo to MongoDB
        const userData = {
          photo: profileImage ? imageURL : profile.photo,
        };
  
        dispatch(updatePhoto(userData));
        setImagePreview(null);
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    useEffect(() => {
        if (user === null) {
          dispatch(getUser());
        }
      }, [dispatch, user]);
      // console.log(user);
      useEffect(() => {
        if (user) {
          setProfile({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            role: user.role || "",
            address: user.address || {},
          });
        }
      }, [user]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
      };
    
      const saveProfile = async (e) => {
        e.preventDefault();
        try {
          const userData = {
            name: profile.name,
            phone: profile.phone,
            address: {
              address: profile.address,
              state: profile.state,
              country: profile.country,
            },
          };
          console.log(userData);
    
          dispatch(updateUser(userData));
        } catch (error) {
          toast.error(error.message);
        }
      };
    //   console.log(profile);
    return (
      <>
        <section>
          {isLoading && <Loader />}
          <div className="container">
            <PageMenu />
            <div className="--flex-start profile">
              <Card cardClass={"card"}>
                {!isLoading && (
                  <>
                    <div className="profile-photo">
                      <div>
                        <img
                          src={imagePreview === null ? user?.photo : imagePreview}
                          alt="Profileimg"
                        />
                        <h3>Role: {profile.role}</h3>
                        {imagePreview !== null && (
                          <div className="--center-all">
                            <button
                              className="--btn --btn-secondary"
                              onClick={savePhoto}
                            >
                              <AiOutlineCloudUpload size={18} /> &nbsp; Upload
                              Photo
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <form onSubmit={saveProfile}>
                      <p>
                        <label>Change Photo:</label>
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={handleImageChange}
                        />
                      </p>
                      <p>
                        <label>Nom:</label>
                        <input
                          type="text"
                          name="name"
                          value={profile?.name}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <p>
                        <label>Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={profile?.email}
                          onChange={handleInputChange}
                          disabled
                        />
                      </p>
                      <p>
                        <label>Téléphone:</label>
                        <input
                          type="text"
                          name="phone"
                          value={profile?.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <p>
                        <label>Adresse:</label>
                        <input
                          type="text"
                          name="address"
                          value={profile?.address?.address}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <p>
                        <label>Ville:</label>
                        <input
                          type="text"
                          name="state"
                          value={profile?.address?.state}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <p>
                        <label>Pays:</label>
                        <input
                          type="text"
                          name="country"
                          value={profile?.address?.country}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <button className="--btn --btn-primary --btn-block">
                        Mettre à jour le profil
                      </button>
                    </form>
                  </>
                )}
              </Card>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export const UserName = () => {
    const user = useSelector(selectUser);
  
    const username = user?.name || "...";
  
    return (
      <span style={{ color: "#f5f5f5" }}>{shortenText(username, 4)}</span>
    );
  };

export default Profile;