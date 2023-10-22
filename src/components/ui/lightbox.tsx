/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import { Maximize, Minimize, X } from 'lucide-react'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

interface Props {
  toggler: boolean
  onClose: () => void
  src: string
}

const LightBox = ({ toggler, onClose, src }: Props) => {
  const lightboxRef = useRef(null)
  const [fullScreenToggle, setfullScreenToggle] = useState(false)

  const handleFullscreen = () => {
    // @ts-ignore
    lightboxRef?.current?.requestFullscreen()
    setfullScreenToggle(true)
  }

  const closeFullscreen = () => {
    document.exitFullscreen()
    setfullScreenToggle(false)
  }

  const handleClose = () => {
    onClose()
    setfullScreenToggle(false)
  }

  return (
    <>
      {toggler && (
        <div
          ref={lightboxRef}
          className={classNames(
            { hidden: !toggler },
            'fixed inset-0 w-100 h-screen bg-bg bg-opacity-80 z-50 animate-fade animate-duration-[400ms] animate-once backdrop-blur-xl'
          )}>
          <div className='absolute right-2 lg:right-6 top-2 lg:top-6 flex items-center justify-center h-10 w-20'>
            {fullScreenToggle ? (
              <Minimize
                className='text-gray mr-4 w-8 h-8 cursor-pointer'
                color='white'
                onClick={closeFullscreen}
                strokeWidth={2.5}
              />
            ) : (
              <Maximize
                className='text-gray mr-4 w-8 h-8 cursor-pointer'
                onClick={handleFullscreen}
                strokeWidth={2.5}
              />
            )}

            <X className='cursor-pointer w-9 h-9' strokeWidth={2.5} onClick={handleClose} />
          </div>
          <div className='flex items-center justify-center w-full h-full'>
            <img
              src={src}
              alt={src}
              className='p-2 md:p-5 lg:p-8 xl:p-10 xxl:p-12 max-h-full max-w-full mx-auto object-cover'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default LightBox

LightBox.propTypes = {
  toggler: PropTypes.bool,
  onClose: PropTypes.func,
  src: PropTypes.string,
}
