import styles from "@/ui/Button/Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  className?: string;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles[props.variant]}`}
    ></button>
  );
};

export default Button;
