
import React from "react";

export const Loading = function()
{
  return (
    <div className="col-12">
      {/* fa-spinner is a loading spinner icon that can be set to rotate with
          fa-pulse and other class names*/}
      <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
      <p>Loading...</p>
    </div>
  );
};
