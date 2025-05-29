import React, { useState } from 'react'
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Heading from '../../../../components/Shared/Heading/Heading';
import TagsInput from './TagsInput/TagsInput';

const AddProducts = () => {
    const { user } = useAuth();
    const [tags, setTags] = useState([]);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const description = form.description.value;
        const ownerName = form.ownerName.value;
        const ownerEmail = form.ownerEmail.value;
        const links = form.links.value;
        const tagsArr = tags.map((tag) => tag.text);


        const productsObj = {
            name,
            photo,
            description,
            ownerName,
            ownerEmail,
            links,
            tags: tagsArr,
            timestamp: new Date(),
            isFeatured: false,
            votes: 0
        };

        // Save Data
        try {
            await axiosSecure.post("/products", productsObj);
            toast.success("Product save");
            navigate("/dashboard/my-product");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div>
                <Heading text={"add product"}></Heading>
            </div>
            <div className="bg-slate-300 p-5 rounded">
                <form className="mt-0" onSubmit={handleAdd}>
                    {/* User Name */}

                    <label className="input validator w-full">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input
                            className="w-full"
                            name="name"
                            type="text"
                            required
                            placeholder="Product Name"
                            title="Only letters, numbers or dash"
                        />
                    </label>

                    {/* PhotoURL */}
                    <label className="input validator w-full mt-5 -mb-2">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                            </g>
                        </svg>
                        <input
                            className="w-full"
                            name="photo"
                            type="url"
                            required
                            placeholder="https://"
                            title="Must be valid URL"
                        />
                    </label>
                    <p className="validator-hint">Must be valid URL</p>

                    {/* Description */}
                    <fieldset className="fieldset pb-5">
                        <textarea
                            className="textarea h-24 w-full"
                            name="description"
                            placeholder="Description"
                            required
                        ></textarea>
                    </fieldset>

                    {/* Owner Name */}
                    <label className="input validator w-full">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input
                            className="w-full"
                            name="ownerName"
                            type="text"
                            required
                            defaultValue={user && user.displayName}
                            readOnly
                            title="Only letters, numbers or dash"
                        />
                    </label>

                    {/*Owner Email */}
                    <label className="input validator w-full mt-5">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>

                        <input
                            type="email"
                            name="ownerEmail"
                            defaultValue={user && user.email}
                            readOnly
                            required
                        />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>

                    {/* Owner Image */}
                    <div className="my-5">
                        {user && <img className="rounded" src={user.photoURL} alt="" />}
                    </div>
                    <div className="mb-5">
                        <TagsInput tags={tags} setTags={setTags}></TagsInput>
                    </div>

                    {/* External Links */}
                    <input
                        type="text"
                        name="links"
                        placeholder="External Links"
                        className="input w-full mb-5"
                    />

                    <div className="text-center">
                        <button className="btn btn-outline md:w-[15rem] border-white text-white hover:text-black">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProducts
