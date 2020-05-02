import React from 'react'

export default function IconeContainer({ children, color, count, isLiked, ...props }) {
    return (
        <div className={`icon-group ${isLiked && 'icon-isLike'} `} {...props}>
            <div className={`icon - container icon - ${color} `}>
                {children}
            </div>
            {count > 0 && <p className={`icon - text icon - text - ${color} `}> {count}</p>}
        </div >
    )
}
