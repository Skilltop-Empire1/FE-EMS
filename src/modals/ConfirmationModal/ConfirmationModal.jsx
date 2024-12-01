import React from 'react';

const ConfirmationModal = ({ page, toggle, runDelete }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 rounded-md'>
      <div className='shadow-lg w-1/3 flex flex-col justify-center items-center py-14 gap-5 bg-white relative rounded-md' >
        <p className='text-emsRed hover:text-red-700 hover:cursor-pointer text-lg absolute top-2 right-4' onClick={toggle}>X</p>
        <p>Are you sure you want to delete this {page} detail?</p>
        <div className='flex gap-3'>
          <button className={`bg-emsBlue hover:bg-blue-900 p-4 w-28 text-white rounded-md`} onClick={runDelete}>Yes</button>
          <button className='bg-emsRed hover:bg-red-900 p-4 w-28 text-white rounded-md' onClick={toggle}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
