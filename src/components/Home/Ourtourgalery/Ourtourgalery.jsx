import React from 'react';

const GalleryPage = () => {
    return (
        <div className="my-10 gap-8 flex items-center justify-center flex-wrap px-4 mx-auto container">
     <div className="flex flex-col text-center md:text-left items-center md:items-start">
    <div className="flex items-center justify-center md:justify-start mb-4">
        <div className="w-16 bg-primary h-[2px] inline-block"></div>
        <p className="ml-2 text-primary uppercase font-bold text-sm tracking-widest">Our Tour Gallery</p>
    </div>

    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        Best Traveler's <br /> Shared Photos
    </h2>

    <p className="text-base md:text-lg text-gray-600 max-w-md font-normal">
        Aperiam sociosqu urna praesent, tristique, corrupti condimentum asperiores platea ipsum ad arcu. 
        Nostrud? Esse? Aut nostrum, ornare quas provident laoreet nesciunt odio voluptates etiam, omnis.
    </p>
</div>



<div className=' w-[315px] h-[250px] bg-gray-300'></div>

<div className=' w-[315px] h-[250px] bg-gray-300'></div>
<div className=' w-[455px] h-[330px] bg-gray-300'></div>
<div className=' w-[655px] h-[330px] bg-gray-300'></div>

        </div>
    );
};

export default GalleryPage;








