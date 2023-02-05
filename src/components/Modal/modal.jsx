import React, { useEffect, useState } from 'react'
import "./index.css"

export const Modal = ({ children, activeModal, setActiveModal }) => {


	//  console.log(active);
	return (
		<>
			{activeModal &&
				(<div className='modal' onClick={() => setActiveModal(false)}>
					<div className='modal__content' onClick={e => e.stopPropagation()}>{children}</div>
				</div>)
			}
		</>
	)
}
