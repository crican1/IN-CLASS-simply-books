import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const OnUpdateAuthors = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.authorObject?.first_name} {authorDetails.authorObject?.last_name}
          {authorDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.authorObject?.email}`}>{authorDetails.authorObject?.email}</a>
        <p>{authorDetails.description || ''}</p>
        <hr />
        <div className="d-flex flex-wrap">
          {authorDetails.books?.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={OnUpdateAuthors} />
          ))}
        </div>
      </div>
    </div>
  );
}
