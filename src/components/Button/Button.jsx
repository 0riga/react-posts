import "./index.css"


export const Button = ({ children, type = "button", fn }) => {
	return (
		<div className='btn'>
			<button onClick={fn} type={type}>{children}</button>
		</div>
	)
}
