import "./index.css"

export const Modal = ({ children, activeModal, setActiveModal }) => {
	return (
		activeModal &&
		(<div className='modal' onClick={() => setActiveModal(false)}>
			<div className='modal__content' onClick={e => e.stopPropagation()}>{children}</div>
		</div>)
	)
}
