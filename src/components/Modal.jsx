import React, { useState } from 'react';

// Modal Component
const Modal = ({ modalContent, children }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <div className="relative">
      {/* Contenido que dispara el modal */}
      <span 
        className="cursor-pointer" 
        onMouseEnter={showModal}
        onMouseLeave={hideModal}
        aria-haspopup="dialog" 
        aria-expanded={isModalVisible}
      >
        {children}
      </span>

      {/* Modal solo se muestra cuando `isModalVisible` es true */}
      {isModalVisible && (
        <div 
          className="absolute bg-white border rounded shadow-lg left-1/2 transform -translate-x-1/2 translate-y-2 text-black p-4 z-10"
          role="dialog" 
          aria-modal="true" 
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold">{modalContent}</h2>
            <button onClick={hideModal} aria-label="Cerrar modal" className="text-black">X</button>
          </div>
          {/* Aquí puedes agregar contenido adicional al modal */}
          <div className="mt-2">
            <p>Este es el contenido del modal.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
