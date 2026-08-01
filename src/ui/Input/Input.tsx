import styles from "@/ui/Input/Input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: string;
  calssName?: string;
}

const Input: React.FC<Props> = (props) => {
  return (
    <input
    {...props}
      className={`${styles.input} ${styles[props.variant]}`}
    />
  );
};

export default Input;
