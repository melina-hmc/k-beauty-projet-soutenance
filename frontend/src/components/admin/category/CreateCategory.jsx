import { useState } from "react";
import Card from "../../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory, getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import Loader from "../../../components/loader/Loader";

function CreateCategory() {

    const [name, setName] = useState("");
    const { isLoading } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const saveCategory = async (e) => {
        e.preventDefault();

        if(name.length < 3) {
            return toast.error("must be up to 3 characters");
        }
        const formData = {
            name
        }

        await dispatch(createCategory(formData));
        await dispatch(getCategories());
        setName("");
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className="--mb2">
                <h3>Create Category</h3>
                <p>
                    Use the form to <b>Create a Category</b>
                </p>
                <Card cardclass={"card"}>
                    <br />
                    <form onSubmit={saveCategory}>
                        <label>Category Name:</label>
                        <input 
                            type="text"
                            placeholder="Category Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <div className="--my">
                            <button type="submit" className="--btn --btn-primary">
                                Save category
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
)}

export default CreateCategory;