import { useState } from 'react'

const existingReviews = [
  {
    id: 1,
    name: 'Adebayo Okonkwo',
    rating: 5,
    comment: 'Amara donated blood for my daughter in less than 30 minutes. She literally saved her life. God bless you!',
    date: 'May 12, 2025',
    type: 'Individual Donor',
  },
  {
    id: 2,
    name: 'Blessing Afolabi',
    rating: 5,
    comment: 'EKSUTH blood bank was fully stocked and the staff were amazing. Fast and professional service!',
    date: 'April 28, 2025',
    type: 'Hospital',
  },
  {
    id: 3,
    name: 'Tunde Fashola',
    rating: 4,
    comment: 'Found a B+ donor within 10 minutes through BloodLink. Incredible app. Will recommend to everyone.',
    date: 'April 15, 2025',
    type: 'Individual Donor',
  },
  {
    id: 4,
    name: 'Ngozi Eze',
    rating: 5,
    comment: 'My husband needed O- urgently after an accident. BloodLink found us a donor in Ikere-Ekiti within 20 minutes!',
    date: 'March 30, 2025',
    type: 'Individual Donor',
  },
]

function StarRating({ rating, onRate }: { rating: number; onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hovered || rating) ? 'star-filled' : ''}`}
          onClick={() => onRate && onRate(star)}
          onMouseEnter={() => onRate && setHovered(star)}
          onMouseLeave={() => onRate && setHovered(0)}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function Reviews() {
  const [reviews, setReviews] = useState(existingReviews)
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: '',
    type: 'Individual Donor',
  })

  function handleSubmit() {
    if (!newReview.name || !newReview.comment || newReview.rating === 0) {
      alert('Please fill in all fields and give a star rating!')
      return
    }

    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      type: newReview.type,
    }

    setReviews([review, ...reviews])
    setNewReview({ name: '', rating: 0, comment: '', type: 'Individual Donor' })
    alert('Thank you for your review! ❤️')
  }

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1)

  return (
    <section className="reviews-section" id="reviews">

      {/* Header */}
      <div className="reviews-header">
        <span className="reviews-tag">⭐ Reviews</span>
        <h2 className="reviews-heading">
          Real Stories. <br />
          <span className="reviews-heading-red">Real Lives Saved.</span>
        </h2>
        <p className="reviews-subtext">
          Hear from people whose lives were saved through BloodLink.
        </p>

        {/* Overall rating */}
        <div className="reviews-overall">
          <span className="reviews-overall-number">{averageRating}</span>
          <StarRating rating={Math.round(Number(averageRating))} />
          <span className="reviews-overall-count">{reviews.length} reviews</span>
        </div>
      </div>

      {/* Review cards */}
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">

            <div className="review-card-top">
              <div>
                <h4 className="review-name">{review.name}</h4>
                <span className="review-type">{review.type}</span>
              </div>
              <span className="review-date">{review.date}</span>
            </div>

            <StarRating rating={review.rating} />
            <p className="review-comment">{review.comment}</p>

          </div>
        ))}
      </div>

      {/* Leave a review form */}
      <div className="review-form">
        <h3 className="review-form-title">Leave a Review</h3>

        <div className="review-form-field">
          <label className="review-form-label">Your Name</label>
          <input
            className="review-form-input"
            type="text"
            placeholder="e.g. Chidi Nwosu"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          />
        </div>

        <div className="review-form-field">
          <label className="review-form-label">Reviewing a:</label>
          <div className="review-type-choices">
            <button
              className={`review-type-btn ${newReview.type === 'Individual Donor' ? 'review-type-active' : ''}`}
              onClick={() => setNewReview({ ...newReview, type: 'Individual Donor' })}
            >
              👤 Individual Donor
            </button>
            <button
              className={`review-type-btn ${newReview.type === 'Hospital' ? 'review-type-active' : ''}`}
              onClick={() => setNewReview({ ...newReview, type: 'Hospital' })}
            >
              🏥 Hospital
            </button>
          </div>
        </div>

        <div className="review-form-field">
          <label className="review-form-label">Your Rating</label>
          <StarRating
            rating={newReview.rating}
            onRate={(r) => setNewReview({ ...newReview, rating: r })}
          />
        </div>

        <div className="review-form-field">
          <label className="review-form-label">Your Story</label>
          <textarea
            className="review-form-input review-textarea"
            placeholder="Tell us how BloodLink helped you..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />
        </div>

        <button className="review-submit-btn" onClick={handleSubmit}>
          ⭐ Submit Review
        </button>

      </div>

    </section>
  )
}

export default Reviews