type ButtonProps = {
  children: React.ReactNode,
}

export default function AddButton({ children }: ButtonProps) {
  return (
    <button 
      className="flex items-center justify-center h-10 mt-4 mb-4 text-white font-bold rounded-md w-full transition-all duration-200 bg-blue-600 hover:bg-blue-500 active:scale-95"
    >
      {children}
    </button>
  )
}