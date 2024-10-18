export const Button = ({ type, className, children, ...rest }) => (
  <button type={type} className={className} {...rest}>
    {children}
  </button>
);
