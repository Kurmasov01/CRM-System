export function validateTodoTitle(title: string | undefined): string {
  const value = title?.trim();

  const TITLE_MAX_LENGTH:number = 64;
  const TITLE_MIN_LENGTH:number = 2;

  if (!value) {
    return "Это поле не может быть пустым";
  }

  if (value.length < TITLE_MIN_LENGTH) {
    return `Минимальная длина текста ${TITLE_MIN_LENGTH} символа`;
  }

  if (value.length > TITLE_MAX_LENGTH) {
    return `Максимальная длина текста ${TITLE_MAX_LENGTH} символа`;
  }

  return "";
}