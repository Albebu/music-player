import React, { useState } from 'react';

// Modal Component
const Modal = ({ modalContent, children}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <div 
      className="relative"
      onMouseEnter={showModal}
      onMouseLeave={hideModal}
    >
      {/* Contenido que dispara el modal al pasar el ratón por encima */}
      <div className="cursor-pointer">
        {children}
      </div>

      {/* Modal solo se muestra cuando `isModalVisible` es true */}
      {isModalVisible && (
        <div className="absolute bg-white border rounded shadow-lg left-1/2 transform -translate-x-1/2  translate-y-1/2 text-black">
        {modalContent}
        </div>
      
      )}
    </div>
  );
};

export default Modal;