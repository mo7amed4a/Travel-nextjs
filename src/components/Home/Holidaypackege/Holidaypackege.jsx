import React from 'react';

export default function Holidaypackage() {
  return (
    <div className='h-screen mt-[100px] bg-[gray] flex items-center justify-center'>
      <div className='container relative mx-auto px-4'>
        <div className='w-[90%] left-[5%] right-[5%] bottom-[120%] absolute h-40 md:h-[200px] bg-secondary'></div>

        <div className='mt-[50px] w-full flex justify-center'>
          <div className="flex flex-col text-center items-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 bg-white h-[2px] inline-block"></div>
              <p className="ml-2 uppercase text-white font-bold text-sm tracking-widest">HOLIDAY PACKAGE OFFER</p>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              HOLIDAY SPECIAL 25% OFF!
            </h2>

            <p className="text-base md:text-lg text-white max-w-md font-bold mb-6">
              Sign up now to receive hot special offers and information about the best tour packages, updates, and discounts!!
            </p>

            <form className="relative mb-6 w-full max-w-sm">
              <input
                className='border-2 border-white bg-transparent w-full h-[60px] px-3 focus:outline-none focus:border-white placeholder:text-white'
                type="text"
                placeholder="Enter your details"
              />
              <button className='bg-primary-500 text-white px-3.5 py-2.5 absolute right-[10px] top-[8px]'>
                SIGN UP NOW!
              </button>
            </form>

            <p className='text-white mt-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper <br />
              mattis, pulvinar dapibus leo. Eaque adipiscing, luctus eleifend temporibus occaecat luctus <br />
              eleifend temporibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
