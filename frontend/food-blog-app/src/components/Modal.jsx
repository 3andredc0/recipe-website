// eslint-disable-next-line react/prop-types
export default function Modal({children, onClose}) {
  return (
    <>
        <div className='backdrop'onClick={onClose}></div>
            <dialog className='modal' open>
                {children}
            </dialog>
        
    </>
  )
}
