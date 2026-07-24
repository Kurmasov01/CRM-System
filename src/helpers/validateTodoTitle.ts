export function validateTodoTitle(title: string | undefined): string {
  const value = title?.trim();

  const titleMaxLength:number = 64;
  const titleMinLength:number = 2;

  if (!value) {
    return "Это поле не может быть пустым";
  }

  if (value.length < titleMinLength) {
    return "Минимальная длина текста 2 символа";
  }

  if (value.length > titleMaxLength) {
    return "Максимальная длина текста 64 символа";
  }

  return "";
}