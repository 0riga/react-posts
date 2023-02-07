import "./index.css"


export const Button = ({ children, type, fn }) => {
	return (
		<div className='btn'>
			<button onClick={fn} type={type}>{children}</button>
		</div>
	)
}
