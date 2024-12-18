import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import useAddReview from "./useAddReview";
import useUpdateReview from "./useUpdateReview";

export default function ReviewsSection({ reviews, productId, currentUser }) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [editingReview, setEditingReview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      review: "",
      rating: 5,
    },
  });

  const { addReview, isAddingReview } = useAddReview();
  const { isUpdatingReview, updateReview } = useUpdateReview();
  useEffect(() => {
    // Check if the current user has already left a review
    const userReview = reviews.find(
      (review) => review.user.id === currentUser.id
    );
    if (userReview) {
      setEditingReview(userReview);
      reset({
        review: userReview.review,
        rating: userReview.rating,
      });
      setNewRating(userReview.rating);
    }
  }, [reviews, currentUser, reset]);

  const handleSubmitReview = (data) => {
    data.rating = newRating;
    if (editingReview) {
      console.log(data);
      console.log(editingReview);
      updateReview({ data, id: editingReview._id, productId });
    } else {
      addReview({ id: productId, data });
    }
    reset();
    setNewRating(0);
  };

  const handleRatingChange = (rating) => {
    setNewRating(rating);
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <section className="reviews-section">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

      <div className="reviews-list mb-6">
        {displayedReviews.map((review, index) => (
          <div
            key={index}
            className="review-item p-4 mb-4 bg-gray-100 rounded-lg"
          >
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
              <img
                src={review.user.image}
                alt={review.user.fullName}
                width={40}
                height={40}
                className="rounded-full ml-4"
              />
              <span className="ml-2 text-gray-700">{review.user.fullName}</span>
            </div>
            <p className="text-gray-600">{review.review}</p>
          </div>
        ))}

        {reviews.length > 3 && (
          <Button
            variant="link"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? "See Less" : "See More"}
          </Button>
        )}
      </div>

      <form
        onSubmit={handleSubmit(handleSubmitReview)}
        className="add-review-form"
      >
        <h3 className="text-lg font-medium mb-3">
          {editingReview ? "Update Your Review" : "Add Your Review"}
        </h3>
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Rating</label>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < newRating
                    ? "text-yellow-500 cursor-pointer"
                    : "text-gray-300 cursor-pointer"
                }
                onClick={() => handleRatingChange(i + 1)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Review</label>
          <textarea
            {...register("review", { required: true })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#252527]"
            placeholder="Write your review"
          ></textarea>
          {errors.review && <p className="text-red-500">Review is required</p>}
        </div>

        <Button type="submit">
          {!isAddingReview
            ? editingReview
              ? "Update Review"
              : "Submit Review"
            : "Submitting..."}
        </Button>
      </form>
    </section>
  );
}
