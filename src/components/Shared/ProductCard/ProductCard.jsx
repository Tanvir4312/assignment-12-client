import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProductsCard = ({ product, refetch }) => {
  const { name, photo, tags, votes, _id, ownerEmail } = product || {};
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleVotes = async (id) => {
    if (!user) {
      return navigate("/login");
    }
    try {
      await axiosSecure.patch(`/products/vote/${id}`, {
        userEmail: user?.email,
      });
      toast.success("Thank you for your vote❤️");
      refetch();
    } catch (err) {
      if (err.status === 403) {
        return toast.error(err.response.data.message);
      }
    }
  };
  return (
    <div className="card card-side bg-base-100 shadow-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 m-3">
      <figure className="w-1/3 h-[200px]">
        <img src={photo} alt="Movie" />
      </figure>
      <div className="card-body w-2/3">
        <Link to={'/products-details'}><h2 className="card-title">{name}</h2></Link>
        <div className="flex items-center gap-3">
          <img
            className="w-10"
            src="https://img.icons8.com/?size=160&id=67502&format=png"
            alt=""
          />
          {tags.map((tag, idx) => (
            <span key={idx} className="">
              {tag}
            </span>
          ))}
        </div>
        <div className="card-actions justify-end items-center">
          <p className="text-end mr-7 text-2xl">{votes}</p>
          <button
            disabled={user?.email === ownerEmail}
            onClick={() => handleVotes(_id)}
            className={`btn-ghost ${
              user?.email === ownerEmail
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <img
              src="https://img.icons8.com/?size=100&id=AnzuvMOIYT9c&format=gif"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
