/* eslint-disable react/prop-types */



function Button({
    children,
    bgColor ='bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`py-2 px-6 rounded-full ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
  )
}

export default Button