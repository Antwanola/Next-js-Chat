import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import * as React from 'react';

interface FeedWrapperProps {
  session: Session
}

const FeedWrapper: React.FunctionComponent<FeedWrapperProps> = ({session}) => {
  const router = useRouter()

  const { convoId } = router.query
  return (
    <div>{convoId}</div>
  );
};

export default FeedWrapper;
