/* eslint-disable no-unused-vars */
import React from 'react';
import HeadingImage from '../assets/Heading.png'; 

const Heading = ({ Headline, pagename }) => {
    return (
        <section 
            className='relative bg-cover bg-center h-[300px] flex items-center justify-center text-center'
            style={{ backgroundImage: `url(${HeadingImage})` }}
        >
            <div className="text-black-800">
                <h1 className='text-[34px] font-jsans font-bold'>{Headline}</h1>
                <h4 className='text-[16px] font-lato font-medium'>
                    Home. <span className='text-black-800'>{pagename}</span>
                </h4>
            </div>
        </section>
    );
};

export default Heading;
