import { createContext } from 'react'

/**
   * @typedef {object} Modal
   * @property {string} title
   * @property {string} subtitle
   * @property {string} body
   * @property {(() => void)} primaryFn
   * @property {(() => void)} secondaryFn
   * 
   */
/**
 * @typedef {object} ModalContextType
 * @property {Modal} modal - The modal state and setter.
 * @property {React.Dispatch<Modal>} setModal - Set Modal
 */
const ModalContext = createContext(
  /** @type {ModalContextType} */ (undefined)
);
export default ModalContext;