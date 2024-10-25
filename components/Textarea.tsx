interface TextareaProps {
  placeholder: string;
  defaultValue?: string;
  name: string;
}
export default function Textarea({
  placeholder,
  defaultValue,
  name,
}: TextareaProps) {
  return (
    <textarea
      defaultValue={defaultValue}
      className="w-full border rounded-md p-4 bg-secondary border-border text-sm text-muted-foreground "
      placeholder={placeholder}
      aria-label={placeholder}
      rows={3}
      required
      name={name}
      minLength={10}
      maxLength={1000}
      autoComplete="off"
      autoFocus
    />
  );
}
