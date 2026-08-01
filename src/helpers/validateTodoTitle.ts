export function validateTodoTitle(title: string | undefined): string {
  const value = title?.trim();

  const TITLE_MAX_LENGTH:number = 64;
  const TITLE_MIN_LENGTH:number = 2;

  if (!value) {
    return "Это поле не может быть пустым";
  }

  if (value.length < TITLE_MIN_LENGTH) {
    return "Минимальная длина текста 2 символа";
  }

  if (value.length > TITLE_MAX_LENGTH) {
    return "Максимальная длина текста 64 символа";
  }

  return "";
}