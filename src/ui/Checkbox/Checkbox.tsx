import styles from "@/ui/Checkbox/Checkbox.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: string;
  calssName?: string;
}

const Checkbox: React.FC<Props> = (props) => {
  return (
    <label className={`${styles.checkbox} ${props.className}`}>
      <input type="checkbox" {...props} />
      <span className={styles.checkboxMark}></span>
    </label>
  );
};

export default Checkbox;
