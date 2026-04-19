/**
 * Custom hook to know if user operating system is Mac OS.
 * @returns {boolean}
 * @example
 * const mac = useIsMac();
 * console.log(mac) // true | false
 */
const useIsMac = (): boolean => {
  return navigator.userAgent.indexOf("Mac OS X") != -1;
};

export default useIsMac;
