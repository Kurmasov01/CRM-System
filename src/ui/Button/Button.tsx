import styles from "@/ui/Button/Button.module.scss";

interface Props {
  type?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  variant: string;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button onClick={props.onClick} className={`${styles.btn} ${styles[props.variant]}`}>
      {props.children}
    </button>
  );
};

export default Button;
