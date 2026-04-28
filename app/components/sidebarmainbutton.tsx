type ButtonProps = {
  children: React.ReactNode,
  onClick: () => void,
  isActive?: boolean,
  tooltip?: string
}

export default function Button({ children, onClick, isActive = false, tooltip }: ButtonProps) {
  const activeStyles = 'bg-(--hovered) text-blue-600 sm:border-l-4 sm:border-l-solid sm:border-l-blue-500';
  
  return (
    <div className="group relative w-full">
      <button 
        onClick={onClick} 
        className={`p-2.5 h-10 text-(--text) flex items-center justify-start font-bold rounded-tr-md rounded-br-md w-full transition-all duration-200 bg-transparent hover:bg-(--hovered) sm:hover:border-l-4 sm:hover:border-l-blue-600 sm:hover:border-solid hover:text-blue-600 ${isActive ? activeStyles : ''}`}
        aria-label={tooltip}
      >
        {children}
      </button>
      
      {tooltip && (
        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-sm:block hidden">
          {tooltip}
        </span>
      )}
    </div>
  )
}