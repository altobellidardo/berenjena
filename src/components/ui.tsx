export function Button ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>{children}</button>
  )
}

export function Input ({ children, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="text-black">{children}</input>
  )
}

export function Label ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label {...props}>{children}</label>
  )
}

export function Card ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>{children}</div>
  )
}