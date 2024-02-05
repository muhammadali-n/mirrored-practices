import React from 'react';

function page({ params }: { params: { demo: string } }) {
  const slug = params?.demo;

  console.log("sssssssss", slug);

  return (
    <div> </div>
  );
}

export default page;
