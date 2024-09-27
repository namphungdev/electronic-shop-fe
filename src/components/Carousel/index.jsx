import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

const Carousel = ({ children: sliders, autoSlide = false, autoSlideInterval = 5000 }) => {

    const [curr, setCurr] = useState(0)

    const prev = () => {
        setCurr((curr) => (curr === 0 ? sliders.length - 1 : curr - 1))
    }

    const next = () => {
        setCurr((curr) => (curr === sliders.length - 1 ? 0 : curr + 1))
    }

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [autoSlide, autoSlideInterval, next])

    return (
        <div className="relative overflow-hidden group-slider">
            <div className='flex transition-transform ease-out duration-500'
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {sliders}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={prev}
                    disabled={curr === 0}
                    className={`p-1 rounded-full shadow flex items-center justify-center ${curr === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-white-80 text-gray-800 hover:bg-white'}`}
                >
                    <LeftOutlined size={40} />
                </button>
                <button
                    onClick={next}
                    disabled={curr === sliders.length - 1}
                    className={`p-1 rounded-full shadow flex items-center justify-center ${curr === sliders.length - 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-white-80 text-gray-800 hover:bg-white'}`}
                >
                    <RightOutlined size={40} />
                </button>
            </div>

            {/* <div className='absolute bottom-4 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {sliders.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all w-3 h-3 rounded-full ${curr === i ? "bg-white p-2" : "bg-orange-600"} `}
                        />
                    ))}
                </div>
            </div> */}
        </div>
    )
}

export default Carousel


