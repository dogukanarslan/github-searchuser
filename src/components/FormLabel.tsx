interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const FormLabel = (props: FormLabelProps) => {
  return (
    <label {...props} className="block font-medium text-gray-700" />
  );
};
