import styles from "@/ui/IconButton/IconButton.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  className?: string;
}

const IconButton: React.FC<Props> = (props) => {
  return (
    <button {...props} className={`${styles.btn} ${styles[props.variant]}`}>
      {props.children}
    </button>
  );
};

export default IconButton;
