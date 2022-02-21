import React from "react";

export interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = (props) => (
  <div className={`d-flex justify-content-center ${props.className}`}>
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default React.memo(Loading);
