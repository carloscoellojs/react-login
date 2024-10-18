export const Form = ({ className, onSubmit, children }) => (
  <form className={className} onSubmit={onSubmit}>
    {children}
  </form>
);
