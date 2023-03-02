import { Session } from 'next-auth';
import * as React from 'react';

interface FeedWrapperProps {
  session: Session
}

const FeedWrapper: React.FunctionComponent<FeedWrapperProps> = ({session}) => {
  return (
    <div>{session.user.email}</div>
  );
};

export default FeedWrapper;
