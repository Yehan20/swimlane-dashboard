import React from 'react'

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-[200px]">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue border-t-transparent"></div>
        </div>
    )
}

export default Spinner