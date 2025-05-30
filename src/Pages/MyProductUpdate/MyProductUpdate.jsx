// import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Heading from '../../components/Shared/Heading/Heading'
import { useState } from 'react'
import TagsInput from '../Dashboard/UserSlot/AddProducts/TagsInput/TagsInput'
import { toast } from 'react-toastify'

import { useEffect } from 'react'

const MyProductUpdate = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [inputValue, setInputValue] = useState(null)

    const navigate = useNavigate()

    const [product, setProduct] = useState([])


    // const { data: product = {} } = useQuery({
    //     queryKey: ['get-product'],
    //     enabled: !loading,
    //     queryFn: async () => {
    //         const { data } = await axiosSecure.get(`/get-product/${id}`)
    //         return data

    //     }
    // })

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/get-product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])
    const { name, photo, tags, description, links } = product || {}


    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const description = form.description.value;
        const tags = form.tags.value;
        const links = form.links.value;


        // console.table({name, photo, description, links, tagsArr})
        const productUpdate = {
            name,
            photo,
            description,
            links,
            tags
        };

        // Update Data
        try {
            await axiosSecure.put(`/product-update/${id}`, productUpdate);
            toast.success("Your Product Successfully Update");
            navigate("/dashboard/my-product");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div>
                <Heading text={'update your product'}></Heading>
            </div>

            {/* FORM */}
            <div>

                <div className="bg-slate-300 p-5 rounded md:m-0 mx-3">
                    <form className="mt-0" onSubmit={handleUpdate}>
                        {/* Product Name */}

                        <legend className="fieldset-legend">Product Name</legend>
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
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full"
                                defaultValue={name}
                                name="name"
                                type="text"
                                required
                                placeholder="Product Name"
                                title="Only letters, numbers or dash"
                            />
                        </label>

                        {/* PhotoURL */}
                        <legend className="fieldset-legend">Product Photo</legend>
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
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full"
                                defaultValue={photo}
                                name="photo"
                                type="url"
                                required
                                placeholder="https://"
                                title="Must be valid URL"
                            />
                        </label>
                        <p className="validator-hint">Must be valid URL</p>
                        {/* Show Image */}
                        <div>
                            <img className='w-24 h-24 rounded' src={photo} alt="" />
                        </div>

                        {/* Description */}
                        <legend className="fieldset-legend">Product Description</legend>
                        <fieldset className="fieldset pb-5">
                            <textarea
                                onChange={(e) => setInputValue(e.target.value)}
                                className="textarea h-24 w-full"
                                defaultValue={description}
                                name="description"
                                placeholder="Description"
                                required
                            ></textarea>
                        </fieldset>


                        {/* Tags */}
                        <legend className="fieldset-legend">Product Tags</legend>
                        <input
                            onChange={(e) => setInputValue(e.target.value)}
                            type="text"
                            defaultValue={tags}
                            name='tags'

                            placeholder="External Links"
                            className="input w-full mb-5"
                        />



                        {/* External Links */}
                        <legend className="fieldset-legend">External Links</legend>
                        <input
                            onChange={(e) => setInputValue(e.target.value)}
                            type="text"
                            defaultValue={links}
                            name="links"
                            placeholder="External Links"
                            className="input w-full mb-5"
                        />

                        <div className="text-center">
                            <button disabled={!inputValue} className="btn bg-stone-500 border-0 md:w-[15rem] border-white text-white hover:text-black">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MyProductUpdate
